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
                "      \"id\": 5,\n" +
                "      \"body\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eros libero, lobortis eget fringilla eget, elementum non justo. Morbi tellus ante, molestie quis sapien consectetur, sodales fringilla est. Phasellus nec ligula id libero tristique facilisis. Suspendisse sodales, est quis consectetur aliquet, ante erat efficitur massa, a gravida nulla urna in libero. Nunc pulvinar, justo eget vulputate cursus, neque arcu vestibulum massa, nec efficitur purus risus et nisl. Maecenas quis felis dapibus, mollis orci eu, vehicula turpis. Vivamus cursus ligula posuere commodo aliquet. Curabitur tempor, ipsum id mollis ultricies, mauris sem tincidunt turpis, et posuere arcu dui vitae mi. Curabitur pretium dui sit amet ultrices commodo. Donec tempus ante et enim ultricies, ac suscipit quam bibendum. Vivamus euismod felis eros, pretium eleifend augue tristique et. Curabitur vitae vulputate mauris. Pellentesque rhoncus turpis eu nisi porta congue.\nSuspendisse egestas nibh aliquet eros mattis, et bibendum lorem sagittis. Quisque ut mi non quam lobortis accumsan sed hendrerit velit. Nunc at tellus id nisi tristique fermentum id non nunc. Fusce auctor erat at iaculis pulvinar. Duis malesuada vehicula rutrum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean in quam quam. Sed consectetur mollis enim, imperdiet venenatis quam vulputate quis. Nulla fringilla hendrerit orci, non posuere velit aliquet sed. Morbi semper ex quis lorem vulputate, vel ultricies tellus bibendum. Fusce enim nibh, tristique elementum volutpat nec, luctus vitae nibh. \",\n" +
                "      \"options\": [\n" +
                "          \"long\",\n" +
                "          \"very long\",\n" +
                "          \"can it be scrolled?\",\n" +
                "          \"yes it can\"\n" +
                "      ]\n" +
                "    },\n" +
                "    {\n" +
                "      \"id\": 6,\n" +
                "      \"body\": \"Which one is different?\",\n" +
                "      \"options\": [\n" +
                "          \"shoe\",\n" +
                "          \"jacket\",\n" +
                "          \"apple\",\n" +
                "          \"sock\"\n" +
                "      ]\n" +
                "    },\n" +
                "    {\n" +
                "      \"id\": 7,\n" +
                "      \"body\": \"Which spelling is correct?\",\n" +
                "      \"options\": [\n" +
                "          \"incapeble\",\n" +
                "          \"sucesfull\",\n" +
                "          \"indarect\",\n" +
                "          \"schol\"\n" +
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
        intent.putExtra("type", "vocabulary");
        intent.putExtra("exercise", exercise);
        startActivity(intent);
        finish();
    }
}
