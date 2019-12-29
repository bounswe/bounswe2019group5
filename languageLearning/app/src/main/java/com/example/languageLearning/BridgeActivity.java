package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONException;
import org.json.JSONObject;

public class BridgeActivity extends AppCompatActivity {

    MyApplication app;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //remove title bar
        try
        {
            this.getSupportActionBar().hide();
        }
        catch (NullPointerException e){}

        setContentView(R.layout.activity_bridge);
        app = (MyApplication) getApplication();
    }

    public void onClickLanguageButton(View view){
        Button b = (Button) view;
        final String language = b.getText().toString().toLowerCase();
        app.setLanguage(language);

        app.initiateAPICall(Request.Method.GET, "result/?type=proficiency&language=" + language, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                int numTrue = response.optInt("number_of_true"); // The backend can return null, which means 0.
                int numFalse = response.optInt("number_of_false");
                if (numTrue == 0 && numFalse == 0) { // The user needs to solve a proficiency test first
                    Intent i = new Intent(BridgeActivity.this, ProfExamActivity.class);
                    i.putExtra("languageChoice", language);
                    startActivity(i);
                }else{
                    Intent i = new Intent(BridgeActivity.this, MainMenuActivity.class);
                    startActivity(i);
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
}
