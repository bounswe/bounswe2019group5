package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;

import org.json.JSONObject;

import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

public class UploadEssayActivity extends AppCompatActivity {

    private final String TAG = getClass().getName();

    MyApplication app;
    String essayText;
    String essayPath;
    ProgressBar progressBar;
    ImageView checkCircleView;
    Button finishButton;
    TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_upload_essay);
        app = (MyApplication) getApplication();
        progressBar = findViewById(R.id.uploadProgressBar);
        finishButton = findViewById(R.id.finishButton);
        textView = findViewById(R.id.textView3);
        checkCircleView = findViewById(R.id.checkCircleView);
        finishButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(UploadEssayActivity.this, MainMenuActivity.class);
                startActivity(i);
                finish();
            }
        });
        essayText = getIntent().getStringExtra("essayText");
        essayPath = getIntent().getStringExtra("essayPath");
        HashMap<String, String> textParams = new HashMap<>();
        textParams.put("language", "english"); // TODO: This should reflect the actual language of the essay
        textParams.put("reviewer", "kbozdogan"); //TODO: Let the user choose the reviewer
        HashMap<String, File> fileParams = new HashMap<>();
        File tempFile = null;
        if (essayText != null) {
            try {
                tempFile = File.createTempFile("essay", ".txt", getCacheDir());
                tempFile.deleteOnExit();
                Writer writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(tempFile), "utf-8"));
                writer.write(essayText);
                writer.flush();
                fileParams.put("writing", tempFile);
            }
            catch (Exception e) {
                e.printStackTrace();
                finish();
                return;
            }
        }
        else {
            fileParams.put("writing", new File(essayPath));
        }
        app.initiateMultiPartAPICall(Request.Method.POST, "essay/", textParams, fileParams, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                progressBar.setVisibility(View.GONE);
                textView.setVisibility(View.GONE);
                checkCircleView.setVisibility(View.VISIBLE);
                finishButton.setVisibility(View.VISIBLE);
                Log.d(TAG, response.toString());
            }
        }, new StringFunction() {
            @Override
            public void invoke(String s) {
                finish();
            }
        });
    }
}
