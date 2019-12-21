package com.example.languageLearning;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class Essay implements Serializable {
    public int id;
    public String language;
    public URI fileUri;
    public String reviewer;
    public String author;
    public String status;
    public Date date;

    public static Essay fromJSON(JSONObject jessay) throws JSONException, URISyntaxException, ParseException {
        Essay essay = new Essay();
        essay.id = jessay.getInt("id");
        essay.language = jessay.getString("language");
        essay.fileUri = new URI(jessay.getString("writing"));
        essay.reviewer = jessay.getString("reviewer");
        essay.author = jessay.getString("author");
        essay.status = jessay.getString("status");
        String sdate = jessay.getString("date");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'");
        df.setTimeZone(TimeZone.getTimeZone("UTC"));
        essay.date = df.parse(sdate);
        return essay;
    }

    public JSONObject toJSON() {
        JSONObject o = new JSONObject();
        try {
            o.put("id", id);
            o.put("language", language);
            o.put("writing", fileUri.toString());
            o.put("reviewer", reviewer);
            o.put("author", author);
            o.put("status", status);
        }
        catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
        return o;
    }
}
