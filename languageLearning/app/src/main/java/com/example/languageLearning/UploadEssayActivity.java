package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;

import cz.msebera.android.httpclient.entity.ContentType;
import cz.msebera.android.httpclient.entity.mime.FormBodyPart;
import cz.msebera.android.httpclient.entity.mime.content.ByteArrayBody;
import cz.msebera.android.httpclient.entity.mime.content.InputStreamBody;
import org.json.JSONObject;

import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.io.Serializable;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.text.Normalizer;
import java.util.HashMap;

public class UploadEssayActivity extends AppCompatActivity {

    private final String TAG = getClass().getName();

    MyApplication app;
    String essayText;
    String essayPath;
    UserProfile reviewerProfile;
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
        reviewerProfile = (UserProfile)getIntent().getSerializableExtra("reviewerProfile");
        HashMap<String, String> textParams = new HashMap<>();
        textParams.put("language", app.getLanguage());
        textParams.put("reviewer", reviewerProfile.username);
        FormBodyPart[] filePart = new FormBodyPart[1];
        if (essayText != null) {
            filePart[0] = new FormBodyPart("writing", new ByteArrayBody(essayText.getBytes(StandardCharsets.UTF_8), ContentType.TEXT_PLAIN, "essay.txt"));
        }
        else {
            try {
                Cursor result = getContentResolver().query(Uri.parse(essayPath), null, null, null, null);
                result.moveToFirst();
                String fileName = result.getString(result.getColumnIndexOrThrow("_display_name"));
                String mimeType = result.getString(result.getColumnIndexOrThrow("mime_type"));

                filePart[0] = new FormBodyPart("writing", new ByteArrayBody(MyApplication.isToByteArray(getContentResolver().openInputStream(Uri.parse(essayPath))), ContentType.create(mimeType), fileName));
            }
            catch (FileNotFoundException e) {
                e.printStackTrace();
                Toast.makeText(this, "File not found", Toast.LENGTH_SHORT).show();
                finish();
                return;
            }
            catch (IOException e) {
                e.printStackTrace();
                Toast.makeText(this, "Error reading the file", Toast.LENGTH_SHORT).show();
                finish();
                return;
            }
        }
        app.initiateMultiPartAPICall(Request.Method.POST, "essay/", textParams, filePart, new Response.Listener<JSONObject>() {
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
