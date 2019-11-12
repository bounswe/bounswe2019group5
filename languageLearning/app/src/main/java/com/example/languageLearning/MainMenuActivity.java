package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;

public class MainMenuActivity extends AppCompatActivity {
    private final String TAG = "TEST";
    private MyApplication app;
    TextView welcomeMessage, currentLanguageView;
    ImageButton profileButton, logoutButton, changeLanguageButton, exerciseButton;
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
        exerciseButton = findViewById(R.id.exerciseButton);
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

        exerciseButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showExerciseSelectPopup();
            }
        });

        welcomeMessage.setText("Hello " + app.getUsername() + "!");
        currentLanguageView.setText(app.getLanguage().toUpperCase());

    }

    public void showExerciseSelectPopup(){
        popup = new Dialog(this);
        popup.setContentView(R.layout.select_exercise_type_popup);

        ImageButton vocabTestButton, grammarTestButton, readingTestButton;

        vocabTestButton = popup.findViewById(R.id.vocabTestButton);
        vocabTestButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

            }
        });

        grammarTestButton = popup.findViewById(R.id.grammarTestButton);
        grammarTestButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

            }
        });

        readingTestButton = popup.findViewById(R.id.readingTestButton);
        readingTestButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

            }
        });

        popup.show();
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
}
