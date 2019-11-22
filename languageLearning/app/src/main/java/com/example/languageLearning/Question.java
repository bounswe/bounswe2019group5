package com.example.languageLearning;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;

public class Question implements Serializable {
    int id; // As returned by the backend
    String text;
    String options[];
    String answer;

    public Question(String text, String[] options, String answer) {
        this.text = text;
        this.options = options;
        this.answer = answer;
    }

    public Question() {}

    public static Question fromJSON(JSONObject jquestion) throws JSONException {
        Question question = new Question();
        JSONArray joptions = jquestion.getJSONArray("options");
        Log.d("Question Optionss", joptions.toString());
        String options[] = new String[joptions.length()];
        Log.d("Question OPTIONS a ", joptions.get(0).toString());
        for (int j=0; j<joptions.length(); j++)
            options[j] = joptions.get(j).toString();


        question.text = jquestion.getString("body");
        question.options = options;


        question.id = jquestion.getInt("id");
        return question;
    }

}
