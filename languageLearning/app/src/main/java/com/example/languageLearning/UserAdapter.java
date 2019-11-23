package com.example.languageLearning;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class UserAdapter extends BaseAdapter {

    private LayoutInflater layoutInflater;
    private JSONArray users;
    private Context context;

    public UserAdapter(Context context, Activity activity, JSONArray jusers){
        this.layoutInflater = (LayoutInflater) activity.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        this.users = jusers;
        this.context = context;
    }

    @Override
    public int getCount() {
        return users.length();
    }

    @Override
    public Object getItem(int i) {
        try {
            return users.get(i);
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public long getItemId(int i) {
        try {
            JSONObject jobject = (JSONObject) users.get(i);
            return jobject.getInt("id");
        } catch (JSONException e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public View getView(int i, View userElementView, ViewGroup viewGroup) {

        userElementView = layoutInflater.inflate(R.layout.user_element, null, false);
        TextView username, nativeLanguage, averageRating;
        username = userElementView.findViewById(R.id.username);
        nativeLanguage = userElementView.findViewById(R.id.nativeLanguage);
        averageRating = userElementView.findViewById(R.id.averageRating);

        final JSONObject jsonUser = (JSONObject) getItem(i);

        String usernameString = "";

        try {
            usernameString = jsonUser.getString("username");
            username.setText(username.getText().toString() + usernameString);
            nativeLanguage.setText(nativeLanguage.getText().toString() + jsonUser.getString("native_language"));
            averageRating.setText(averageRating.getText().toString() + jsonUser.getDouble("rating_average"));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        final String finalUsernameString = usernameString;
        userElementView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(context, ProfilePageActivity.class);
                intent.putExtra("username", finalUsernameString);
                context.startActivity(intent);
            }
        });


        return userElementView;
    }
}
