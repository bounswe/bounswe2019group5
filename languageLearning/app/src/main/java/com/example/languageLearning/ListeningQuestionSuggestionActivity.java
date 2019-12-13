package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

public class ListeningQuestionSuggestionActivity extends AppCompatActivity {

    private static final int FILE_SELECT_CODE = 1;
    private static final int PERMISSION_REQUEST_CODE = 2;
    TextView questionBody, uploadListeningFileTextView;
    ImageButton uploadListening;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question_suggestion);

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

                }
                break;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }
}
