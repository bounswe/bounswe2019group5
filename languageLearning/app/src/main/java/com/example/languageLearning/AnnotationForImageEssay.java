package com.example.languageLearning;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AnnotationForImageEssay {
    public String id, annotationText, essayId;
    int x,y,w,h;

    static AnnotationForImageEssay fromJSON(JSONObject object) throws JSONException {
        AnnotationForImageEssay ta = new AnnotationForImageEssay();
        ta.id = object.getString("id");
        ta.annotationText = object.getJSONObject("body").getString("value");
        ta.essayId = object.getJSONObject("target").getString("source");
        String selectorValue = object.getJSONObject("target").getJSONObject("selector").getString("value");
        Pattern pat = Pattern.compile("xywh=(\\d*),(\\d*),(\\d*),(\\d*)");
        Matcher mat = pat.matcher(selectorValue);
        if (mat.find() == false)
            throw new RuntimeException("Invalid selector value");
        ta.x = Integer.valueOf(mat.group(1));
        ta.y = Integer.valueOf(mat.group(2));
        ta.w = Integer.valueOf(mat.group(3));
        ta.h = Integer.valueOf(mat.group(4));
        return ta;
    }

    JSONObject toJSON() throws JSONException {
        JSONObject jo = new JSONObject();
        JSONObject body = new JSONObject();
        JSONObject target = new JSONObject();
        JSONObject selector = new JSONObject();
        body.put("value", annotationText);
        target.put("source", essayId);
        selector.put("value", "xywh="+x+","+y+","+w+","+h);
        target.put("selector", selector);
        jo.put("body", body);
        jo.put("target", target);
        return jo;
    }
}
