package com.example.languageLearning;

import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.os.Bundle;
import android.text.Layout;
import android.text.SpannableString;
import android.text.style.BackgroundColorSpan;
import android.view.ActionMode;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewTreeObserver;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.Response;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

public class ImageEssayDetailActivity extends AppCompatActivity {

    private final String TAG = getClass().getName();

    Essay essay;
    ImageView essayImageView;
    Button finishButton;
    MyApplication app;
    ProgressBar progressBar;
    Bitmap essayImage;
    ArrayList<AnnotationForImageEssay> annotations = new ArrayList<>();

    Bitmap getOverlayBitmap() {
        Bitmap bmp=Bitmap.createBitmap(essayImage.getWidth(), essayImage.getHeight(),essayImage.getConfig());
        Canvas cnvs=new Canvas(bmp);
        Paint paint=new Paint();
        paint.setColor(Color.YELLOW);
        paint.setStyle(Paint.Style.FILL);
        paint.setAlpha(64);

        for (AnnotationForImageEssay ann : annotations) {
            int x = ann.x;
            int y = ann.y;
            int right = ann.x+ann.w;
            int bottom = ann.y+ann.h;
            cnvs.drawRect(x, y,right,bottom , paint);
        }

        return bmp;
    }

    private void drawAnnotations() {
        Bitmap overlayBitmap = getOverlayBitmap();
        Bitmap bmOverlay = Bitmap.createBitmap(essayImage.getWidth(), essayImage.getHeight(), essayImage.getConfig());
        Canvas canvas = new Canvas();
        canvas.setBitmap(bmOverlay);
        canvas.drawBitmap(essayImage, new Matrix(), null);
        canvas.drawBitmap(overlayBitmap, new Matrix(), null);
        essayImageView.setImageBitmap(bmOverlay);
    }

    private AnnotationForImageEssay getAnnotationFromXYPosition(int x, int y) {
        final int RADIUS = 10;
        AnnotationForImageEssay closestAnnotation = null;
        double closestAnnotationDist = 1e9;

        final int resizedW = essayImageView.getWidth();
        final int resizedH = essayImageView.getHeight();

        final double xResizeFactor = ((float)resizedW)/essayImage.getWidth();
        final double yResizeFactor = ((float)resizedH)/essayImage.getHeight();

        for (int curX = x-RADIUS; curX <= x+RADIUS; curX++) {
            if (curX < 0 || curX >= essayImageView.getWidth())
                continue;
            for (int curY = y - RADIUS; curY <= y + RADIUS; curY++) {
                if (curY < 0 || curY >= essayImageView.getHeight())
                    continue;
                for (AnnotationForImageEssay ann : annotations) {
                    int left = (int)(ann.x*xResizeFactor);
                    int top = (int)(ann.y*yResizeFactor);
                    int right = (int)((ann.x+ann.w)*xResizeFactor);
                    int bottom = (int)((ann.y+ann.h)*yResizeFactor);

                    if (left <= curX && right > curX && top <= curY && bottom > curY) {
                        double dist = (curX - left) * (curX - left) + (curY - top) * (curY - top); //TODO: Here and in TextEssayDetailsActivity, calculate distance to the middle point of annotations, not to their top-left corner.
                        if (dist < closestAnnotationDist) {
                            closestAnnotation = ann;
                            closestAnnotationDist = dist;
                        }
                    }
                }
            }
        }

        return closestAnnotation;
    }

    private boolean essayImageViewOnTouch(View v, MotionEvent event) {
        if (event.getAction() != MotionEvent.ACTION_UP)
            return true;
        int[] location = new int[2];
        v.getLocationOnScreen(location);
        int x = (int)(event.getRawX()-location[0]);
        int y = (int)(event.getRawY()-location[1]);
        AnnotationForImageEssay ann = getAnnotationFromXYPosition(x, y);
        if (ann != null)
            Toast.makeText(this, ann.annotationText, Toast.LENGTH_SHORT).show();
        return true;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image_essay_detail);
        app = (MyApplication) getApplication();
        essay = (Essay)getIntent().getSerializableExtra("essay");
        essayImageView = findViewById(R.id.essayImageView);
        finishButton = findViewById(R.id.finishButton);
        progressBar = findViewById(R.id.downloadProgressBar);
        if (app.getUsername().equals(essay.author) == false) { // We are the reviewer
            //TODO: Enable the user to add new annotations by selecting parts of the image
        }

        essayImageView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                return essayImageViewOnTouch(v, event);
            }
        });

        finishButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(ImageEssayDetailActivity.this, MainMenuActivity.class);
                startActivity(i);
                finish();
            }
        });

        app.rawHTTPGetRequest(essay.fileUri, new InputStreamFunction() {
            @Override
            public void invoke(InputStream s) {
                essayImage = BitmapFactory.decodeStream(s);
                if (essayImage == null) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            Toast.makeText(ImageEssayDetailActivity.this, "Failed to download image", Toast.LENGTH_SHORT).show();
                            finish();
                        }
                    });
                    return ;
                }

                app.initiateAPICall(Request.Method.GET, "annotation/?source=" + essay.id, null, new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        try {
                            for (int i = 0; i < response.length(); i++)
                                annotations.add(AnnotationForImageEssay.fromJSON(response.getJSONObject(i)));
                        }
                        catch (JSONException e) {
                            e.printStackTrace();
                            finish();
                            return ;
                        }
                        progressBar.setVisibility(View.GONE);
                        drawAnnotations();
                        essayImageView.setVisibility(View.VISIBLE);
                        finishButton.setVisibility(View.VISIBLE);
                        essayImageView.setOnTouchListener(new View.OnTouchListener() {
                            @Override
                            public boolean onTouch(View v, MotionEvent event) {
                                return essayImageViewOnTouch(v, event);
                            }
                        });

                    }
                }, null);
            }
        }, null);
    }
}
