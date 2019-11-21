package com.example.languageLearning;

public class Suggestion {
    Question[] questions;
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
}
