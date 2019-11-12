package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;

public class NewEssayActivity extends AppCompatActivity {

    ImageButton uploadFromFile, writeNew;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_essay);
        uploadFromFile = findViewById(R.id.uploadFileButton);
        writeNew = findViewById(R.id.writeButton);

        uploadFromFile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /*Intent intent = new Intent(NewEssayActivity.this, UploadEssayFromFileActivity.class);
                startActivity(intent);*/ // TODO: Enable this
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
