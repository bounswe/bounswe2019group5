package com.example.languageLearning;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.text.SpannableString;
import android.text.style.BackgroundColorSpan;
import android.view.ActionMode;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.lang.annotation.Annotation;

public class TextEssayDetailActivity extends AppCompatActivity {

    Essay essay;
    TextView essayTextView;
    Button finishButton;
    MyApplication app;
    ProgressBar progressBar;
    String essayText;

    static SpannableString getSpannableString(String text, TextAnnotation[] annotations) {
        SpannableString ss = new SpannableString(text);
        for (TextAnnotation ann : annotations) {
            ss.setSpan(new BackgroundColorSpan(Color.YELLOW), ann.start, ann.end, 0);
        }
        return ss;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_text_essay_detail);
        app = (MyApplication) getApplication();
        essay = (Essay)getIntent().getSerializableExtra("essay");
        essayTextView = findViewById(R.id.essayTextView);
        finishButton = findViewById(R.id.finishButton);
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
                                JSONObject data = new JSONObject();
                                JSONObject body = new JSONObject();
                                JSONObject selector = new JSONObject();
                                try {
                                    body.put("target", edittext.getText().toString());
                                    selector.put("value", "char=" + selStart + "," + selEnd);
                                    body.put("selector", selector);
                                    data.put("source", essay.fileUri.toString());
                                }
                                catch (JSONException e) {
                                    e.printStackTrace();
                                    return ;
                                }
                                app.initiateAPICall(Request.Method.POST, "annotation/", data, new Response.Listener<JSONObject>() {
                                    @Override
                                    public void onResponse(JSONObject response) {
                                        // pass
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

        finishButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(TextEssayDetailActivity.this, MainMenuActivity.class);
                startActivity(i);
                finish();
            }
        });

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
                catch (IOException e) {
                    Toast.makeText(getApplicationContext(), e.toString(), Toast.LENGTH_SHORT).show();
                    return ;
                }
                essayText = result.toString();

                app.initiateAPICall(Request.Method.GET, "annotation/", null, new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        TextAnnotation[] annotations = new TextAnnotation[response.length()];
                        try {
                            for (int i = 0; i < annotations.length; i++)
                                annotations[i] = TextAnnotation.fromJSON(response.getJSONObject(i));
                        }
                        catch (JSONException e) {
                            e.printStackTrace();
                            finish();
                            return ;
                        }
                        SpannableString spannableString = getSpannableString(essayText, annotations);
                        progressBar.setVisibility(View.GONE);
                        essayTextView.setText(spannableString);
                        essayTextView.setVisibility(View.VISIBLE);
                        finishButton.setVisibility(View.VISIBLE);
                    }
                }, null);
            }
        }, null);
    }
}
