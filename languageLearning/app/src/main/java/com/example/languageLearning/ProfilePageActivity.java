package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
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
    LinearLayout linearLayout;
    TextView firstName_lastName, userName, nativeLang, averageRate;
    String username;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_page);
        app = (MyApplication) getApplication();

        username = getIntent().getStringExtra("username");
        if (username == null) // Default to the current user
            username = app.getUsername();

        linearLayout = findViewById(R.id.linearLayout);
        firstName_lastName = findViewById(R.id.firstName_lastName);
        userName = findViewById(R.id.userName);
        nativeLang = findViewById(R.id.nativeLang);
        averageRate = findViewById(R.id.averageRate);

        getProfile();
    }

    public void getProfile(){

        String path = "profile/?username=" + username;

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

        for (UserComment comment : profile.comments) {
            LayoutInflater factory = LayoutInflater.from(this);
            View commentView = factory.inflate(R.layout.profile_comment, null);
            TextView commenterUserName = commentView.findViewById(R.id.commenterUserName);
            commenterUserName.setText("@" + comment.username);
            LinearLayout commentStarsLayout = commentView.findViewById(R.id.commentStarsLayout);
            ImageView stars[] = new ImageView[5];
            stars[0] = commentStarsLayout.findViewById(R.id.commentStar0);
            stars[1] = commentStarsLayout.findViewById(R.id.commentStar1);
            stars[2] = commentStarsLayout.findViewById(R.id.commentStar2);
            stars[3] = commentStarsLayout.findViewById(R.id.commentStar3);
            stars[4] = commentStarsLayout.findViewById(R.id.commentStar4);
            for (int i=0; i<comment.rate; i++)
                stars[i].setImageResource(android.R.drawable.star_on);
            TextView commentText = commentView.findViewById(R.id.commentText);
            commentText.setText(comment.comment);
            linearLayout.addView(commentView);
        }
    }

}