package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class ProfExamActivity extends AppCompatActivity {

    TextView question_textview;
    Button buttons[] = new Button[4];

    final private String dummy_question = "Which of the options below is a correct sentence?";

    final private String[] dummy_options = {
            "Man the walked up the street",
            "The man walk up the street",
            "The man walked up the street",
            "The man walked up a street"
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_prof_exam);
        question_textview = findViewById(R.id.prof_question);
        buttons[0] = findViewById(R.id.prof_option_1);
        buttons[1] = findViewById(R.id.prof_option_2);
        buttons[2] = findViewById(R.id.prof_option_3);
        buttons[3] = findViewById(R.id.prof_option_4);
        question_textview.setText(dummy_question);
        for (int i=0; i<4; i++)
            buttons[i].setText(dummy_options[i]);
    }
}
