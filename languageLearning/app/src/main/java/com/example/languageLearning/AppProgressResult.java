package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;
import android.widget.TextView;
import android.os.Bundle;
public class AppProgressResult extends AppCompatActivity {
    TextView progressView;
    TextView progressLabel2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_app_progress_resullt);
        progressView = findViewById(R.id.progressPercentage);
        progressLabel2 = findViewById(R.id.progressLabel2);
        String progress = getIntent().getStringExtra("progress");
        String language = getIntent().getStringExtra("language");
        progressView.setText(progress);
        progressLabel2.setText("of the "+language+" exercises");
    }
}
