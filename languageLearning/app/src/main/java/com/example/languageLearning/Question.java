package com.example.languageLearning;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;

public class Question implements Serializable {
    int id; // As returned by the backend
    String text;
    String options[];

    public static Question fromJSON(JSONObject jquestion) throws JSONException {
        Question question = new Question();
        JSONArray joptions = jquestion.getJSONArray("question_options");
        String options[] = new String[4];
        for (int j=0; j<4; j++)
            options[j] = ((JSONObject)(joptions.get(j))).getString("text");
        question.text = jquestion.getString("text");
        question.options = options;
        question.id = jquestion.getInt("id");
        return question;
    }
}
