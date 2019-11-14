package com.example.languageLearning;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.ActionMode;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.IOException;

public class TextEssayDetailActivity extends AppCompatActivity {

    Essay essay;
    TextView essayTextView;
    Button finishButton;
    MyApplication app;
    ProgressBar progressBar;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_text_essay_detail);
        app = (MyApplication) getApplication();
        essay = (Essay)getIntent().getSerializableExtra("essay");
        essayTextView = findViewById(R.id.essayTextView);
        finishButton = findViewById(R.id.finishButton);
        progressBar = findViewById(R.id.downloadProgressBar);
        if (app.getUsername().equals(essay.author) == false) { // We are the reviewer
            essayTextView.setTextIsSelectable(true);
            essayTextView.setCustomSelectionActionModeCallback(new ActionMode.Callback() {
                @Override
                public boolean onCreateActionMode(ActionMode mode, Menu menu) {
                    mode.getMenuInflater().inflate(R.menu.essay_annotation_menu, menu);
                    return true;
                }

                @Override
                public boolean onPrepareActionMode(ActionMode mode, Menu menu) {
                    return false;
                }

                @Override
                public boolean onActionItemClicked(ActionMode mode, MenuItem item) {
                    if (item.getItemId() == R.id.annotate) {
                        mode.finish();
                        AlertDialog.Builder alert = new AlertDialog.Builder(TextEssayDetailActivity.this);
                        final EditText edittext = new EditText(TextEssayDetailActivity.this);
                        alert.setTitle("Enter Your Annotation");
                        alert.setView(edittext);
                        alert.setNeutralButton("Ok", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                //TODO: Send the annotation to the backend.
                            }
                        });
                        alert.show();
                        return true;
                    }
                    return false;
                }

                @Override
                public void onDestroyActionMode(ActionMode mode) {

                }
            });
        }

        finishButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(TextEssayDetailActivity.this, MainMenuActivity.class);
                startActivity(i);
                finish();
            }
        });

        app.rawHTTPGetRequest(essay.fileUri, new BufferedReaderFunction() {
            @Override
            public void invoke(BufferedReader r) {
                StringBuilder result = new StringBuilder();
                try {
                    String line;
                    while ((line = r.readLine()) != null) {
                        result.append(line);
                    }
                }
                catch (IOException e) {
                    Toast.makeText(getApplicationContext(), e.toString(), Toast.LENGTH_SHORT).show();
                    return ;
                }
                progressBar.setVisibility(View.GONE);
                essayTextView.setText(result.toString());
                essayTextView.setVisibility(View.VISIBLE);
                finishButton.setVisibility(View.VISIBLE);
            }
        }, null);
    }
}
