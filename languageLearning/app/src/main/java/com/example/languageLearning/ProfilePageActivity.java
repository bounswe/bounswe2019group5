package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;

import org.json.JSONException;
import org.json.JSONObject;

public class ProfilePageActivity extends AppCompatActivity {

    MyApplication app;
    private final String TAG = getClass().getName();
    ConstraintLayout rateDistributionLayout;
    LinearLayout linearLayout, yourCommentLayout, leaveRatingLayout;
    ImageView commentStars[] = new ImageView[5];
    ImageView averageRateStars[] = new ImageView[5];
    ProgressBar progressBars[] = new ProgressBar[5];
    TextView firstName_lastName, userName, nativeLang, averageRate, reviewCount;
    String username;
    UserComment ourComment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_page);
        app = (MyApplication) getApplication();

        username = getIntent().getStringExtra("username");
        if (username == null) // Default to the current user
            username = app.getUsername();

        rateDistributionLayout = findViewById(R.id.rateDistributionLayout);
        linearLayout = findViewById(R.id.linearLayout);
        firstName_lastName = findViewById(R.id.firstName_lastName);
        userName = findViewById(R.id.userName);
        averageRate = findViewById(R.id.averageRate);
        nativeLang = findViewById(R.id.nativeLang);
        yourCommentLayout = findViewById(R.id.yourCommentLayout);
        leaveRatingLayout = findViewById(R.id.leaveRatingLayout);
        commentStars[0] = findViewById(R.id.star0);
        commentStars[1] = findViewById(R.id.star1);
        commentStars[2] = findViewById(R.id.star2);
        commentStars[3] = findViewById(R.id.star3);
        commentStars[4] = findViewById(R.id.star4);
        averageRateStars[0] = findViewById(R.id.averageRateStar1);
        averageRateStars[1] = findViewById(R.id.averageRateStar2);
        averageRateStars[2] = findViewById(R.id.averageRateStar3);
        averageRateStars[3] = findViewById(R.id.averageRateStar4);
        averageRateStars[4] = findViewById(R.id.averageRateStar5);
        progressBars[0] = findViewById(R.id.progressBar1);
        progressBars[1] = findViewById(R.id.progressBar2);
        progressBars[2] = findViewById(R.id.progressBar3);
        progressBars[3] = findViewById(R.id.progressBar4);
        progressBars[4] = findViewById(R.id.progressBar5);
        reviewCount = findViewById(R.id.reviewCount);

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

    View createCommentViewFromComment(UserComment comment) {
        LayoutInflater factory = LayoutInflater.from(this);
        View commentView = factory.inflate(R.layout.profile_comment, null);
        TextView commenterUserName = commentView.findViewById(R.id.commenterUserName);
        commenterUserName.setText("@" + comment.username);
        ImageView stars[] = new ImageView[5];
        stars[0] = commentView.findViewById(R.id.commentStar0);
        stars[1] = commentView.findViewById(R.id.commentStar1);
        stars[2] = commentView.findViewById(R.id.commentStar2);
        stars[3] = commentView.findViewById(R.id.commentStar3);
        stars[4] = commentView.findViewById(R.id.commentStar4);
        for (int i=0; i<comment.rate; i++)
            stars[i].setImageResource(android.R.drawable.star_on);
        TextView commentText = commentView.findViewById(R.id.commentText);
        commentText.setText(comment.comment);
        return commentView;
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

        if (profile.comments.size() == 0) {
            rateDistributionLayout.setVisibility(View.GONE);
        }
        else {
            averageRate.setText(String.format("%.1f", profile.rating_average));
            reviewCount.setText("(" + profile.comments.size() + ")");
            for (int i=0; i<5; i++) {
                int numberOfRatings = 0;
                for (UserComment comment : profile.comments) {
                    if ((int) Math.round(comment.rate) - 1 == i)
                        numberOfRatings += 1;
                }
                progressBars[i].setProgress((int)((float)numberOfRatings / profile.comments.size() * 100));
            }
            for (int i=0; i<5; i++) {
                if (i+1 <= profile.rating_average)
                    averageRateStars[i].setImageResource(android.R.drawable.star_big_on);
                else
                    averageRateStars[i].setImageResource(android.R.drawable.star_big_off);
            }
        }

        for (UserComment comment : profile.comments) {
            if (comment.username.equals(app.getUsername())) {
                ourComment = comment;
            }
            else {
                linearLayout.addView(createCommentViewFromComment(comment));
            }
        }

        if (username.equals(app.getUsername())) { // We are viewing our own profile
            yourCommentLayout.setVisibility(View.GONE);
            leaveRatingLayout.setVisibility(View.GONE);
        }
        else if (ourComment == null) {
            yourCommentLayout.setVisibility(View.GONE);
            for (int i=0; i<5; i++)
                commentStars[i].setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        int starIndex = -1;
                        for (int i=0;i<5;i++) {
                            if (v == commentStars[i]) {
                                starIndex = i;
                                break;
                            }
                        }
                        Intent intent = new Intent(ProfilePageActivity.this, LeaveRatingActivity.class);
                        intent.putExtra("rating", starIndex+1);
                        intent.putExtra("username", username);
                        startActivity(intent);
                    }
                });
        }
        else {
            leaveRatingLayout.setVisibility(View.GONE);
            yourCommentLayout.addView(createCommentViewFromComment(ourComment), 1);
        }
    }

}