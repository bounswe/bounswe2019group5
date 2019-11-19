package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

public class ExerciseSuggestionActivity extends AppCompatActivity {

    private MyApplication app;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercise_suggestion);
        app = (MyApplication)getApplication();


    }
}
