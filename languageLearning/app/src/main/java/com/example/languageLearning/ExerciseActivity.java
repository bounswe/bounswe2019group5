package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

public class ExerciseActivity extends AppCompatActivity {

    private final String TAG = this.getClass().getName();

    MyApplication app;
    TextView question_textview, progress_textview;
    Button buttons[] = new Button[4];
    ImageButton playButton;
    FloatingActionButton fabLeft, fabRight;
    Button submitButton;
    int currentQuestionIndex;

    private boolean answerKeyMode; // True if we are in the "answer key" mode. The app switches to this mode once the user chooses to see the correct answers at the exercise result overview screen.
    private Exercise exercise;
    private String exerciseType;
    private String[] chosenAnswers;
    private String[] correctAnswers; // Used in the "answer key" mode.

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercise);
        app = (MyApplication) getApplication();
        exercise = (Exercise) getIntent().getSerializableExtra("exercise");
        exerciseType = getIntent().getStringExtra("type");
        correctAnswers = getIntent().getStringArrayExtra("correctAnswers");
        if (correctAnswers == null)
            answerKeyMode = false;
        else
            answerKeyMode = true;
        if (answerKeyMode == false)
            chosenAnswers = new String[exercise.questions.length];
        else
            chosenAnswers = getIntent().getStringArrayExtra("chosenAnswers");
        question_textview = findViewById(R.id.exercise_question);
        progress_textview = findViewById(R.id.exercise_progress);
        playButton = findViewById(R.id.playButton);
        if (exerciseType.equals("listening"))
            question_textview.setText("What is the sentence in this audio?");
        else
            playButton.setVisibility(View.GONE);
        buttons[0] = findViewById(R.id.exercise_option_1);
        buttons[1] = findViewById(R.id.exercise_option_2);
        buttons[2] = findViewById(R.id.exercise_option_3);
        buttons[3] = findViewById(R.id.exercise_option_4);
        for (int i=0; i<4; i++) {
            if (answerKeyMode)
                buttons[i].setEnabled(false);
            else {
                buttons[i].setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        OptionClicked((Button) v);
                    }
                });
            }
        }
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
        if (answerKeyMode)
            submitButton.setVisibility(View.INVISIBLE);
        else {
            submitButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    try {
                        finishTest();
                    } catch (JSONException e) {
                        e.printStackTrace();
                        return;
                    }
                }
            });
        }
        setCurrentQuestion(0);
    }

    private void setCurrentQuestion(int index) {
        currentQuestionIndex = index;
        progress_textview.setText((index+1) + " / " + exercise.questions.length);
        if (exerciseType.equals("listening") == false)
        question_textview.setText(exercise.questions[index].text);
        for (int i=0; i<4; i++) {
            buttons[i].setText(exercise.questions[index].options[i]);
            if (exercise.questions[index].options[i].equals(chosenAnswers[currentQuestionIndex]))
                buttons[i].setBackground(getResources().getDrawable(android.R.color.holo_blue_dark)); // Highlight the chosen answer
            else
                buttons[i].setBackground(getResources().getDrawable(android.R.color.holo_blue_bright));
            if(correctAnswers!=null && exercise.questions[index].options[i].equals(correctAnswers[currentQuestionIndex])) { // If we are in "answer key" mode and we are drawing the correct answer's button...
                if (exercise.questions[index].options[i].equals(chosenAnswers[currentQuestionIndex]))
                    buttons[i].setBackground(getResources().getDrawable(android.R.color.holo_green_light)); // Paint it green, if the user chose this answer (he was correct)
                else
                    buttons[i].setBackground(getResources().getDrawable(android.R.color.holo_red_light)); // Paint it red, if the user answered incorrectly
            }
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
        String id = exercise.id + "";
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
                try {
                    String[] correctAnswers = toStringArray(response.getJSONArray("correct_answer"));
                    Intent intent = new Intent(ExerciseActivity.this, ExerciseResultOverviewActivity.class);
                    intent.putExtra("exercise", exercise);
                    intent.putExtra("type", exerciseType);
                    intent.putExtra("chosenAnswers", chosenAnswers);
                    intent.putExtra("correctAnswers", correctAnswers);
                    startActivity(intent);
                }
                catch (JSONException e) {
                    e.printStackTrace();
                }
                finish();
            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                finish();
            }
        });
    }

    public static String[] toStringArray(JSONArray array) {
        if(array==null)
            return null;

        String[] arr=new String[array.length()];
        for(int i=0; i<arr.length; i++) {
            arr[i]=array.optString(i);
        }
        return arr;
    }

    public void onClickPlay(View view){

        MediaPlayer mediaPlayer = new MediaPlayer();
        mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
        try {
            mediaPlayer.setDataSource(exercise.questions[currentQuestionIndex].text);
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            mediaPlayer.prepare(); // might take long! (for buffering, etc)
        } catch (IOException e) {
            e.printStackTrace();
        }
        mediaPlayer.start();

    }
}
