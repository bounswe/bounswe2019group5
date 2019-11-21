package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Dialog;
import android.content.Intent;
import android.graphics.Paint;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Random;

public class MainMenuActivity extends AppCompatActivity {
    private final String TAG = getClass().getName();
    private MyApplication app;
    TextView welcomeMessage, currentLanguageView;
    ImageButton profileButton, logoutButton, changeLanguageButton, newEssayButton, exerciseButton, searchButton;
    Dialog popup;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_menu);
        app = (MyApplication)getApplication();

        welcomeMessage = findViewById(R.id.welcomeMessage);
        profileButton = findViewById(R.id.profileButton);
        logoutButton = findViewById(R.id.logoutButton);
        changeLanguageButton = findViewById(R.id.changeLanguageButton);
        newEssayButton = findViewById(R.id.newEssayButton);
        exerciseButton = findViewById(R.id.exerciseButton);
        searchButton = findViewById(R.id.searchButton);
        currentLanguageView = findViewById(R.id.currentLanguageView);

        profileButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainMenuActivity.this, ProfilePage.class);
                startActivity(intent);
            }
        });

        logoutButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showLogoutPopup();
            }
        });

        changeLanguageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainMenuActivity.this, BridgeActivity.class);
                startActivity(intent);
            }
        });

        newEssayButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainMenuActivity.this, NewEssayActivity.class);
                startActivity(intent);
            }
        });
        exerciseButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showExerciseSelectPopup();
            }
        });
        searchButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainMenuActivity.this, SearchActivity.class);
                startActivity(intent);
            }
        });

        welcomeMessage.setText("Hello " + app.getUsername() + "!");
        currentLanguageView.setText(app.getLanguage().toUpperCase());

    }

    public void showExerciseSelectPopup(){
        popup = new Dialog(this);
        popup.setContentView(R.layout.select_exercise_type_popup);

        final TextView suggestNewExercise;
        ImageButton vocabTestButton, grammarTestButton, readingTestButton;

        vocabTestButton = popup.findViewById(R.id.vocabTestButton);
        vocabTestButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final String path = "search/?type=vocabulary&language=" + app.getLanguage().toLowerCase();
                getAndStartExercise(path);
            }
        });

        grammarTestButton = popup.findViewById(R.id.grammarTestButton);
        grammarTestButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final String path = "search/?type=grammar&language=" + app.getLanguage().toLowerCase();
                getAndStartExercise(path);
            }
        });

        readingTestButton = popup.findViewById(R.id.readingTestButton);
        readingTestButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final String path = "search/?type=reading&language=" + app.getLanguage().toLowerCase();
                getAndStartExercise(path);
            }
        });

        suggestNewExercise = popup.findViewById(R.id.suggestNewExercise);
        suggestNewExercise.setPaintFlags(suggestNewExercise.getPaintFlags() | Paint.UNDERLINE_TEXT_FLAG);
        suggestNewExercise.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainMenuActivity.this, ExerciseSuggestionActivity.class);
                startActivity(intent);
            }
        });



        popup.show();
    }

    public void getAndStartExercise(String path){

        app.initiateAPICall(Request.Method.GET, path, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                try {
                    if(response.length() == 0){
                        Toast.makeText(getApplicationContext(), "No unsolved exercise was found in this language", Toast.LENGTH_SHORT).show();
                        return ;
                    }
                    JSONObject jsonExercise = (JSONObject) response.get(new Random().nextInt(response.length()));
                    Exercise exercise = Exercise.fromJSON(jsonExercise);
                    Intent intent = new Intent(MainMenuActivity.this, ExerciseActivity.class);
                    intent.putExtra("exercise", exercise);
                    startActivity(intent);
                }
                catch (JSONException e) {
                    e.printStackTrace();
                    return;
                }
            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                finish();
            }
        });
    }

    public void showLogoutPopup(){
        popup = new Dialog(this);
        Button logoutYesButton, logoutNoButton;
        popup.setContentView(R.layout.logout_popup);
        logoutYesButton = popup.findViewById(R.id.logoutYesButton);
        logoutYesButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                app.setToken(null);
                app.setUsername(null);
                Intent intent = new Intent(MainMenuActivity.this, LoginActivity.class);
                startActivity(intent);
            }
        });
        logoutNoButton = popup.findViewById(R.id.logoutNoButton);
        logoutNoButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                popup.dismiss();
            }
        });
        popup.show();
    }

    public void onClickChat(View view){

        Intent i = new Intent(this, ChatNewMessageActivity.class);
        startActivity(i);

    }
}
