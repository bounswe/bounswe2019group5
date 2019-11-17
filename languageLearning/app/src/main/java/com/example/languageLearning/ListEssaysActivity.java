package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import android.util.Log;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.Random;

public class ListEssaysActivity extends AppCompatActivity {

    private final String TAG = "TEST";
    private MyApplication app;
    ListView listView;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_essays);
        listView = findViewById(R.id.listView);
        app = (MyApplication)getApplication();
        Log.d(TAG, "HERE");
        String path = "essay/";
        app.initiateAPICall(Request.Method.GET, path, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                try {

                    if(response.length() == 0){
                        Toast.makeText(getApplicationContext(), "No Essays", Toast.LENGTH_SHORT).show();
                        return ;
                    }

                    EssayAdapter essayAdapter = new EssayAdapter(ListEssaysActivity.this, response);
                    if(response.length() != 0){
                        listView.setAdapter(essayAdapter);
                    }
                }
                catch (Exception e) {
                    e.printStackTrace();
                    return;
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