package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class ChatNewMessageActivity extends AppCompatActivity {

    EditText username;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_new_message);

        username = findViewById(R.id.username);
    }


    public void onClickWrite(View view){

        Intent i = new Intent(ChatNewMessageActivity.this, ChatLiveScreenActivity.class);
        i.putExtra("Person", username.getText().toString());
        startActivity(i);

    }

}
