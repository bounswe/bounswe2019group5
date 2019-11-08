package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.RadioButton;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.NoConnectionError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.RetryPolicy;
import com.android.volley.TimeoutError;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

public class RegisterActivity extends AppCompatActivity {

    private final String TAG = this.getClass().getName();

    private MyApplication app;
    EditText name, surname, email, username, password;
    Button submit_button;
    RadioGroup radioGroup;
    RadioButton radioButton;
    RequestQueue requestQueue;
    String native_language;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = (MyApplication) getApplication();
        setContentView(R.layout.activity_register);

        name = (EditText) findViewById(R.id.name);
        surname = (EditText) findViewById(R.id.surname);
        email = (EditText) findViewById(R.id.email);
        username = (EditText) findViewById(R.id.username);
        password = (EditText) findViewById(R.id.password);
        radioGroup = findViewById(R.id.languagesRadioGroup);





        submit_button = (Button) findViewById(R.id.sign_up_button);
        submit_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                try {
                    JSONObject jsonObject = new JSONObject();

                    jsonObject.put("name", name.getText().toString());
                    jsonObject.put("surname", surname.getText().toString());
                    jsonObject.put("email", email.getText().toString());
                    jsonObject.put("username", username.getText().toString());
                    jsonObject.put("password", password.getText().toString());
                    jsonObject.put("native_language", native_language.toString());

                    Submit(jsonObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });


    }

    public void checkButton(View v){
        int radioId = radioGroup.getCheckedRadioButtonId();
        radioButton = findViewById(radioId);
        String str = radioButton.getText().toString();
        native_language = str;
    }

    private void Submit(JSONObject data) {
        final JSONObject savedata = data;
        String URL = MyApplication.SERVER + "register/";


        requestQueue = Volley.newRequestQueue(getApplicationContext());
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, URL,savedata, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {

                String token;
                try {
                    token = response.getString("token");
                }
                catch (JSONException e) {
                    Log.e(TAG, "No token from the server: " + response.toString());
                    return ;
                }
                //Toast.makeText(getApplicationContext(), objres.toString(), Toast.LENGTH_LONG).show();
                app.setToken(token); //My Application Token Setter
                app.setUsername(username.getText().toString());
                Log.d("Token Set to My App :",app.getToken());

                Intent intent = new Intent(RegisterActivity.this, BridgeActivity.class);
                startActivity(intent);


            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(RegisterActivity.this, "Error: " + error.toString()
                        + "\nStatus Code " + error.networkResponse.statusCode
                        + "\nCause " + error.getCause()
                        + "\nnetworkResponse " + error.networkResponse.data.toString()
                        + "\nmessage" + error.getMessage(), Toast.LENGTH_SHORT).show();
            }
        }) {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }

        };
        requestQueue.add(jsonObjectRequest);
    }

}
