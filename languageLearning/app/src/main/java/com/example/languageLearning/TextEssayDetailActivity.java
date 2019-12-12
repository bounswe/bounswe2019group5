package com.example.languageLearning;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

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
import android.widget.ImageButton;
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
    ConstraintLayout reviewerInfoLayout;
    TextView essayTextView, reviewerInfoTextView;
    ImageButton reviewerProfileButton;
    Button rejectButton, completedButton;
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

    private AnnotationForTextEssay getAnnotationFromXYPosition(int line, int lineOffset) {
        final int RADIUS = 0;
        AnnotationForTextEssay closestAnnotation = null;
        double closestAnnotationDist = 1e9;
        Layout layout = essayTextView.getLayout();

        for (int curLine = line-RADIUS; curLine <= line+RADIUS; curLine++) {
            if (curLine < 0 || curLine >= layout.getLineCount())
                continue;
            for (int curLineOffset = lineOffset - RADIUS; curLineOffset <= lineOffset + RADIUS; curLineOffset++) {
                if (curLineOffset < 0 || curLineOffset >= layout.getLineWidth(curLine))
                    continue;
                int curCharPosition = essayTextView.getLayout().getLineStart(curLine) + curLineOffset;
                for (AnnotationForTextEssay ann : annotations)
                    if (ann.start <= curCharPosition && ann.end > curCharPosition) {
                        double dist = (curLine-line)*(curLine-line)+(curLineOffset-lineOffset)*(curLineOffset-lineOffset);
                        if (dist < closestAnnotationDist) {
                            closestAnnotation = ann;
                            closestAnnotationDist = dist;
                        }
                    }
            }
        }

        return closestAnnotation;
    }

    private void patchStatus(final String status, Response.Listener<JSONObject> callback) {
        essay.status = status;
        JSONObject data = new JSONObject();
        try {
            data.put("status", status);
        }
        catch (JSONException e) {
            e.printStackTrace();
            finish();
            return ;
        }
        app.initiateAPICall(Request.Method.PATCH, "essay/" + essay.id + "/", data, callback, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                finish();
            }
        });
    }

    private void reject() {
        patchStatus("rejected", new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Toast.makeText(TextEssayDetailActivity.this, "Essay rejected", Toast.LENGTH_SHORT).show();
                finish();
            }
        });
    }

    private void accept() {
        rejectButton.setVisibility(View.INVISIBLE);
        completedButton.setVisibility(View.VISIBLE);
        patchStatus("accepted", new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
            }
        });
    }

    private void complete() {
        essayTextView.setTextIsSelectable(false);
        completedButton.setVisibility(View.INVISIBLE);
        patchStatus("completed", new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Toast.makeText(TextEssayDetailActivity.this, "Essay completed", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private boolean annotateClicked(final int selStart, final int selEnd) {
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
                ann.creator = app.getUsername();
                JSONObject data;
                try {
                    data = ann.toJSON();
                    data.remove("id");
                }
                catch (JSONException e) {
                    e.printStackTrace();
                    return ;
                }
                if (essay.reviewer.equals(app.getUsername())) { // Reviewers implicitly accept essays by creating annotations
                    if (essay.status.equals("accepted") == false) {
                        accept();
                        essay.status = "accepted";
                        rejectButton.setVisibility(View.INVISIBLE);
                    }
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

    private void annotationsLoaded(JSONArray response) {
        TextEssayDetailActivity.this.setContentView(R.layout.activity_text_essay_detail_loaded);
        reviewerInfoLayout = findViewById(R.id.detail_header_layout_include);
        reviewerInfoTextView = reviewerInfoLayout.findViewById(R.id.reviewerInfoTextView);
        reviewerProfileButton = reviewerInfoLayout.findViewById(R.id.reviewerProfileButton);
        essayTextView = findViewById(R.id.essayTextView);
        rejectButton = findViewById(R.id.rejectButton);
        completedButton = findViewById(R.id.completedButton);
        progressBar = null;
        try {
            for (int i = 0; i < response.length(); i++)
                annotations.add(AnnotationForTextEssay.fromJSON(response.getJSONObject(i)));
        }
        catch (JSONException e) {
            e.printStackTrace();
            finish();
            return ;
        }
        drawAnnotations();
        if (app.getUsername().equals(essay.author) == false) { // We are the reviewer
            reviewerInfoLayout.setVisibility(View.GONE);
            if (essay.status.equals("accepted")) {
                rejectButton.setVisibility(View.INVISIBLE);
                completedButton.setVisibility(View.VISIBLE);
                essayTextView.setTextIsSelectable(true);
            }
            else if (essay.status.equals("pending")){
                rejectButton.setVisibility(View.VISIBLE);
                completedButton.setVisibility(View.INVISIBLE);
                essayTextView.setTextIsSelectable(true);
            }
            else if (essay.status.equals("completed")) {
                rejectButton.setVisibility(View.INVISIBLE);
                completedButton.setVisibility(View.INVISIBLE);
                essayTextView.setTextIsSelectable(false);
            }
            else if (essay.status.equals("rejected")) {
                rejectButton.setVisibility(View.INVISIBLE);
                completedButton.setVisibility(View.INVISIBLE);
                essayTextView.setTextIsSelectable(false);
            }
            rejectButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    reject();
                }
            });
            completedButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    complete();
                }
            });
        }
        else { // We are the author
            essayTextView.setTextIsSelectable(true);
            rejectButton.setVisibility(View.INVISIBLE);
            completedButton.setVisibility(View.INVISIBLE);
            reviewerInfoTextView.setText("Reviewer is @" + essay.reviewer);
            reviewerProfileButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    reviewerProfileButtonClicked();
                }
            });
        }
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
                    return annotateClicked(selStart, selEnd);
                }
                return false;
            }

            @Override
            public void onDestroyActionMode(ActionMode mode) {
            }
        });
        essayTextView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                return essayTextViewOnTouch(v, event);
            }
        });
    }

    private void reviewerProfileButtonClicked() {
        Intent intent = new Intent(this, ProfilePageActivity.class);
        intent.putExtra("username", essay.reviewer);
        startActivity(intent);
    }

    private boolean essayTextViewOnTouch(View v, MotionEvent event) {
        if (event.getAction() != MotionEvent.ACTION_UP) {
            if (essayTextView.isTextSelectable())
                return false;
            else
                return true; // On the reviwer side, we need to return false because otherwise Android doesn't pass the touch event to the defaut handler that shows the action bar, including the "Annotate" button. But on the author side, we need to return true because otherwise Android doesn't tell us about the corresponding ACTIOB_UP event. Why does this not happen on the reviewer side, I don't know.
        }
        if (event.getEventTime()-event.getDownTime() > app.TOUCH_AND_HOLD_DELAY_MS)
            return false; // This allows the default touch handler of Android (that shows the actions as a floating bar) appear
        Layout layout = ((TextView) v).getLayout();
        int x = (int)event.getX();
        int y = (int)event.getY();
        if (layout!=null){
            int line = layout.getLineForVertical(y);
            int offset = layout.getOffsetForHorizontal(line, x);
            int lineOffset = offset-layout.getLineStart(line);
            AnnotationForTextEssay ann = getAnnotationFromXYPosition(line, lineOffset);
            if (ann != null) {
                AnnotationDialogHelper.showAnnotationDialog(this, ann.annotationText, ann.creator);
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_essay_detail_loading);
        app = (MyApplication) getApplication();
        essay = (Essay)getIntent().getSerializableExtra("essay");
        progressBar = findViewById(R.id.downloadProgressBar);

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
                        annotationsLoaded(response);
                    }
                }, null);
            }
        }, null);
    }
}
