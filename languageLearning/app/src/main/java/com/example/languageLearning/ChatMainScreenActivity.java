package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONException;
import org.json.JSONObject;

public class ChatMainScreenActivity extends AppCompatActivity {

    private final String TAG = this.getClass().getName();

    MyApplication app;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_main_screen);
        app = (MyApplication) getApplication();
    }


    public void onClickNewMessage(View view){
        Intent i = new Intent(ChatMainScreenActivity.this, ChatNewMessageActivity.class);
        startActivity(i);
    }

    public void onClickHistory(View view){
        Intent i = new Intent(ChatMainScreenActivity.this, ChatListViewActivity.class);
        startActivity(i);
    }


}
