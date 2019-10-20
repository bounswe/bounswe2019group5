package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.media.Image;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;

public class ProfResultActivity extends AppCompatActivity {

    TextView correctAnswer, incorrectAnswer, level;
    ImageButton homeButton;
    private static final String TAG = "MyActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_prof_result);

        correctAnswer = findViewById(R.id.correctAnswer);
        incorrectAnswer = findViewById(R.id.incorrectAnswer);
        level = findViewById(R.id.level);
        homeButton = findViewById(R.id.homeButton);

        homeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(ProfResultActivity.this, MainMenuActivity.class);
                startActivity(intent);
            }
        });

        Bundle b = getIntent().getExtras();
        int correctAnswerCount = b.getInt("COUNT_CORRECT");
        int incorrectAnswerCount = b.getInt("COUNT_INCORRECT");
        String profLevel = b.getString("LEVEL");
        correctAnswer.setText(String.valueOf(correctAnswerCount));
        incorrectAnswer.setText(String.valueOf(incorrectAnswerCount));
        level.setText(profLevel);
    }
}
