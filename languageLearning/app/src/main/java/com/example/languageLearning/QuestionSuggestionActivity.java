package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Button;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.RequestFuture;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class QuestionSuggestionActivity extends AppCompatActivity {

    private MyApplication app;
    EditText questionBody;
    EditText correctAnswerSelection;
    EditText otherAnswer1;
    EditText otherAnswer2;
    EditText otherAnswer3;
    Button addAnotherQuestion;
    Button addAndFinishSuggestion;
    ArrayList<Question> questions = new ArrayList<Question>();
    Suggestion suggestion;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question_suggestion);
        app = (MyApplication)getApplication();
        suggestion = (Suggestion) getIntent().getSerializableExtra("suggestion");

        questionBody = findViewById(R.id.questionBody);
        correctAnswerSelection = findViewById(R.id.correctAnswerSelection);
        otherAnswer1 = findViewById(R.id.otherAnswer1);
        otherAnswer2 = findViewById(R.id.otherAnswer2);
        otherAnswer3 = findViewById(R.id.otherAnswer3);
        addAnotherQuestion = findViewById(R.id.addAnotherQuestion);
        addAndFinishSuggestion = findViewById(R.id.addAndFinishSuggestion);
        ArrayList<Question> questions;

        addAnotherQuestion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (areTextEditsValid()) {
                    addQuestion();
                    Toast.makeText(getApplicationContext(), "Question has been saved.", Toast.LENGTH_SHORT).show();
                    clearTextEdits();
                }else {
                    Toast.makeText(getApplicationContext(), "All fields must be filled to create a question.", Toast.LENGTH_SHORT).show();
                }
            }
        });

        addAndFinishSuggestion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (areTextEditsValid()) {
                    addQuestion();
                    try {
                        sendSuggestion();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                } else {
                    Toast.makeText(getApplicationContext(), "All fields must be filled to create a question.", Toast.LENGTH_SHORT).show();
                }
            }
        });

    }

    private void sendSuggestion() throws JSONException {
        suggestion.questions = questions;
        JSONObject JSONSuggestion = suggestion.toJsonObject();
        String path = "suggest/";
        app.initiateAPICall(Request.Method.POST, path, JSONSuggestion, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Toast.makeText(getApplicationContext(), "Your Suggestion has been submitted.", Toast.LENGTH_SHORT).show();
                finish();
            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                finish();
            }
        });

    }

    private boolean areTextEditsValid() {
        if (questionBody.getText().toString().equals("") |
                correctAnswerSelection.getText().toString().equals("") |
                otherAnswer1.getText().toString().equals("") |
                otherAnswer2.getText().toString().equals("") |
                otherAnswer3.getText().toString().equals("")) {
            return false;
        }else{
            return true;
        }
    }


    private void clearTextEdits() {
        questionBody.setText("");
        correctAnswerSelection.setText("");
        otherAnswer1.setText("");
        otherAnswer2.setText("");
        otherAnswer3.setText("");
    }

    private void addQuestion() {
        String qBody = questionBody.getText().toString();
        String correctAnswer = correctAnswerSelection.getText().toString();
        String other1 = otherAnswer1.getText().toString();
        String other2 = otherAnswer2.getText().toString();
        String other3 = otherAnswer3.getText().toString();
        String[] options = new String[]{other1,other2,other3,correctAnswer};
        Question newQuestion = new Question(qBody, options, correctAnswer);
        questions.add(newQuestion);
    }
}
