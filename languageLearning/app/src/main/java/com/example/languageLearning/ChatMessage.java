package com.example.languageLearning;

import android.content.Context;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.TimeZone;

public class ChatMessage {

    public String from, to;
    public String text;
    public Date date;
    public boolean mine;

    public ChatMessage(String from, String to, String text, Date date, boolean mine) {
        this.from = from;
        this.to = to;
        this.text = text;
        this.date = date;
        this.mine = mine;
    }

    public static ChatMessage fromJSON(Context context, JSONObject obj) throws JSONException, ParseException {
        MyApplication app = (MyApplication)context.getApplicationContext();
        String from = obj.getString("from_username");
        String to = obj.getString("to_username");
        String text = obj.getString("text");
        String sdate = obj.getString("date");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'");
        df.setTimeZone(TimeZone.getTimeZone("UTC"));
        Date date = df.parse(sdate);
        boolean mine = from.equals(app.getUsername());
        return new ChatMessage(from, to, text, date, mine);
    }
}