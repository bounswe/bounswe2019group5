package com.example.languageLearning;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;

public class ExerciseActivity extends AppCompatActivity {

    private final String TAG = this.getClass().getName();

    MyApplication app;
    TextView question_textview;
    Button buttons[] = new Button[4];
    int currentQuestionIndex;

    private Exercise exercise;
    private String[] chosenAnswers;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercise);
        app = (MyApplication) getApplication();
        question_textview = findViewById(R.id.exercise_question);
        buttons[0] = findViewById(R.id.exercise_option_1);
        buttons[1] = findViewById(R.id.exercise_option_2);
        buttons[2] = findViewById(R.id.exercise_option_3);
        buttons[3] = findViewById(R.id.exercise_option_4);
        for (int i=0; i<4; i++)
            buttons[i].setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    OptionClicked((Button)v);
                }
            });
        exercise = (Exercise) getIntent().getSerializableExtra("exercise");
        chosenAnswers = new String[exercise.questions.length];
        currentQuestionIndex = 0;
        setCurrentQuestion(0);
    }

    private void setCurrentQuestion(int index) {
        question_textview.setText(exercise.questions[index].text);
        for (int i=0; i<4; i++)
            buttons[i].setText(exercise.questions[index].options[i]);
    }

    /*private int getButtonIndex(Button b) {
        for (int i=0; i<4; i++) {
            if (b == buttons[i])
                return i;
        }
        return -1;
    }*/

    private void OptionClicked(Button v) {
        chosenAnswers[currentQuestionIndex] = v.getText().toString();
        currentQuestionIndex += 1;

        if (currentQuestionIndex == exercise.questions.length) {
            try {
                finishTest();
            }
            catch (JSONException e) {
                e.printStackTrace();
                return ;
            }
            return ;
        }

        setCurrentQuestion(currentQuestionIndex);
    }

    private void finishTest() throws JSONException {
        final String path = "result/";
        JSONObject data = new JSONObject();
        data.put("id", exercise.id);
        JSONArray answers = new JSONArray();
        for (int i=0; i<exercise.questions.length; i++) {
            answers.put(chosenAnswers[i]);
        }
        data.put("answers", answers);
        app.initiateAPICall(Request.Method.POST, path, data, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                //TODO: Use the correct answers we get from the backend to show to the user his correct/incorrect answers.
            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                finish();
            }
        });
    }
}
