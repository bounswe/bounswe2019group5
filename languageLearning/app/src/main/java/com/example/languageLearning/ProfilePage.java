package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toolbar;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class ProfilePage extends AppCompatActivity {

    private static final String TAG = "ProfilePage";

    // Dummy JSON
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



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_page);


        JSONObject json = createJSON();

        // Necessary Profile Fields
        String firstName_s;
        String lastName_s;
        String userName_s;
        String userNativeLang_s;
        double userRateAverage_d;

        // Parse the json and initialize fields
        try{
            firstName_s = json.getString("firstName");
            lastName_s = json.getString("lastName");
            userName_s = json.getString("userName");
            userNativeLang_s = json.getString("userNativeLang");

            userRateAverage_d = json.getDouble("userRateAverage");

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
}