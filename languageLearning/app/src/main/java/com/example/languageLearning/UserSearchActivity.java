package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.app.DownloadManager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONArray;
import org.json.JSONObject;

public class UserSearchActivity extends AppCompatActivity {

    private MyApplication app;

    TextView userLanguageView;
    RadioGroup nativeLanguageGroup;
    ImageButton searchUserButton;
    EditText usernameSearch;
    ListView userListView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_search);
        app = (MyApplication)getApplication();

        userLanguageView = findViewById(R.id.userLanguageView);
        nativeLanguageGroup = findViewById(R.id.nativeLanguageGroup);
        searchUserButton = findViewById(R.id.searchUserButton);
        usernameSearch = findViewById(R.id.usernameSearch);
        userListView = findViewById(R.id.userListView);
        userListView.setVisibility(View.INVISIBLE);

        searchUserButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                RadioButton searchLanguageButton = findViewById(nativeLanguageGroup.getCheckedRadioButtonId());
                String searchUserLanguage = searchLanguageButton.getText().toString();
                nativeLanguageGroup.setVisibility(View.INVISIBLE);
                userListView.setAdapter(null);
                userListView.setVisibility(View.VISIBLE);
                userLanguageView.setText("Language: " + searchUserLanguage);

                app.setUsername("kbozdogan");
                app.setLanguage("english");
                app.setToken("beb9a6ae0bb9ea89f6afa23f6605c41628ae5ec5");

                String path = "users/?";
                if (!usernameSearch.getText().toString().equals("")) {
                    path += "&username=" + usernameSearch.getText().toString();
                }
                int rBID = nativeLanguageGroup.getCheckedRadioButtonId();
                RadioButton radioButton = findViewById(rBID);

                if (!radioButton.getText().toString().equals("All")) {
                    path += "&language=" + radioButton.getText().toString().toLowerCase();
                }

                app.initiateAPICall(Request.Method.GET, path, null, new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        if (response.length() == 0) {
                            Toast.makeText(getApplicationContext(), "No Users Found With Given Parameters", Toast.LENGTH_SHORT).show();
                            return ;
                        }

                        UserAdapter userAdapter = new UserAdapter(UserSearchActivity.this, UserSearchActivity.this, response);
                        if (response.length() != 0) {
                            userListView.setAdapter(userAdapter);
                        }
                        userLanguageView.setText(userLanguageView.getText().toString() + " (" + String.valueOf(response.length()) + " Users found)");


                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        finish();
                    }
                });
            }
        });

        userLanguageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                nativeLanguageGroup.setVisibility(View.VISIBLE);
                userListView.setAdapter(null);
                userListView.setVisibility(View.INVISIBLE);

            }
        });



    }
}
