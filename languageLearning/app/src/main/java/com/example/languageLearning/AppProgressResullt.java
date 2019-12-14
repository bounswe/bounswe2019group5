package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;
import android.widget.TextView;
import android.os.Bundle;

public class AppProgressResullt extends AppCompatActivity {
    TextView progressView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_app_progress_resullt);
        progressView = findViewById(R.id.progressPercentage);
        String progress = getIntent().getStringExtra("progress");
        progressView.setText(progress);
    }
}
