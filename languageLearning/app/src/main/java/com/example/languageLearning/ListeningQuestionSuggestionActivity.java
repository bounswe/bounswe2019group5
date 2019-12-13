package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;

import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.FormBodyPart;
import org.apache.http.entity.mime.content.ByteArrayBody;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

public class ListeningQuestionSuggestionActivity extends AppCompatActivity {

    private static final int FILE_SELECT_CODE = 1;
    private static final int PERMISSION_REQUEST_CODE = 2;
    TextView questionBody, uploadListeningFileTextView;
    ImageButton uploadListening;
    MyApplication app;
    Suggestion suggestion;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question_suggestion);
        app = (MyApplication) getApplication();
        suggestion = (Suggestion) getIntent().getSerializableExtra("suggestion");

        questionBody = findViewById(R.id.questionBody);
        questionBody.setVisibility(View.INVISIBLE);

        uploadListeningFileTextView = findViewById(R.id.uploadListeningFileTextView);
        uploadListeningFileTextView.setVisibility(View.VISIBLE);

        uploadListening = findViewById(R.id.uploadListening);
        uploadListening.setVisibility(View.VISIBLE);
        uploadListening.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Boolean permissionResult = getExternalStoragePermission();
                if (permissionResult != null && permissionResult == true) {
                    showFileChooser();
                }
            }
        });

    }

    public Boolean getExternalStoragePermission() {
        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.READ_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {

            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.READ_EXTERNAL_STORAGE},
                    PERMISSION_REQUEST_CODE);
            return null;
        }

        return true;
    }

    private void showFileChooser() {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("*/*");
        intent.addCategory(Intent.CATEGORY_OPENABLE);

        try {
            startActivityForResult(
                    Intent.createChooser(intent, "Select a File to Upload"),
                    FILE_SELECT_CODE);
        } catch (android.content.ActivityNotFoundException ex) {
            Toast.makeText(this, "No file chooser was found",
                    Toast.LENGTH_SHORT).show();
        }
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch (requestCode) {
            case FILE_SELECT_CODE:
                if (resultCode == RESULT_OK) {
                    // Get the Uri of the selected file
                    Uri uri = data.getData();
                    Log.d("Listen", "File Uri: " + uri.toString());
                    uploadListeningFileTextView.setText("File Selected!");
                    HashMap<String, String> textParams = new HashMap<>();
                    FormBodyPart[] filePart = new FormBodyPart[1];

                    try {
                        Cursor result = getContentResolver().query(uri, null, null, null, null);
                        result.moveToFirst();
                        String fileName = result.getString(result.getColumnIndexOrThrow("_display_name"));
                        String mimeType = result.getString(result.getColumnIndexOrThrow("mime_type"));

                        filePart[0] = new FormBodyPart("writing", new ByteArrayBody(isToByteArray(getContentResolver().openInputStream(uri)), ContentType.create(mimeType), fileName));
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

                    app.initiateMultiPartAPICall(Request.Method.POST, "upload/", textParams, filePart, new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            Log.d("UPLOAD", response.toString());
                        }
                    }, new StringFunction() {
                        @Override
                        public void invoke(String s) {
                            finish();
                        }
                    });
                }
                break;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    byte[] isToByteArray(InputStream in) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        while (true) {
            int r = in.read(buffer);
            if (r == -1) break;
            out.write(buffer, 0, r);
        }

        return out.toByteArray();
    }
}
