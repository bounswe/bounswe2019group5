package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class ProfExamActivity extends AppCompatActivity {

    TextView question_textview;
    Button buttons[] = new Button[4];
    int currentQuestionIndex;
    int correctCount=0;

    final private String[] dummy_questions = {
            "Which of the options below is a correct sentence?",
            "Choose the odd one out",
            "Which is the indirect speech for the sentence \"He said, 'I love this place' \""
    };

    final private String[][] dummy_options = {
            new String[]{
                    "Man the walked up the street",
                    "The man walk up the street",
                    "The man walked up the street",
                    "The man walked up a street"
            },
            new String[]{
                    "shoe",
                    "orange",
                    "pineapple",
                    "apple"
            },
            new String[]{
                    "He said that I love this place",
                    "He said that he loved that place",
                    "He said that I loved that place",
                    "He said that he loves this place"
            }
    };

    final private int[] dummy_answers = {
        2, 0, 1
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
        for (int i=0; i<4; i++)
            buttons[i].setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    OptionClicked((Button)v);
                }
            });
        currentQuestionIndex = 0;
        setCurrentQuestion(currentQuestionIndex);
    }

    private void setCurrentQuestion(int index) {
        question_textview.setText(dummy_questions[index]);
        for (int i=0; i<4; i++)
            buttons[i].setText(dummy_options[index][i]);
    }

    private int getButtonIndex(Button b) {
        for (int i=0; i<4; i++) {
            if (b == buttons[i])
                return i;
        }
        return -1;
    }

    private void OptionClicked(Button v) {
        int buttonIndex = getButtonIndex(v);
        if (dummy_answers[currentQuestionIndex] == buttonIndex)
            correctCount += 1;
        currentQuestionIndex += 1;

        if (currentQuestionIndex == dummy_questions.length) {
            showResults();
            return ;
        }

        setCurrentQuestion(currentQuestionIndex);
    }

    private String calculateLevel(int corr, int all) {
        if (corr < all*18.0/100)
            return "A1";
        if (corr < all*36.0/100)
            return "A2";
        if (corr < all*54.0/100)
            return "B1";
        if (corr < all*72.0/100)
            return "B2";
        if (corr < all*90.0/100)
            return "C1";
        return "C2";
    }

    private void showResults() {
        Intent intent = new Intent(this, ProfResultActivity.class);
        Bundle b = new Bundle();
        b.putInt("COUNT_CORRECT", correctCount);
        b.putInt("COUNT_INCORRECT", dummy_questions.length - correctCount);
        b.putString("LEVEL", calculateLevel(correctCount, dummy_questions.length));
        intent.putExtras(b);
        startActivity(intent);
        finish();
    }
}
