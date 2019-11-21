package com.example.languageLearning;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;
import java.util.ArrayList;

public class Suggestion implements Serializable {
    ArrayList<Question> questions;
    String type;
    String language;
    String level;
    String[] tags;
    String[] keywords;


    public Suggestion(String type, String language, String level, String[] tags, String[] keywords) {
        this.type = type;
        this.language = language;
        this.level = level;
        this.tags = tags;
        this.keywords = keywords;
    }
    public JSONObject toJsonObject() throws JSONException {
        JSONObject suggestion = new JSONObject();
        suggestion.put("language", language);
        suggestion.put("level", level);
        suggestion.put("type", type);

        JSONArray jsonTags = new JSONArray();
        for (int i = 0 ; i < tags.length; i++) {
            jsonTags.put(tags[i]);
        }
        suggestion.put("tags", jsonTags);

        JSONArray jsonKeywords = new JSONArray();
        for (int i = 0 ; i < keywords.length; i++) {
            jsonTags.put(keywords[i]);
        }
        suggestion.put("keywords", jsonKeywords);

        JSONArray jsonQuestions = new JSONArray();
        for (int i = 0 ; i < questions.size() ; i++) {
            JSONObject jsonQuestion = new JSONObject();
            Question tempQuestion = questions.get(i);
            jsonQuestion.put("body", tempQuestion.text);
            jsonQuestion.put("answer", tempQuestion.answer);
            JSONArray options = new JSONArray();
            for (int j = 0 ; j < tempQuestion.options.length ; j++){
                options.put(tempQuestion.options[j]);
            }
            jsonQuestion.put("options", options);
            jsonQuestions.put(jsonQuestion);
        }
        suggestion.put("questions", jsonQuestions);


        return suggestion;
    }

}
