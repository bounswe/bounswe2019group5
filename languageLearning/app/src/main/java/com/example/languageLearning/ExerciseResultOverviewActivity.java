package com.example.languageLearning;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;

import java.util.Objects;

import androidx.appcompat.app.AppCompatActivity;

public class ExerciseResultOverviewActivity extends AppCompatActivity {

    TextView correctAnswer, incorrectAnswer;
    Button seeCorrectAnswerButton;
    ImageButton homeButton;
    private final String TAG = this.getClass().getName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercise_result_overview);

        correctAnswer = findViewById(R.id.correctAnswer);
        incorrectAnswer = findViewById(R.id.incorrectAnswer);
        seeCorrectAnswerButton = findViewById(R.id.seeCorrectAnswers);
        homeButton = findViewById(R.id.homeButton);

        final Exercise exercise = (Exercise)getIntent().getSerializableExtra("exercise");
        final String[] chosenAnswers = getIntent().getStringArrayExtra("chosenAnswers");
        final String[] correctAnswers = getIntent().getStringArrayExtra("correctAnswers");

        final String exerciseType = getIntent().getStringExtra("type");

        seeCorrectAnswerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(ExerciseResultOverviewActivity.this, ExerciseActivity.class);

                intent.putExtra("exercise", exercise);
                intent.putExtra("type", exerciseType);
                intent.putExtra("chosenAnswers", chosenAnswers);
                intent.putExtra("correctAnswers", correctAnswers); // Providing a non-null correctAnswers causes the ExerciseActivity to be run in "answer key" mode.
                startActivity(intent);
            }
        });

        homeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(ExerciseResultOverviewActivity.this, MainMenuActivity.class);
                startActivity(intent);
            }
        });

        int correctAnswerCount = 0;
        int incorrectAnswerCount = 0;
        for (int i=0; i<exercise.questions.length; i++) {
            if (correctAnswers[i].equals(chosenAnswers[i]))
                correctAnswerCount += 1;
            else
                incorrectAnswerCount += 1;
        }
        correctAnswer.setText(String.valueOf(correctAnswerCount));
        incorrectAnswer.setText(String.valueOf(incorrectAnswerCount));
    }
}
