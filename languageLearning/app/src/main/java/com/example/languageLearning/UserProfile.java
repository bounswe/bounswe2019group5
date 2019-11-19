package com.example.languageLearning;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;

class UserComment {
    public String username;
    public String comment;
    public double rate;
}

public class UserProfile implements Serializable {
    public int id;
    public String username;
    public String first_name, last_name;
    public String native_language;
    public double rating_average;
    public ArrayList<UserComment> comments;

    public static UserProfile fromJSON(JSONObject jessay) throws JSONException {
        UserProfile profile = new UserProfile();
        profile.id = jessay.getInt("id");
        profile.username = jessay.getString("username");
        profile.first_name = jessay.getString("first_name");
        profile.last_name = jessay.getString("last_name");
        profile.native_language = jessay.getString("native_language");
        profile.rating_average = jessay.getDouble("rating_average");
        profile.comments = new ArrayList<>();
        JSONArray comments = jessay.getJSONArray("user_comments");
        for (int i=0; i<comments.length(); i++) {
            UserComment comment = new UserComment();
            comment.username = ((JSONObject)comments.get(i)).getString("username");
            comment.comment = ((JSONObject)comments.get(i)).getString("comment");
            comment.rate = ((JSONObject)comments.get(i)).getDouble("rate");
            profile.comments.add(comment);
        }
        return profile;
    }
}
