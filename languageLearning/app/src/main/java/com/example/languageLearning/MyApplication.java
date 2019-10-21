package com.example.languageLearning;

import android.app.Application;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class MyApplication extends Application {
    private String token;
    private RequestQueue requestQueue;
    private String username;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        requestQueue = Volley.newRequestQueue(getApplicationContext());
    }

    @Override
    public void onTerminate() {
        super.onTerminate();
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void initiateAPICall(int method,
                                String path,
                                @Nullable JSONObject data,
                                Response.Listener<JSONObject> listener,
                                @Nullable final Response.ErrorListener errorListener) {
        String URL = "http://18.197.149.174:8000/" + path;

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(method, URL, data, listener, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                if (errorListener != null)
                    errorListener.onErrorResponse(error);
            }
        }) {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }

            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> headers = new HashMap<>();
                if (getToken() != null)
                    headers.put("Authorization", "Token " + getToken());
                return headers;
            }
        };
        requestQueue.add(jsonObjectRequest);
    }
}
