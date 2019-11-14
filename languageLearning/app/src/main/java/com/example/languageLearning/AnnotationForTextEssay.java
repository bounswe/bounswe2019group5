package com.example.languageLearning;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AnnotationForTextEssay {
    public String id, annotationText, essayId;
    int start, end;

    static AnnotationForTextEssay fromJSON(JSONObject object) throws JSONException {
        AnnotationForTextEssay ta = new AnnotationForTextEssay();
        ta.id = object.getString("id");
        ta.annotationText = object.getJSONObject("body").getString("value");
        ta.essayId = object.getJSONObject("target").getString("source");
        String selectorValue = object.getJSONObject("target").getJSONObject("selector").getString("value");
        Pattern pat = Pattern.compile("char=(\\d*),(\\d*)");
        Matcher mat = pat.matcher(selectorValue);
        if (mat.find() == false)
            throw new RuntimeException("Invalid selector value");
        ta.start = Integer.valueOf(mat.group(1));
        ta.end   = Integer.valueOf(mat.group(2));
        return ta;
    }

    JSONObject toJSON() throws JSONException {
        JSONObject jo = new JSONObject();
        JSONObject body = new JSONObject();
        JSONObject target = new JSONObject();
        JSONObject selector = new JSONObject();
        body.put("value", annotationText);
        target.put("source", essayId);
        selector.put("value", "char="+start+","+end);
        target.put("selector", selector);
        jo.put("body", body);
        jo.put("target", target);
        return jo;
    }
}
