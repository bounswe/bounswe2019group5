package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

//

//import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class ChatHistory extends AppCompatActivity {

    private final String TAG = this.getClass().getName();
    private static final int MESSAGE_POLL_PERIOD_MS = 5000;

    MyApplication app;

    private ListView listView;
    private View btnSend;
    private EditText editText;
    boolean myMessage = true;
    private List<ChatBubble> chatBubbles;
    private MessageAdapter adapter;

    EditText username;
    EditText message;
    TextView meLabel;
    TextView friendLabel;

    String person;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_history);
        app = (MyApplication) getApplication();

        username = findViewById(R.id.username);
        message = findViewById(R.id.message);

        meLabel = findViewById(R.id.meLabel);
        friendLabel = findViewById(R.id.friendLabel);

        person = getIntent().getStringExtra("Person");

        chatBubbles = new ArrayList<>();

        listView = findViewById(R.id.list_msg);
        btnSend = findViewById(R.id.btn_chat_send);
        editText = findViewById(R.id.msg_type);

        meLabel.setText(person);
        friendLabel.setText(app.getUsername());

        //set ListView adapter first
        adapter = new MessageAdapter(this, chatBubbles);
        listView.setAdapter(adapter);

        //arrange();

        new Timer().scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                getHistory();
            }
        }, 0, MESSAGE_POLL_PERIOD_MS);
    }

    public void getHistory(){

        String path = "message/?username="+person;

        app.initiateAPICall(Request.Method.GET, path, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                refreshHistory(response);
                //Toast.makeText(ChatHistory.this,"Messages taken successfully",Toast.LENGTH_LONG).show();

            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getApplicationContext(), "Could not take the messages", Toast.LENGTH_LONG).show();
                Log.i(TAG, "onErrorResponse: " + error.getMessage());
                error.printStackTrace();
            }
        });

    }

    public void onClickSend(View view){

        String path = "message/";

        JSONObject json = new JSONObject();
        try {
            json.put("username",person);
            json.put("text",editText.getText().toString());
            editText.setText("");
            //Log.i(TAG, "postJson: " + json.toString() );
        } catch (JSONException e) {
            Log.i(TAG, "Could not create request body");
            e.printStackTrace();
        }

        app.initiateAPICall(Request.Method.POST, path, json, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                placeNewMessage();
                //Toast.makeText(ChatHistory.this,"Message sent successfully",Toast.LENGTH_LONG).show();
            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getApplicationContext(), "Could not sent the message", Toast.LENGTH_LONG).show();
                //Log.i(TAG, "onErrorResponse: " + error.getMessage());
                error.printStackTrace();
            }
        });
    }

    public void placeNewMessage(){
        if (editText.getText().toString().trim().equals("")) {
            //Toast.makeText(ChatHistory.this, "Please input some text...", Toast.LENGTH_SHORT).show();
        } else {
            //add message to list
            ChatBubble ChatBubble = new ChatBubble(editText.getText().toString(), true);
            chatBubbles.add(ChatBubble);
            adapter.notifyDataSetChanged();
            editText.setText("");
        }
    }

    public void refreshHistory(JSONArray response){
        chatBubbles.clear();
        try{
            for(int i=0;i < response.length(); i++){
                String from = response.getJSONObject(i).getString("from_username");
                String text = response.getJSONObject(i).getString("text");
                myMessage = from.equals(app.getUsername());
                ChatBubble ChatBubble = new ChatBubble(text, myMessage);
                chatBubbles.add(ChatBubble);
            }
            adapter.notifyDataSetChanged();
        }catch (JSONException e){
            e.printStackTrace();
        }
    }
}
