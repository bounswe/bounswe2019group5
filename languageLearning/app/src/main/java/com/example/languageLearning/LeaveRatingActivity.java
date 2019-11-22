package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONException;
import org.json.JSONObject;

public class LeaveRatingActivity extends AppCompatActivity {

    MyApplication app;
    String username;
    int rating;
    ImageView stars[] = new ImageView[5];
    EditText commentEditText;
    Button sendButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_leave_rating);
        app = (MyApplication) getApplication();
        username = getIntent().getStringExtra("username");
        rating = getIntent().getIntExtra("rating", -1);
        if (rating == -1)
            throw new IllegalArgumentException("rating must be specified!");
        stars[0] = findViewById(R.id.star0);
        stars[1] = findViewById(R.id.star1);
        stars[2] = findViewById(R.id.star2);
        stars[3] = findViewById(R.id.star3);
        stars[4] = findViewById(R.id.star4);
        commentEditText = findViewById(R.id.commentEditText);
        for (int i=0; i<rating; i++) {
            stars[i].setImageResource(android.R.drawable.star_big_on);
            stars[i].setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    int starIndex = -1;
                    for (int i=0; i<5; i++) {
                        if (stars[i] == v) {
                            starIndex = i;
                            break;
                        }
                    }
                    rating = starIndex+1;
                    for (int i=0; i<rating; i++)
                        stars[i].setImageResource(android.R.drawable.star_big_on);
                    for (int i=rating; i<5; i++)
                        stars[i].setImageResource(android.R.drawable.star_big_off);
                }
            });
        }
        sendButton = findViewById(R.id.sendButton);
        sendButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                JSONObject data = new JSONObject();
                try {
                    data.put("username", username);
                    data.put("rate", rating);
                    data.put("comment", commentEditText.getText().toString());
                }
                catch (JSONException e) {
                    // Won't happen
                }
                app.initiateAPICall(Request.Method.POST, "recommendation/", data, new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        Toast.makeText(LeaveRatingActivity.this, "Comment sent successfully", Toast.LENGTH_SHORT).show();
                        finish();
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        finish();
                    }
                });
            }
        });
    }
}
