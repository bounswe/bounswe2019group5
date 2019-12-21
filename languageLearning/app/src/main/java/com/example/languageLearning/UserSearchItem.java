package com.example.languageLearning;

public class UserSearchItem {
    private int imageResource;
    private String username;
    private String nativeLang;

    public UserSearchItem(int imageResource, String username, String nativeLang) {
        this.imageResource = imageResource;
        this.username = username;
        this.nativeLang = nativeLang;
    }

    public int getImageResource() {
        return imageResource;
    }

    public String getUserName() {
        return username;
    }

    public String getNativeLang() {
        return nativeLang;
    }
}