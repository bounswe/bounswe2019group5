package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.security.PublicKey;
import java.util.HashMap;
import java.util.Map;

public class ChatNewMessage extends AppCompatActivity {

    private final String TAG = this.getClass().getName();

    EditText username;
    EditText message;

    MyApplication app;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_new_message);
        app = (MyApplication) getApplication();

        username = (EditText) findViewById(R.id.username);
        message = (EditText) findViewById(R.id.message);

    }



    public void onClickSend(View view){

        String url = "http://35.158.176.194/message/";

        JSONObject json = new JSONObject();
        try {
            json.put("username",username.getText());
            json.put("text",message.getText());
        } catch (JSONException e) {
            Log.i(TAG, "Could not create request body");
            e.printStackTrace();
        }

        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, url, json,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {

                        Log.i(TAG, "onResponse: " + response.toString());
                        /*
                        try {
                            uploadedImageName = response.getString("imageName");
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        */
                        Toast.makeText(ChatNewMessage.this,"Message sent successfully",Toast.LENGTH_LONG).show();

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
