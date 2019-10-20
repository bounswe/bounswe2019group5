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

class Question {
    int id; // As returned by the backend
    String text;
    String options[];
}

public class ProfExamActivity extends AppCompatActivity {

    private final String TAG = this.getClass().getName();

    MyApplication app;
    TextView question_textview;
    Button buttons[] = new Button[4];
    int currentQuestionIndex;

    private int examId; // As returned by the backend
    private Question[] questions;
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
        final String path = "user/proficiency?language=" + languageChoice.toLowerCase();

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
        examId = object.getInt("id");
        JSONArray jquestions = object.getJSONArray("questions");
        questions = new Question[jquestions.length()];
        chosenAnswers = new String[questions.length];
        for (int i=0; i<questions.length; i++) {
            JSONObject jquestion = (JSONObject) jquestions.get(i);
            JSONArray joptions = jquestion.getJSONArray("question_options");
            String text = jquestion.getString("text");
            String options[] = new String[4];
            for (int j=0; j<4; j++)
                options[j] = ((JSONObject)(joptions.get(j))).getString("text");
            questions[i] = new Question();
            questions[i].text = text;
            questions[i].options = options;
            questions[i].id = jquestion.getInt("id");
        }
    }

    private void setCurrentQuestion(int index) {
        question_textview.setText(questions[index].text);
        for (int i=0; i<4; i++)
            buttons[i].setText(questions[index].options[i]);
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

        if (currentQuestionIndex == questions.length) {
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
        showResults(1, 0); // The get_exam_result API wasn't ready at the time I wrote the code below. It can be turned on once the API becomes functional. No guarantees that it works.
        /*final String path = "user/get_exam_result";
        JSONObject data = new JSONObject();
        data.put("id", examId);
        JSONArray answers = new JSONArray();
        for (int i=0; i<questions.length; i++) {
            JSONObject object = new JSONObject();
            object.put("id", questions[i].id);
            object.put("answer", chosenAnswers[i]);
            answers.put(object);
        }
        data.put("answers", answers);
        app.initiateAPICall(Request.Method.POST, path, data, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    int trueCount = response.getInt("nuOfTrueAnswers");
                    int falseCount = response.getInt("nuOfFalseAnswers");
                    showResults(trueCount, falseCount);
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
        });*/
    }

    private void showResults(int correctCount, int falseCount) {
        Intent intent = new Intent(this, ProfResultActivity.class);
        Bundle b = new Bundle();
        b.putInt("COUNT_CORRECT", correctCount);
        b.putInt("COUNT_INCORRECT", falseCount);
        b.putString("LEVEL", calculateLevel(correctCount, correctCount + falseCount));
        intent.putExtras(b);
        startActivity(intent);
        finish();
    }
}
