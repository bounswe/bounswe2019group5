package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.widget.ProgressBar;
import android.widget.TextView;
import android.os.Bundle;
public class AppProgressResult extends AppCompatActivity {
    TextView progressView;
    TextView progressLabel2;
    ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_app_progress_resullt);
        progressView = findViewById(R.id.progressPercentage);
        progressLabel2 = findViewById(R.id.progressLabel2);
        String progress = getIntent().getStringExtra("progress");
        String language = getIntent().getStringExtra("language");
        Double progressDouble = getIntent().getDoubleExtra("progressDouble",0.0);
        Double totalGrade = getIntent().getDoubleExtra("total_grade",0.0);
        progressView.setText(progress);
        progressLabel2.setText("of the "+language.substring(0,1).toUpperCase()+language.substring(1)+" exercises");
        progressBar = findViewById(R.id.appProgressBar);

        progressBar.setProgress((int)(double)progressDouble);


    }
}
