package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class ChatHistory extends AppCompatActivity {

    private final String TAG = this.getClass().getName();

    MyApplication app;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_history);
        app = (MyApplication) getApplication();

        getHistory();
    }

    public void getHistory(){
        String url = "http://35.158.176.194/message/";

        JsonArrayRequest jsonRequest = new JsonArrayRequest(Request.Method.GET, url,null,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {

                        Log.i(TAG, "onResponse: " + response.toString());
                        /*
                        try {
                            uploadedImageName = response.getString("imageName");
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        */
                        Toast.makeText(ChatHistory.this,"Message sent successfully",Toast.LENGTH_LONG).show();

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(getApplicationContext(), "Could not sent the message", Toast.LENGTH_LONG).show();
                        Log.i(TAG, "onErrorResponse: " + error.getMessage());
                        error.printStackTrace();
                    }
                })

        {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }

            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> headers = new HashMap<>();
                String token = app.getToken();
                if (token != null)
                    headers.put("Authorization", "Token " + token);
                return headers;
            }
        };

        Volley.newRequestQueue(this).add(jsonRequest);
    }

}
