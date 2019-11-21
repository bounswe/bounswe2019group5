package com.example.languageLearning;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.text.Layout;
import android.text.SpannableString;
import android.text.style.BackgroundColorSpan;
import android.util.Log;
import android.view.ActionMode;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;

public class TextEssayDetailActivity extends AppCompatActivity {

    private final String TAG = getClass().getName();

    Essay essay;
    TextView essayTextView;
    Button rejectButton;
    MyApplication app;
    ProgressBar progressBar;
    String essayText;
    ArrayList<AnnotationForTextEssay> annotations = new ArrayList<>();

    static SpannableString getSpannableString(String text, ArrayList<AnnotationForTextEssay> annotations) {
        SpannableString ss = new SpannableString(text);
        for (AnnotationForTextEssay ann : annotations) {
            ss.setSpan(new BackgroundColorSpan(Color.YELLOW), ann.start, ann.end, 0);
        }
        return ss;
    }

    private void drawAnnotations() {
        SpannableString ss = getSpannableString(essayText, annotations);
        essayTextView.setText(ss);
    }

    private AnnotationForTextEssay getAnnotationFromXYPosition(int line, int offset) {
        final int RADIUS = 2;
        AnnotationForTextEssay closestAnnotation = null;
        double closestAnnotationDist = 1e9;
        Layout layout = essayTextView.getLayout();

        for (int curLine = line-RADIUS; curLine <= line+RADIUS; curLine++) {
            if (curLine < 0 || curLine >= layout.getLineCount())
                continue;
            for (int curOffset = offset - RADIUS; curOffset <= offset + RADIUS; curOffset++) {
                if (curOffset < 0 || curOffset >= layout.getLineWidth(curLine))
                    continue;
                int curCharPosition = essayTextView.getLayout().getLineStart(curLine) + curOffset;
                for (AnnotationForTextEssay ann : annotations)
                    if (ann.start <= curCharPosition && ann.end > curCharPosition) {
                        double dist = (curLine-line)*(curLine-line)+(curOffset-offset)*(curOffset-offset);
                        if (dist < closestAnnotationDist) {
                            closestAnnotation = ann;
                            closestAnnotationDist = dist;
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
                Toast.makeText(TextEssayDetailActivity.this, "Essay Rejected", Toast.LENGTH_SHORT).show();
                finish();
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                finish();
            }
        });
    }

    private boolean essayTextViewOnTouch(View v, MotionEvent event) {
        if (event.getAction() != MotionEvent.ACTION_UP)
            return false;
        Layout layout = ((TextView) v).getLayout();
        int x = (int)event.getX();
        int y = (int)event.getY();
        if (layout!=null){
            int line = layout.getLineForVertical(y);
            int offset = layout.getOffsetForHorizontal(line, x);
            AnnotationForTextEssay ann = getAnnotationFromXYPosition(line, offset);
            if (ann != null)
                Toast.makeText(this, ann.annotationText, Toast.LENGTH_SHORT).show();
        }
        //return true;
        return false; // This allows the default touch handler of Android (that shows the actions as a floating bar) appear
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_text_essay_detail);
        app = (MyApplication) getApplication();
        essay = (Essay)getIntent().getSerializableExtra("essay");
        essayTextView = findViewById(R.id.essayTextView);
        rejectButton = findViewById(R.id.rejectButton);
        progressBar = findViewById(R.id.downloadProgressBar);
        if (app.getUsername().equals(essay.author) == false) { // We are the reviewer
            essayTextView.setTextIsSelectable(true);
            essayTextView.setCustomSelectionActionModeCallback(new ActionMode.Callback() {
                @Override
                public boolean onCreateActionMode(ActionMode mode, Menu menu) {
                    mode.getMenuInflater().inflate(R.menu.essay_annotation_menu, menu);
                    return true;
                }

                @Override
                public boolean onPrepareActionMode(ActionMode mode, Menu menu) {
                    return false;
                }

                @Override
                public boolean onActionItemClicked(ActionMode mode, MenuItem item) {
                    if (item.getItemId() == R.id.annotate) {
                        final int selStart = essayTextView.getSelectionStart();
                        final int selEnd = essayTextView.getSelectionEnd();
                        mode.finish();
                        AlertDialog.Builder alert = new AlertDialog.Builder(TextEssayDetailActivity.this);
                        final EditText edittext = new EditText(TextEssayDetailActivity.this);
                        alert.setTitle("Enter Your Annotation");
                        alert.setView(edittext);
                        alert.setNeutralButton("Ok", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                final AnnotationForTextEssay ann = new AnnotationForTextEssay();
                                ann.start = selStart;
                                ann.end = selEnd;
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
                        return true;
                    }
                    return false;
                }

                @Override
                public void onDestroyActionMode(ActionMode mode) {

                }
            });
        }

        app.rawHTTPGetRequest(essay.fileUri, new BufferedReaderFunction() {
            @Override
            public void invoke(BufferedReader r) {
                StringBuilder result = new StringBuilder();
                try {
                    String line;
                    while ((line = r.readLine()) != null) {
                        result.append(line);
                    }
                }
                catch (final IOException e) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            Toast.makeText(getApplicationContext(), e.toString(), Toast.LENGTH_SHORT).show();
                            finish();
                        }
                    });
                    return ;
                }
                essayText = result.toString();

                app.initiateAPICall(Request.Method.GET, "annotation/?source=" + essay.id, null, new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        try {
                            for (int i = 0; i < response.length(); i++)
                                annotations.add(AnnotationForTextEssay.fromJSON(response.getJSONObject(i)));
                        }
                        catch (JSONException e) {
                            e.printStackTrace();
                            finish();
                            return ;
                        }
                        progressBar.setVisibility(View.GONE);
                        drawAnnotations();
                        essayTextView.setVisibility(View.VISIBLE);
                        if (app.getUsername().equals(essay.author) == false) { // We are the reviewer
                            rejectButton.setVisibility(View.VISIBLE);
                            rejectButton.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View v) {
                                    reject();
                                }
                            });
                        }
                        essayTextView.setOnTouchListener(new View.OnTouchListener() {
                            @Override
                            public boolean onTouch(View v, MotionEvent event) {
                                return essayTextViewOnTouch(v, event);
                            }
                        });

                    }
                }, null);
            }
        }, null);
    }
}