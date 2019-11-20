package com.example.languageLearning;

import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Rect;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.theartofdev.edmodo.cropper.CropImageView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.InputStream;
import java.util.ArrayList;

public class ImageEssayDetailActivity extends AppCompatActivity {

    private final String TAG = getClass().getName();

    Essay essay;
    ConstraintLayout reviewerInfoLayout;
    TextView reviewerInfoTextView;
    ImageButton reviewerProfileButton;
    ImageView essayImageView;
    Button annotateButton, rejectButton;
    MyApplication app;
    ProgressBar progressBar;
    Bitmap essayImage;
    CropImageView cropImageView;
    ArrayList<AnnotationForImageEssay> annotations = new ArrayList<>();
    boolean currentlyCroppingForAnnotation=false;

    Bitmap getOverlayBitmap() {
        Bitmap bmp=Bitmap.createBitmap(essayImage.getWidth(), essayImage.getHeight(),essayImage.getConfig());
        Canvas cnvs=new Canvas(bmp);
        Paint paint=new Paint();
        paint.setColor(Color.YELLOW);
        paint.setStyle(Paint.Style.FILL);
        paint.setAlpha(64);

        for (AnnotationForImageEssay ann : annotations) {
            int x = (int)(ann.x*essayImage.getWidth()/100);
            int y = (int)(ann.y*essayImage.getHeight()/100);
            int right = (int)((ann.x+ann.w)*essayImage.getWidth()/100);
            int bottom = (int)((ann.y+ann.h)*essayImage.getHeight()/100);
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
                    int left = (int)(ann.x*essayImage.getWidth()*xResizeFactor/100);
                    int top = (int)(ann.y*essayImage.getHeight()*yResizeFactor/100);
                    int right = (int)((ann.x+ann.w)*essayImage.getWidth()*xResizeFactor/100);
                    int bottom = (int)((ann.y+ann.h)*essayImage.getHeight()*yResizeFactor/100);

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

    private void reject() {
        JSONObject data = new JSONObject();
        try {
            data.put("status", "rejected");
        }
        catch (JSONException e) {
            e.printStackTrace();
            finish();
            return ;
        }
        app.initiateAPICall(Request.Method.PATCH, "essay/" + essay.id + "/", data, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Toast.makeText(ImageEssayDetailActivity.this, "Essay Rejected", Toast.LENGTH_SHORT).show();
                finish();
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                finish();
            }
        });
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

    private void reviewerProfileButtonClicked() {
        Intent intent = new Intent(this, ProfilePageActivity.class);
        intent.putExtra("username", essay.reviewer);
        startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_essay_detail_loading);
        app = (MyApplication) getApplication();
        essay = (Essay)getIntent().getSerializableExtra("essay");
        progressBar = findViewById(R.id.downloadProgressBar);

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

                        ImageEssayDetailActivity.this.setContentView(R.layout.activity_image_essay_detail_loaded);
                        reviewerInfoLayout = findViewById(R.id.detail_header_layout_include);
                        reviewerInfoTextView = reviewerInfoLayout.findViewById(R.id.reviewerInfoTextView);
                        reviewerProfileButton = reviewerInfoLayout.findViewById(R.id.reviewerProfileButton);
                        essayImageView = findViewById(R.id.essayImageView);
                        annotateButton = findViewById(R.id.annotateButton);
                        rejectButton = findViewById(R.id.rejectButton);
                        cropImageView = findViewById(R.id.cropImageView);
                        progressBar = null;
                        drawAnnotations();

                        if (app.getUsername().equals(essay.author)) { // We are the author
                            annotateButton.setVisibility(View.INVISIBLE);
                            rejectButton.setVisibility(View.INVISIBLE);
                            reviewerInfoTextView.setText("Reviewer is @" + essay.reviewer);
                            reviewerProfileButton.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View v) {
                                    reviewerProfileButtonClicked();
                                }
                            });
                        }
                        else { // We are the reviewer
                            reviewerInfoLayout.setVisibility(View.GONE);
                            rejectButton.setVisibility(View.VISIBLE);
                            rejectButton.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View v) {
                                    reject();
                                }
                            });
                            annotateButton.setVisibility(View.VISIBLE);
                            annotateButton.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View v) {
                                    if (currentlyCroppingForAnnotation == false) {
                                        essayImageView.setVisibility(View.INVISIBLE);
                                        cropImageView.setImageBitmap(Bitmap.createScaledBitmap(essayImage, essayImageView.getWidth(), essayImageView.getHeight(), false));
                                        cropImageView.setVisibility(View.VISIBLE);
                                        currentlyCroppingForAnnotation = true;
                                    }
                                    else {
                                        final Rect rect = cropImageView.getCropRect();
                                        AlertDialog.Builder alert = new AlertDialog.Builder(ImageEssayDetailActivity.this);
                                        final EditText edittext = new EditText(ImageEssayDetailActivity.this);
                                        alert.setTitle("Enter Your Annotation");
                                        alert.setView(edittext);
                                        alert.setNeutralButton("Ok", new DialogInterface.OnClickListener() {
                                            @Override
                                            public void onClick(DialogInterface dialog, int which) {
                                                essayImageView.setVisibility(View.VISIBLE);
                                                cropImageView.setVisibility(View.INVISIBLE);
                                                currentlyCroppingForAnnotation = false;

                                                final AnnotationForImageEssay ann = new AnnotationForImageEssay();

                                                final int resizedW = essayImageView.getWidth();
                                                final int resizedH = essayImageView.getHeight();
                                                final double xResizeFactor = ((float)resizedW)/essayImage.getWidth();
                                                final double yResizeFactor = ((float)resizedH)/essayImage.getHeight();

                                                ann.x = rect.left / xResizeFactor / essayImage.getWidth() * 100;
                                                ann.y = rect.top / yResizeFactor / essayImage.getHeight() * 100;
                                                ann.w = (rect.right-rect.left) / xResizeFactor / essayImage.getWidth() * 100;
                                                ann.h = (rect.bottom-rect.top) / yResizeFactor / essayImage.getHeight() * 100;
                                                ann.annotationText = edittext.getText().toString();
                                                ann.essayId = String.valueOf(essay.id);
                                                ann.id = "";
                                                JSONObject data;
                                                try {
                                                    data = ann.toJSON();
                                                    data.remove("id");
                                                }
                                                catch (JSONException e) {
                                                    e.printStackTrace();
                                                    return ;
                                                }
                                                app.initiateAPICall(Request.Method.POST, "annotation/", data, new Response.Listener<JSONObject>() {
                                                    @Override
                                                    public void onResponse(JSONObject response) {
                                                        annotations.add(ann);
                                                        drawAnnotations();
                                                    }
                                                }, null);
                                            }
                                        });
                                        alert.show();
                                    }
                                }
                            });
                        }

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
