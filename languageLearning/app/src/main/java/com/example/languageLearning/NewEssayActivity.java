package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
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

    ImageButton uploadFromFile, writeNew;

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

    public String getPath(Uri uri) {
        String uris=uri.toString();
        try {
            uris = URLDecoder.decode(uris, StandardCharsets.UTF_8.name());
        }
        catch (Exception e) {
            return null;
        }
        Log.d(TAG, "Decoded uri: " + uris);
        if (uris.startsWith("content://com.android.externalstorage.documents/document/primary")) {
            int delimPos = uris.indexOf(':');
            delimPos = uris.indexOf(':', delimPos+1);
            uris = uris.substring(delimPos+1);
            return "/sdcard/" + uris;
        }
        return null;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch (requestCode) {
            case FILE_SELECT_CODE:
                if (resultCode == RESULT_OK) {
                    // Get the Uri of the selected file
                    Uri uri = data.getData();
                    Log.d(TAG, "File Uri: " + uri.toString());
                    // Get the path
                    String path = getPath(uri);
                    if (path == null) {
                        Toast.makeText(getApplicationContext(), "Unable to get real path", Toast.LENGTH_SHORT).show();
                        return ;
                    }
                    Log.d(TAG, "File Path: " + path);
                    Intent intent = new Intent(NewEssayActivity.this, UploadEssayActivity.class);
                    intent.putExtra("essayPath", path);
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
        uploadFromFile = findViewById(R.id.uploadFileButton);
        writeNew = findViewById(R.id.writeButton);

        uploadFromFile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
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
