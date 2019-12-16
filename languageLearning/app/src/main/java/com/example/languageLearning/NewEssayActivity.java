package com.example.languageLearning;

import androidx.annotation.NonNull;
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
import android.widget.Toast;

import java.net.URISyntaxException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

public class NewEssayActivity extends AppCompatActivity {

    private static final int FILE_SELECT_CODE = 1;
    private final String TAG = this.getClass().getName();

    private MyApplication app;
    ImageButton uploadFromFile, writeNew, myEssays;

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == MyApplication.EXTERNAL_STORAGE_PERMISSION_REQUEST_CODE) {
            if (grantResults.length == 0 || grantResults[0] == PackageManager.PERMISSION_DENIED) {
                Toast.makeText(this, "Read external storage permission is required to upload files",
                        Toast.LENGTH_SHORT).show();
                return ;
            }
            else {
                showFileChooser();
            }
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    private void showFileChooser() {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("image/*");
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

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch (requestCode) {
            case FILE_SELECT_CODE:
                if (resultCode == RESULT_OK) {
                    // Get the Uri of the selected file
                    Uri uri = data.getData();
                    Log.d(TAG, "File Uri: " + uri.toString());
                    Intent intent = new Intent(NewEssayActivity.this, SelectEssayReviewerActivity.class);
                    intent.putExtra("essayPath", uri.toString());
                    startActivity(intent);
                }
                break;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_essay);
        app = (MyApplication) getApplicationContext();
        uploadFromFile = findViewById(R.id.uploadFileButton);
        writeNew = findViewById(R.id.writeButton);
        myEssays = findViewById(R.id.myEssaysButton);

        myEssays.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(NewEssayActivity.this, ListEssaysActivity.class);
                startActivity(intent);
            }
        });

        uploadFromFile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Boolean permissionResult = MyApplication.getExternalStoragePermission(NewEssayActivity.this);
                if (permissionResult != null && permissionResult == true)
                    showFileChooser();
            }
        });

        writeNew.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(NewEssayActivity.this, WriteNewEssayActivity.class);
                startActivity(intent);
            }
        });
    }
}
