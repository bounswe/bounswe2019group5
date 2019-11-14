package com.example.languageLearning;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TextAnnotation {
    public String id, source, target;
    int start, end;

    static TextAnnotation fromJSON(JSONObject object) throws JSONException {
        TextAnnotation ta = new TextAnnotation();
        ta.id = object.getString("id");
        JSONObject body = object.getJSONObject("body");
        ta.source = body.getString("source");
        ta.target = object.getString("target");
        String selectorValue = body.getJSONObject("selector").getString("value");
        Pattern pat = Pattern.compile("char=(\\d*),(\\d*)");
        Matcher mat = pat.matcher(selectorValue);
        if (mat.find() == false)
            throw new RuntimeException("Invalid selector value");
        ta.start = Integer.valueOf(mat.group(1));
        ta.end   = Integer.valueOf(mat.group(2));
        return ta;
    }
}
