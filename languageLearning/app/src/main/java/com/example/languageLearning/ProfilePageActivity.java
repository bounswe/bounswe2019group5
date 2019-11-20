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

public class ProfilePageActivity extends AppCompatActivity {

    MyApplication app;

    private final String TAG = getClass().getName();

    TextView firstName_lastName, userName, nativeLang, averageRate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_page);
        app = (MyApplication) getApplication();

        firstName_lastName = findViewById(R.id.firstName_lastName);
        userName = findViewById(R.id.userName);
        nativeLang = findViewById(R.id.nativeLang);
        averageRate = findViewById(R.id.averageRate);

        getProfile();
    }

    public void getProfile(){

        String path = "profile/?username=" + app.getUsername();

        app.initiateAPICall(Request.Method.GET, path,null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {

                        Log.i(TAG, "Backend returned profile: " + response.toString());
                        fillScreen(response);
                    }
                }, null);
    }

    public void fillScreen(JSONObject response){

        UserProfile profile;

        try {
            profile = UserProfile.fromJSON(response);
        }
        catch (JSONException e) {
            e.printStackTrace();
            finish();
            return;
        }

        firstName_lastName.setText(profile.first_name+ " " + profile.last_name);
        userName.setText("@" + profile.username);
        nativeLang.setText(profile.native_language);
        averageRate.setText(profile.rating_average + " / 5.0");
    }

}