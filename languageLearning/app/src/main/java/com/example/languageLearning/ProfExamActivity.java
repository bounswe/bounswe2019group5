package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ProfExamActivity extends AppCompatActivity {

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
        setContentView(R.layout.activity_prof_exam);
        app = (MyApplication) getApplication();
        currentQuestionIndex = 0;
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
        String languageChoice = getIntent().getStringExtra("languageChoice");
        if (languageChoice == null)
            languageChoice = "English";
        Log.d(TAG, "languageChoice: " + languageChoice);
        getQuestions(languageChoice);
    }

    private void getQuestions(String languageChoice) {
        final String path = "proficiency?language=" + languageChoice.toLowerCase();

        app.initiateAPICall(Request.Method.GET, path, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    questionsArrived(response);
                }
                catch (JSONException e) {
                    e.printStackTrace();
                    return ;
                }
                currentQuestionIndex = 0;
                setCurrentQuestion(currentQuestionIndex);
            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                finish();
            }
        });
    }

    private void questionsArrived(JSONObject object) throws JSONException {
        exercise = Exercise.fromJSON(object);
        chosenAnswers = new String[exercise.questions.length];
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
                try {
                    JSONArray answer_key = response.getJSONArray("correct_answer");
                    int trueCount = 0;
                    for (int i=0; i<exercise.questions.length; i++) {
                        if (answer_key.getString(i).equals(chosenAnswers[i]))
                            trueCount++;
                    }
                    int falseCount = exercise.questions.length-trueCount;
                    String level = response.getString("level");
                    showResults(trueCount, falseCount, level);
                }
                catch (JSONException e) {
                    e.printStackTrace();
                    return ;
                }
            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                finish();
            }
        });
    }

    private void showResults(int correctCount, int falseCount, String level) {
        Intent intent = new Intent(this, ProfResultActivity.class);
        Bundle b = new Bundle();
        b.putInt("COUNT_CORRECT", correctCount);
        b.putInt("COUNT_INCORRECT", falseCount);
        b.putString("LEVEL", level);
        intent.putExtras(b);
        startActivity(intent);
        finish();
    }
}
