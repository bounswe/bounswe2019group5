package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Random;

public class SearchActivity extends AppCompatActivity {

    private final String TAG = this.getClass().getName();


    MyApplication app;
    RadioGroup radioGroup;
    RadioButton radioButton;
    Button searchButton;
    EditText tag, keyword;
    String language;
    String tag1;
    String keyword1;
    String language1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = (MyApplication) getApplication();
        setContentView(R.layout.activity_search);

        tag = (EditText) findViewById(R.id.search_tag);
        keyword = (EditText) findViewById(R.id.search_keyword);
        radioGroup = findViewById(R.id.languagesRadioGroup);

        searchButton = (Button) findViewById(R.id.search_button);
        searchButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /* JSONObject jsonObject = new JSONObject();

                 jsonObject.put("tag", tag.getText().toString());
                 jsonObject.put("keyword", keyword.getText().toString());
                 jsonObject.put("language", language.toString());
                 */
                tag1 = tag.getText().toString();
                keyword1 = keyword.getText().toString();
                 if(language!=null)
                    language1 = language.toLowerCase();
                else
                    language1="english";
                getQuestions(tag1,keyword1,language1);
            }
        });
    }


    public void checkButton(View v) {
        int radioId = radioGroup.getCheckedRadioButtonId();
        radioButton = findViewById(radioId);
        String str = radioButton.getText().toString();
        language = str;
    }


    private void getQuestions(String tag1, String keyword1, String language1) {
        final String path = "search/?tag=" + tag1 + "&keyword=" + keyword1 + "&language=" + language1;
        Log.d("LOGGGG :",path);
        app.initiateAPICall(Request.Method.GET, path, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                if (response.length() == 0) {
                    Toast.makeText(getApplicationContext(), "No question found according to this seach params", Toast.LENGTH_SHORT).show();
                    finish();
                    return;
                }

                try {
                    Log.d("LOGGGG2223 :",response.get(0).toString());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                JSONArray searchResults = (JSONArray) response ;
                Log.d("LOGGGG222 :",searchResults.toString());
                   /* Exercise[] exercises = new Exercise[response.length()];
                    for (int i = 0 ; i <= response.length() ; i++){
                        JSONObject jsonExercise = (JSONObject) response.get(i);
                        exercises[i] =Exercise.fromJSON(jsonExercise);

                    }

                    //JSONObject[] jsonExercise =  (JSONObject[]) response.get(new Random().nextInt(response.length()));
                    //Exercise exercise = Exercise.fromJSON(jsonExercise);

                    */
                Intent intent = new Intent(SearchActivity.this, SearchResultActivity.class);
                Log.d("LOGGGG222 :",searchResults.toString());
                intent.putExtra("searchTag", tag.getText().toString());
                intent.putExtra("searchKeyword", keyword.getText().toString());
                intent.putExtra("searchLanguage", language);
                intent.putExtra("searchResults", searchResults.toString());
                startActivity(intent);
            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                finish();
            }
        });
    }


   /* private void showSearchResults(int correctCount, int falseCount, String level) {
        Intent intent = new Intent(this, ProfResultActivity.class);
        Bundle b = new Bundle();
        b.putInt("COUNT_CORRECT", correctCount);
        b.putInt("COUNT_INCORRECT", falseCount);
        b.putString("LEVEL", level);
        intent.putExtras(b);
        startActivity(intent);
        finish();
    }
   */


}


