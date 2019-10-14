package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;

public class ProfResultActivity extends AppCompatActivity {

    TextView correctCountView, incorrectCountView, levelView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_prof_result);
        correctCountView = findViewById(R.id.correct_count);
        incorrectCountView = findViewById(R.id.incorrect_count);
        levelView = findViewById(R.id.level);

        Bundle b = getIntent().getExtras();
        int correctCount = b.getInt("COUNT_CORRECT");
        int incorrectCount = b.getInt("COUNT_INCORRECT");
        String level = b.getString("LEVEL");
        correctCountView.setText(String.valueOf(correctCount));
        incorrectCountView.setText(String.valueOf(incorrectCount));
        levelView.setText(level);
    }
}
