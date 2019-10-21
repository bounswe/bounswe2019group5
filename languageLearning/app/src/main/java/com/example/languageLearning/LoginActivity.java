package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Dialog;
import android.content.Intent;
import android.graphics.Paint;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class LoginActivity extends AppCompatActivity {

    private final String TAG = "TEST";

    TextView registerText;

    Button loginButton;
    private MyApplication app;

    Dialog popup;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = (MyApplication)getApplication();
        setContentView(R.layout.activity_main);

        final RequestQueue requestQueue = Volley.newRequestQueue(this);

        loginButton = findViewById(R.id.loginButton);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText usernameView, passwordView;
                usernameView = findViewById(R.id.usernameView);
                passwordView = findViewById(R.id.passwordView);
                String username = usernameView.getText().toString();
                String password = passwordView.getText().toString();

                if(username.isEmpty()){
                    showErrorPopup("You must enter an e-mail/username");
                }else if(password.isEmpty()){
                    showErrorPopup("You must enter a password");
                }

                if(!(username.isEmpty() | password.isEmpty())) {
                    sendLoginRequest(username, password, requestQueue);
                }

            }
        });

        registerText = findViewById(R.id.registerText);
        registerText.setPaintFlags(registerText.getPaintFlags() | Paint.UNDERLINE_TEXT_FLAG);
        registerText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(LoginActivity.this, RegisterActivity.class);
                startActivity(intent);
            }
        });

    }

    public void showErrorPopup(final String errorMessage){
        popup = new Dialog(this);
        TextView errorMessageView;
        Button closePopupButton;
        popup.setContentView(R.layout.login_error_popup);
        errorMessageView = popup.findViewById(R.id.errorMessageView);
        closePopupButton = popup.findViewById(R.id.closePopupButton);
        errorMessageView.setText(errorMessage);
        closePopupButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                popup.dismiss();
            }
        });
        popup.show();
    }

    public void sendLoginRequest(final String username, String password, RequestQueue reqQ){

        String loginUrl = "http://18.197.149.174:8000/user/login";

        JSONObject json = new JSONObject();
        try{
            json.put("email_username", username);
            json.put("password",password);
        }catch (JSONException e){
            e.printStackTrace();
        }

        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, loginUrl, json, new Response.Listener<JSONObject>() {
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
                Log.d(TAG, "Returned Token: " + token);

                app.setToken(token);
                app.setUsername(username);

                Intent intent = new Intent(LoginActivity.this, MainMenuActivity.class);
                startActivity(intent);

            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d(TAG, "Response: " + error.toString());
                if(error.toString().equals("com.android.volley.AuthFailureError")){
                    showErrorPopup("The password you entered is incorrect");
                }else if(error.toString().equals("com.android.volley.ClientError")){
                    showErrorPopup("The username you entered does not exist");
                }
            }
        });

        reqQ.add(jsonRequest);
    }
}
