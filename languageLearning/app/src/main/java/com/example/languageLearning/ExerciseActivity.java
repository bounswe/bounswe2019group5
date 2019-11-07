package com.example.languageLearning;

import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ExerciseActivity extends AppCompatActivity {

    private final String TAG = this.getClass().getName();

    MyApplication app;
    TextView question_textview, progress_textview;
    Button buttons[] = new Button[4];
    FloatingActionButton fabLeft, fabRight;
    Button submitButton;
    int currentQuestionIndex;

    private Exercise exercise;
    private String[] chosenAnswers;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercise);
        app = (MyApplication) getApplication();
        question_textview = findViewById(R.id.exercise_question);
        progress_textview = findViewById(R.id.exercise_progress);
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
        fabLeft = findViewById(R.id.exerciseFABLeft);
        fabRight = findViewById(R.id.exerciseFABRight);
        fabLeft.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (currentQuestionIndex > 0)
                    setCurrentQuestion(currentQuestionIndex-1);
            }
        });
        fabRight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (currentQuestionIndex != exercise.questions.length-1)
                    setCurrentQuestion(currentQuestionIndex+1);
            }
        });
        submitButton = findViewById(R.id.exercise_submit);
        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    finishTest();
                }
                catch (JSONException e) {
                    e.printStackTrace();
                    return ;
                }
            }
        });
        exercise = (Exercise) getIntent().getSerializableExtra("exercise");
        chosenAnswers = new String[exercise.questions.length];
        setCurrentQuestion(0);
    }

    private void setCurrentQuestion(int index) {
        currentQuestionIndex = index;
        progress_textview.setText((index+1) + " / " + exercise.questions.length);
        question_textview.setText(exercise.questions[index].text);
        for (int i=0; i<4; i++) {
            buttons[i].setText(exercise.questions[index].options[i]);
            if (exercise.questions[index].options[i].equals(chosenAnswers[currentQuestionIndex]))
                buttons[i].setBackground(getResources().getDrawable(android.R.color.holo_blue_dark));
            else
                buttons[i].setBackground(getResources().getDrawable(android.R.color.holo_blue_bright));
        }
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
        if (currentQuestionIndex != exercise.questions.length-1)
            currentQuestionIndex += 1;
        setCurrentQuestion(currentQuestionIndex);
    }

    private void finishTest() throws JSONException {
        final String path = "result/";
        JSONObject data = new JSONObject();
        data.put("id", exercise.id);
        JSONArray answers = new JSONArray();
        for (int i=0; i<exercise.questions.length; i++) {
            if (chosenAnswers[i] != null)
                answers.put(chosenAnswers[i]);
            else
                answers.put(JSONObject.NULL);
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
