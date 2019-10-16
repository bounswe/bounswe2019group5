package com.example.languageLearning;

import android.app.Application;

public class MyApplication extends Application {
    private String token;

    @Override
    public void onCreate() {
        super.onCreate();
    }


    @Override
    public void onTerminate() {
        super.onTerminate();
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}