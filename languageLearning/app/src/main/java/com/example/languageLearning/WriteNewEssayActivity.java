package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class WriteNewEssayActivity extends AppCompatActivity {

    EditText essayEditText;
    Button doneButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_write_new_essay);
        essayEditText = findViewById(R.id.essayEditText);
        doneButton = findViewById(R.id.doneButton);

        doneButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String essayText = essayEditText.getText().toString();
                if (essayText.length() == 0)
                    return ;
                Intent intent = new Intent(WriteNewEssayActivity.this, UploadEssayActivity.class);
                intent.putExtra("essayText", essayEditText.getText().toString());
                startActivity(intent);
            }
        });
    }
}
