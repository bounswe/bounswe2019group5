package com.example.languageLearning;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONException;
import org.json.JSONObject;

public class ExerciseActivityTestActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        final String dummy_response = "{\n" +
                "  \"id\": 42,\n" +
                "  \"questions\": [\n" +
                "    {\n" +
                "      \"id\": 6,\n" +
                "      \"text\": \"Which one is different?\",\n" +
                "      \"question_options\": [\n" +
                "          {\"text\": \"shoe\"},\n" +
                "          {\"text\": \"jacket\"},\n" +
                "          {\"text\": \"apple\"},\n" +
                "          {\"text\": \"sock\"}\n" +
                "      ]\n" +
                "    },\n" +
                "    {\n" +
                "      \"id\": 7,\n" +
                "      \"text\": \"Which spelling is correct?\",\n" +
                "      \"question_options\": [\n" +
                "          {\"text\": \"incapeble\"},\n" +
                "          {\"text\": \"sucesfull\"},\n" +
                "          {\"text\": \"indarect\"},\n" +
                "          {\"text\": \"schol\"}\n" +
                "      ]\n" +
                "    }\n" +
                "  ]\n" +
                "}";
        Exercise exercise;
        Intent intent = new Intent(this, ExerciseActivity.class);
        try {
            JSONObject jsonExercise = new JSONObject(dummy_response);
            exercise = Exercise.fromJSON(jsonExercise);
        }
        catch (JSONException e) {
            e.printStackTrace();
            finish();
            return ;
        }
        intent.putExtra("exercise", exercise);
        startActivity(intent);
        finish();
    }
}
