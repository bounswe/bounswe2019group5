package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONArray;

public class AppProgress extends AppCompatActivity {
    private final String TAG = this.getClass().getName();


    MyApplication app;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = (MyApplication) getApplication();
        setContentView(R.layout.activity_app_progress);
    }

    private void getQuestions(String language, String type, String level) {
        final String path = "search/?tag=" + tag1 + "&keyword=" + keyword1 + "&language=" + language1;
        app.initiateAPICall(Request.Method.GET, path, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                if (response.length() == 0) {
                    Toast.makeText(getApplicationContext(), "No question found according to this seach params", Toast.LENGTH_SHORT).show();
                    finish();
                    return;
                }

                JSONArray searchResults = (JSONArray) response ;

                Intent intent = new Intent(SearchActivity.this, SearchResultActivity.class);
                intent.putExtra("searchTag", tag.getText().toString());
                intent.putExtra("searchKeyword", keyword.getText().toString());
                intent.putExtra("searchLanguage", language);
                intent.putExtra("searchResults", searchResults.toString());
                startActivity(intent);
            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                finish();
            }
        });
    }


}
