package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

import java.util.List;

public class ListEssaysTestActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, ListEssaysActivity.class);
        MyApplication app = (MyApplication) getApplication();
        app.setUsername("kbozdogan");
        app.setLanguage("english");
        app.setToken("beb9a6ae0bb9ea89f6afa23f6605c41628ae5ec5");
        startActivity(intent);
        finish();
    }
}
