package com.example.languageLearning;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;

import java.text.ParseException;

import static org.junit.Assert.*;

public class SuggestionTest {

    @Test
    public void toJsonObject() throws JSONException, ParseException {
        String type = "vocabulary";
        String language = "english";
        String level = "A1";
        String tags[] = {"truck", "car"};
        String keywords[] = {"vehicle"};
        Suggestion testSuggestion = new Suggestion(type, language, level, tags, keywords);
        String options[] = {"vocabulary", "grammar", "listening", "reading"};
        Question testQuestion = new Question("What is the name of the type of the exercise?", options, "vocabulary");
        testSuggestion.questions.add(testQuestion);
        JSONObject testJSONObject = testSuggestion.toJsonObject();
        assertEquals(testSuggestion.type, testJSONObject.getString("type"));
        assertEquals(testSuggestion.language, testJSONObject.getString("language"));
        assertEquals(testSuggestion.level, testJSONObject.getString("level"));
        JSONArray JSONtags = testJSONObject.getJSONArray("tags");
        for (int i = 0 ; i < JSONtags.length(); i++) {
            assertEquals(testSuggestion.tags[i], JSONtags.getString(i));
        }
        JSONArray JSONkeywords = testJSONObject.getJSONArray("keywords");
        for (int i = 0 ; i < JSONkeywords.length() ; i++) {
            assertEquals(testSuggestion.keywords[i], JSONkeywords.getString(i));
        }
        JSONArray JSONquestions = testJSONObject.getJSONArray("questions");
        for (int i = 0 ; i < JSONquestions.length() ; i++) {
            JSONObject question = (JSONObject) JSONquestions.get(i);
            assertEquals(testSuggestion.questions.get(i).text, question.getString("body"));

        }
    }
}