package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class LoginActivity extends AppCompatActivity {

    private final String TAG = LoginActivity.class.getName();

    Button loginButton;
    private MyApplication app;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = (MyApplication)getApplication();
        setContentView(R.layout.activity_main);
        loginButton = findViewById(R.id.loginButton);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText username, password;
                username = findViewById(R.id.editText);
                password = findViewById(R.id.editText2);
                String susername = username.getText().toString();
                String spassword = password.getText().toString();
                Log.d(TAG, "UN:"+susername + ", P:" + spassword);

                Intent intent = new Intent(LoginActivity.this, ProfExamActivity.class);
                startActivity(intent);
            }
        });
    }
}
