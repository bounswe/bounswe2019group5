package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
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

public class ProfilePage extends AppCompatActivity {

    MyApplication app;

    private static final String TAG = "ProfilePage";

    JSONObject profileResponse;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_page);
        app = (MyApplication) getApplication();

        getProfile();

        fillScreen();


    }

    public void getProfile(){

        String url = "http://35.158.176.194/profile/?username=" + app.getUsername();

        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.GET, url,null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {

                        Log.i(TAG, "onResponse: " + response.toString());

                        Toast.makeText(ProfilePage.this,"Profile fetched successfully",Toast.LENGTH_LONG).show();

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(getApplicationContext(), "Could not fetch the profile", Toast.LENGTH_LONG).show();
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

    public void fillScreen(){
        JSONObject json = profileResponse;

        // Necessary Profile Fields
        String firstName_s;
        String lastName_s;
        String userName_s;
        String userNativeLang_s;
        double userRateAverage_d;

        // Parse the json and initialize fields
        try{
            firstName_s = json.getString("first_name");
            lastName_s = json.getString("last_name");
            userName_s = json.getString("username");
            userNativeLang_s = json.getString("native_language");

            userRateAverage_d = json.getDouble("rating_average");

            Log.i(TAG, "firstName_s: " + firstName_s);


            TextView firstName_lastName = (TextView) findViewById(R.id.firstName_lastName);
            firstName_lastName.setText(firstName_s + " " + lastName_s);

            TextView userName = (TextView) findViewById(R.id.userName);
            userName.setText("@" + userName_s);

            TextView nativeLang = (TextView) findViewById(R.id.nativeLang);
            nativeLang.setText(userNativeLang_s);

            TextView averageRate = (TextView) findViewById(R.id.averageRate);
            averageRate.setText(Double.toString(userRateAverage_d) + " / 5.0");



        }catch (JSONException e){
            Log.i(TAG, "Error: " + e.getMessage().toString());
            //e.printStackTrace();
        }
    }

    // Dummy JSON creator
    JSONObject createJSON(){

        JSONObject json = new JSONObject();
        JSONArray commentArray = new JSONArray();
        JSONObject comment1 = new JSONObject();
        JSONArray langArray = new JSONArray();

        try {
            json.put("userName", "halil02");
            json.put("firstName", "Halil");
            json.put("lastName", "Yılmaz");
            json.put("userNativeLang", "Turkish");
            json.put("userRateAverage", 4.9);


            comment1.put("username", "Lolo");
            comment1.put("comment", "Best teacher!");
            comment1.put("rate", 5);

            commentArray.put(comment1);

            json.put("userComments", commentArray);


            langArray.put("English");
            langArray.put("French");

            json.put("userAttendedLangs", langArray);
        }
        catch (JSONException e) {
            e.printStackTrace();
        }
        return  json;
    }

}