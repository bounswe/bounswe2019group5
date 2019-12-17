package com.example.languageLearning;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;

public class Exercise implements Serializable {
    int id; // As returned by the backend
    String type;
    Question[] questions;

    public static Exercise fromJSON(JSONObject object) throws JSONException {
        Exercise exercise = new Exercise();
        exercise.id = object.getInt("id");
        exercise.type = object.getString("type");
        JSONArray jquestions = object.getJSONArray("questions");
        exercise.questions = new Question[jquestions.length()];
        for (int i=0; i<jquestions.length(); i++)
            exercise.questions[i] = Question.fromJSON(jquestions.getJSONObject(i));
        return exercise;
    }
}
