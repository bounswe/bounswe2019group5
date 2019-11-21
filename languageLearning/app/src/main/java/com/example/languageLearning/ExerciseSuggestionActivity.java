package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.icu.util.LocaleData;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

public class ExerciseSuggestionActivity extends AppCompatActivity {

    private MyApplication app;
    Button proceedToQuestions;
    RadioGroup languageGroup;
    RadioGroup exerciseTypeGroup;
    RadioGroup levelGroup;
    RadioButton radioButton;
    EditText suggestionTags;
    EditText suggestionKeywords;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercise_suggestion);
        app = (MyApplication)getApplication();

        suggestionKeywords = findViewById(R.id.suggestionKeywords);
        suggestionTags = findViewById(R.id.suggestionTags);
        languageGroup = findViewById(R.id.languageGroup);
        exerciseTypeGroup = findViewById(R.id.exerciseTypeGroup);
        levelGroup = findViewById(R.id.levelGroup);
        proceedToQuestions = findViewById(R.id.proceedToQuestions);

        proceedToQuestions.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                radioButton = findViewById(languageGroup.getCheckedRadioButtonId());
                String language = radioButton.getText().toString().toLowerCase();

                radioButton = findViewById(exerciseTypeGroup.getCheckedRadioButtonId());
                String type = radioButton.getText().toString().toLowerCase();

                radioButton = findViewById(levelGroup.getCheckedRadioButtonId());
                String level = radioButton.getText().toString();

                String[] keywords;
                String[] tags;

                if (suggestionKeywords.getText().toString().equals("") | suggestionKeywords.getText().toString().equals(",")){
                    Toast.makeText(getApplicationContext(), "Keywords field can not be empty.", Toast.LENGTH_SHORT).show();
                    return;
                } else{
                    keywords = suggestionKeywords.getText().toString().split(",");
                }

                if (suggestionTags.getText().toString().equals("") | suggestionTags.getText().toString().equals(",")){
                    Toast.makeText(getApplicationContext(), "Tags field cannot be empty.", Toast.LENGTH_SHORT).show();
                    return;
                }else {
                    tags = suggestionTags.getText().toString().split(",");
                }

                Suggestion suggestion = new Suggestion(type, language, level, tags, keywords);

                Intent intent = new Intent(ExerciseSuggestionActivity.this, QuestionSuggestionActivity.class);
                intent.putExtra("suggestion", suggestion);
                startActivity(intent);


            }
        });


    }
}
