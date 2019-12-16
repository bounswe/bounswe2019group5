package com.example.languageLearning;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.FormBodyPart;
import org.apache.http.entity.mime.content.ByteArrayBody;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;

public class ListeningQuestionSuggestionActivity extends AppCompatActivity {

    private static final int FILE_SELECT_CODE = 1;
    EditText questionBody;
    EditText correctAnswerSelection;
    EditText otherAnswer1;
    EditText otherAnswer2;
    EditText otherAnswer3;
    Button addAnotherQuestion;
    Button addAndFinishSuggestion;
    ArrayList<Question> questions = new ArrayList<Question>();
    TextView uploadListeningFileTextView;
    ImageButton uploadListening;
    MyApplication app;
    Suggestion suggestion;
    String fileUrl;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question_suggestion);
        app = (MyApplication) getApplication();
        suggestion = (Suggestion) getIntent().getSerializableExtra("suggestion");

        questionBody = findViewById(R.id.questionBody);
        questionBody.setVisibility(View.INVISIBLE);

        uploadListeningFileTextView = findViewById(R.id.uploadListeningFileTextView);
        uploadListeningFileTextView.setVisibility(View.VISIBLE);

        uploadListening = findViewById(R.id.uploadListening);
        uploadListening.setVisibility(View.VISIBLE);
        uploadListening.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Boolean permissionResult = MyApplication.getExternalStoragePermission(ListeningQuestionSuggestionActivity.this);
                if (permissionResult != null && permissionResult == true) {
                    showFileChooser();
                }
            }
        });

        correctAnswerSelection = findViewById(R.id.correctAnswerSelection);
        otherAnswer1 = findViewById(R.id.otherAnswer1);
        otherAnswer2 = findViewById(R.id.otherAnswer2);
        otherAnswer3 = findViewById(R.id.otherAnswer3);

        addAnotherQuestion = findViewById(R.id.addAnotherQuestion);
        addAnotherQuestion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (areTextEditsValid()) {
                    addQuestion();
                    Toast.makeText(getApplicationContext(), "Question has been saved.", Toast.LENGTH_SHORT).show();
                    clearTextEdits();
                }else {
                    Toast.makeText(getApplicationContext(), "All fields must be filled to create a question.", Toast.LENGTH_SHORT).show();
                }
            }
        });

        addAndFinishSuggestion = findViewById(R.id.addAndFinishSuggestion);
        addAndFinishSuggestion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (areTextEditsValid()) {
                    addQuestion();
                    try {
                        sendSuggestion();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                } else {
                    Toast.makeText(getApplicationContext(), "All fields must be filled to create a question.", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
    private boolean areTextEditsValid() {
        if (fileUrl.equals("") |
                correctAnswerSelection.getText().toString().equals("") |
                otherAnswer1.getText().toString().equals("") |
                otherAnswer2.getText().toString().equals("") |
                otherAnswer3.getText().toString().equals("")) {
            return false;
        }else{
            return true;
        }
    }

    private void addQuestion() {
        String qBody = fileUrl;
        String correctAnswer = correctAnswerSelection.getText().toString();
        String other1 = otherAnswer1.getText().toString();
        String other2 = otherAnswer2.getText().toString();
        String other3 = otherAnswer3.getText().toString();
        String[] options = new String[]{other1,other2,other3,correctAnswer};
        Question newQuestion = new Question(qBody, options, correctAnswer);
        questions.add(newQuestion);
    }

    private void sendSuggestion() throws JSONException {
        suggestion.questions = questions;
        JSONObject JSONSuggestion = suggestion.toJsonObject();
        String path = "suggest/";
        app.initiateAPICall(Request.Method.POST, path, JSONSuggestion, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Toast.makeText(getApplicationContext(), "Your Suggestion has been submitted.", Toast.LENGTH_SHORT).show();
                finish();
            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                finish();
            }
        });
    }

    private void clearTextEdits() {
        fileUrl = "";
        uploadListeningFileTextView.setText("Upload Listening File!");
        correctAnswerSelection.setText("");
        otherAnswer1.setText("");
        otherAnswer2.setText("");
        otherAnswer3.setText("");
    }

    private void showFileChooser() {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("*/*");
        intent.addCategory(Intent.CATEGORY_OPENABLE);

        try {
            startActivityForResult(
                    Intent.createChooser(intent, "Select a File to Upload"),
                    FILE_SELECT_CODE);
        } catch (android.content.ActivityNotFoundException ex) {
            Toast.makeText(this, "No file chooser was found",
                    Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == MyApplication.EXTERNAL_STORAGE_PERMISSION_REQUEST_CODE) {
            if (grantResults.length == 0 || grantResults[0] == PackageManager.PERMISSION_DENIED) {
                Toast.makeText(this, "Read external storage permission is required to upload files",
                        Toast.LENGTH_SHORT).show();
                return ;
            }
            else {
                showFileChooser();
            }
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch (requestCode) {
            case FILE_SELECT_CODE:
                if (resultCode == RESULT_OK) {
                    // Get the Uri of the selected file
                    Uri uri = data.getData();
                    Log.d("Listen", "File Uri: " + uri.toString());
                    uploadListeningFileTextView.setText("File Selected!");
                    HashMap<String, String> textParams = new HashMap<>();
                    FormBodyPart[] filePart = new FormBodyPart[1];

                    try {
                        Cursor result = getContentResolver().query(uri, null, null, null, null);
                        result.moveToFirst();
                        String fileName = result.getString(result.getColumnIndexOrThrow("_display_name"));
                        String mimeType = result.getString(result.getColumnIndexOrThrow("mime_type"));

                        filePart[0] = new FormBodyPart("file", new ByteArrayBody(MyApplication.isToByteArray(getContentResolver().openInputStream(uri)), ContentType.create(mimeType), fileName));
                    }
                    catch (FileNotFoundException e) {
                        e.printStackTrace();
                        Toast.makeText(this, "File not found", Toast.LENGTH_SHORT).show();
                        finish();
                        return;
                    }
                    catch (IOException e) {
                        e.printStackTrace();
                        Toast.makeText(this, "Error reading the file", Toast.LENGTH_SHORT).show();
                        finish();
                        return;
                    }

                    app.initiateMultiPartAPICall(Request.Method.POST, "upload/", textParams, filePart, new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            Log.d("UPLOAD", response.toString());
                            try {
                                fileUrl = response.getString("file");
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    }, new StringFunction() {
                        @Override
                        public void invoke(String s) {
                            finish();
                        }
                    });
                }
                break;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }
}
