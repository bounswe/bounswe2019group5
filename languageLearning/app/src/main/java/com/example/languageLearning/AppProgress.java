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

public class AppProgress extends AppCompatActivity {
    private final String TAG = this.getClass().getName();


    MyApplication app;
    double total_progress = 0;

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
        getProgress(language);
        Log.d("OFF METHOD  : "," GETPROGRESS OUT ONCLICK AGAIN");

    }

    private void getProgress(String language) {
        Log.d("PROCESSED","PROGRESS IS BEING PROCESSED.......");
        final String path = "progress/?language="+language;
        app.initiateAPICall(Request.Method.GET, path, null, new Response.Listener<JSONObject>() {
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
                    double ntc = progressResults.getInt("number_of_test_completed");
                    Log.d("ntc", ntc+"");
                    double nt =  progressResults.getInt("number_of_test");
                    Log.d("nt", nt+"");
                    double cocl = progressResults.getInt("completed_exercise_current_level");
                    Log.d("cocl", cocl+"");
                    double eicl = progressResults.getInt("exercise_in_current_level");
                    Log.d("eicl", eicl+"");

                    total_progress = (ntc/nt)*100;
                    double total_progressTwoDigit = Math.floor(total_progress* 100) / 100;
                    String progressString= total_progressTwoDigit+"";
                    Log.d(TAG," "+total_progressTwoDigit);

                    Intent i = new Intent(AppProgress.this, AppProgressResullt.class);
                    i.putExtra("progress", progressString);
                    startActivity(i);

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
