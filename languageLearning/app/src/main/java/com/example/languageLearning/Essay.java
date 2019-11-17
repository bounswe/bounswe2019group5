package com.example.languageLearning;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;
import java.net.URI;
import java.net.URISyntaxException;

public class Essay implements Serializable {
    public int id;
    public String language;
    public URI fileUri;
    public String reviewer;
    public String author;
    public String status;

    public static Essay fromJSON(JSONObject jessay) throws JSONException, URISyntaxException {
        Essay essay = new Essay();
        essay.id = jessay.getInt("id");
        essay.language = jessay.getString("language");
        essay.fileUri = new URI(jessay.getString("writing"));
        essay.reviewer = jessay.getString("reviewer");
        essay.author = jessay.getString("author");
        essay.status = jessay.getString("status");
        return essay;
    }
}
