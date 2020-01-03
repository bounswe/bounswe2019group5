package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


import java.util.ArrayList;

public class AppProgress extends AppCompatActivity {
    private final String TAG = this.getClass().getName();


    MyApplication app;
    double total_progress = 0;
    int total_grade = 0;
    String languageSet = "";
    public int number_of_true;
    public int number_of_false;
    public int total_questions;
    public int ntc,nt,cecl,eicl;
    String gradeString = "Solve Exercises to get a grade";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = (MyApplication) getApplication();
        setContentView(R.layout.activity_app_progress);

    }

    public void onClickLanguageButton(View view){
        Button b = (Button) view;
        final String language = b.getText().toString().toLowerCase();
        Log.d("LANGUAGE IS SET LIKE : ",language);
        languageSet = language;
        getProgress(language);
        Log.d("OFF METHOD  : "," GETPROGRESS OUT ONCLICK AGAIN");

    }

    public static AppProgress fromJSON(JSONObject progress) throws JSONException {
        AppProgress pgs = new AppProgress();
        pgs.number_of_true = progress.getInt("number_of_true");
        pgs.number_of_false = progress.getInt("number_of_false");
        pgs.ntc = progress.getInt("number_of_test_completed");
        pgs.nt = progress.getInt("number_of_test");
        pgs.cecl = progress.getInt("completed_exercise_current_level");
        pgs.eicl = progress.getInt("exercise_in_current_level");

        return pgs;
    }

    private void getProgress(String language) {
        final String path1 = "result/?language="+language;
        app.initiateAPICall(Request.Method.GET, path1, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                if (response.length() == 0) {
                    Toast.makeText(getApplicationContext(), "No grade found according to this language", Toast.LENGTH_SHORT).show();;
                    return;
                }

                JSONObject grades = (JSONObject) response ;
                Log.d("Response", grades.toString());
                try {
                    //JSONObject presult = (JSONObject) progressResults.get(0);
                    number_of_true = grades.getInt("number_of_true");
                    Log.d("trues", number_of_true+"");
                    number_of_false =  grades.getInt("number_of_false");
                    Log.d("falses", number_of_false+"");
                    total_questions = number_of_false + number_of_true;
                    double grade1= (((double)number_of_true/(double)total_questions)*100);
                    Log.d(TAG," "+grade1+" grade1");
                    //double total_gradeTwoDigit = Math.floor(total_grade);
                    total_grade = (int)grade1;

                    gradeString="Total Grade: " + total_grade;
                    Log.d(TAG," "+total_grade+" over 100");

                } catch (JSONException e) {
                    e.printStackTrace();
                }





            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                finish();
            }
        });
        final String path2 = "progress/?language="+language;
        Log.d("PROCESSED","PROGRESS IS BEING PROCESSED.......");
        app.initiateAPICall(Request.Method.GET, path2, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                if (response.length() == 0) {
                    Toast.makeText(getApplicationContext(), "No progress found according to this language", Toast.LENGTH_SHORT).show();
                    Log.d(TAG,"Error retrieving progress");
                    finish();
                    return;
                }

                JSONObject progressResults = (JSONObject) response ;
                Log.d("Response", progressResults.toString());
                try {
                   //JSONObject presult = (JSONObject) progressResults.get(0);
                    ntc = progressResults.getInt("number_of_test_completed");
                    Log.d("ntc", ntc+"");
                    nt =  progressResults.getInt("number_of_test");
                    Log.d("nt", nt+"");
                    cecl = progressResults.getInt("completed_exercise_current_level");
                    Log.d("cecl", cecl+"");
                    eicl = progressResults.getInt("exercise_in_current_level");
                    Log.d("eicl", eicl+"");

                    total_progress = ((double)ntc/(double)nt)*100;
                    double total_progressTwoDigit = Math.floor(total_progress* 100) / 100;
                    String progressString= total_progressTwoDigit+"%";
                    Log.d(TAG," "+total_progressTwoDigit+"%");

                    Intent i = new Intent(AppProgress.this, AppProgressResult.class);
                    i.putExtra("progressDouble", total_progressTwoDigit);
                    i.putExtra("progress", progressString);
                    i.putExtra("language", languageSet);
                    i.putExtra("total_grade", gradeString);
                    startActivity(i);
                    total_grade=0;

                } catch (JSONException e) {
                    e.printStackTrace();
                }





            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                finish();
            }
        });
    }


}
