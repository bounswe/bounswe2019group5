package com.example.languageLearning;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Question {
    int id; // As returned by the backend
    String text;
    String options[];
    String answer;

    public static Question fromJSON(JSONObject jquestion) throws JSONException {
        Question question = new Question();
        JSONArray joptions = jquestion.getJSONArray("question_options");
        String options[] = new String[4];
        for (int j=0; j<4; j++)
            options[j] = ((JSONObject)(joptions.get(j))).getString("text");
        question.text = jquestion.getString("text");
        question.options = options;
        question.id = jquestion.getInt("id");
        question.answer = jquestion.getString("answer");
        return question;
    }
}
