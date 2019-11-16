package com.example.languageLearning;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONObject;

public class ImageEssayDetailTestActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        final String dummy_response = "{\"id\":16,\"type\":\"writing\",\"language\":\"english\",\"writing\":\"http:\\/\\/35.158.176.194\\/media\\/essays\\/essay.png\",\"reviewer\":\"kbozdogan\",\"author\":\"notme\",\"status\":\"pending\"}";
        Essay essay;
        Intent intent = new Intent(this, ImageEssayDetailActivity.class);
        try {
            JSONObject jsonEssay = new JSONObject(dummy_response);
            essay = Essay.fromJSON(jsonEssay);
        }
        catch (Exception e) {
            e.printStackTrace();
            finish();
            return ;
        }
        MyApplication app = (MyApplication) getApplication();
        app.setUsername("kbozdogan");
        app.setLanguage("english");
        app.setToken("beb9a6ae0bb9ea89f6afa23f6605c41628ae5ec5");
        intent.putExtra("essay", essay);
        startActivity(intent);
        finish();
    }
}
