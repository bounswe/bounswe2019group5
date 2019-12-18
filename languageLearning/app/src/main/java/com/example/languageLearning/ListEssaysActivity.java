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

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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
    }

    private void gotEssays(JSONArray essays) {
        if (essays.length() == 0) {
            Toast.makeText(getApplicationContext(), "No Essays", Toast.LENGTH_SHORT).show();
            return;
        }

        try {
            ArrayList<Essay> essaysParsed = new ArrayList<>();

            for (int i=0; i<essays.length(); i++) {
                try {
                    essaysParsed.add(Essay.fromJSON(essays.getJSONObject(i)));
                }
                catch (Exception e) {
                    e.printStackTrace();
                    Toast.makeText(ListEssaysActivity.this, e.toString(), Toast.LENGTH_SHORT).show();
                    finish();
                    return ;
                }
            }

            Collections.sort(essaysParsed, new Comparator<Essay>() {
                @Override
                public int compare(Essay o1, Essay o2) {
                    return -o1.date.compareTo(o2.date); // Sort in reverse, show recent essays at the top
                }
            });

            EssayAdapter essayAdapter = new EssayAdapter(ListEssaysActivity.this, ListEssaysActivity.this, essaysParsed);
            listView.setAdapter(essayAdapter);
        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(this, e.toString(), Toast.LENGTH_SHORT).show();
            finish();
            return;
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        String pendingsString = getIntent().getStringExtra("pendings");
        if(pendingsString == null) {
            String path = "essay/";
            app.initiateAPICall(Request.Method.GET, path, null, new Response.Listener<JSONArray>() {
                @Override
                public void onResponse(JSONArray response) {
                    gotEssays(response);
                }

            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    finish();
                }
            });
        }else {
            JSONArray pendings;
            try {
                pendings = new JSONArray(pendingsString);
            }
            catch (JSONException e) {
                e.printStackTrace();
                Toast.makeText(this, e.toString(), Toast.LENGTH_SHORT).show();
                finish();
                return ;
            }
            gotEssays(pendings);
        }
    }
}
