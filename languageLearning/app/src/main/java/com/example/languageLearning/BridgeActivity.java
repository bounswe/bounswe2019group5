package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;

public class BridgeActivity extends AppCompatActivity {



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //remove title bar
        try
        {
            this.getSupportActionBar().hide();
        }
        catch (NullPointerException e){}

        setContentView(R.layout.activity_bridge);
    }

    public void onClickTurkish(View view){

        Intent i = new Intent(this, ProfExamActivity.class);
        Button b = (Button) view;
        String buttonText = b.getText().toString();
        i.putExtra("languageChoice", buttonText);
        startActivity(i);

    }

    public void onClickEnglish(View view){

        Intent i = new Intent(this, ProfExamActivity.class);
        Button b = (Button) view;
        String buttonText = b.getText().toString();
        i.putExtra("languageChoice", buttonText);
        startActivity(i);

    }

    public void onClickGerman(View view){

        Intent i = new Intent(this, ProfExamActivity.class);
        Button b = (Button) view;
        String buttonText = b.getText().toString();
        i.putExtra("languageChoice", buttonText);
        startActivity(i);

    }

}
