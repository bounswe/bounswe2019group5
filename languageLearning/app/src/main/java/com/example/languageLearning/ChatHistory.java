package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;

//

//import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ChatHistory extends AppCompatActivity {

    private final String TAG = this.getClass().getName();

    MyApplication app;

    ///***
    private ListView listView;
    private View btnSend;
    private EditText editText;
    boolean myMessage = true;
    private List<ChatBubble> ChatBubbles;
    private ArrayAdapter<ChatBubble> adapter;

    HashSet<HashSet<String>> conversation_pairs;

    JSONObject classified_conversations;

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

        username = (EditText) findViewById(R.id.username);
        message = (EditText) findViewById(R.id.message);

        meLabel = findViewById(R.id.meLabel);
        friendLabel = findViewById(R.id.friendLabel);

        conversation_pairs = new HashSet<HashSet<String>>();
        classified_conversations = new JSONObject();

        person = getIntent().getStringExtra("Person");

        ChatBubbles = new ArrayList<>();

        listView = (ListView) findViewById(R.id.list_msg);
        btnSend = findViewById(R.id.btn_chat_send);
        editText = (EditText) findViewById(R.id.msg_type);

        //set ListView adapter first
        adapter = new MessageAdapter(this, R.layout.left_chat_bubble, ChatBubbles);
        listView.setAdapter(adapter);

        //arrange();

        getHistory();


    }

    public void getHistory(){

        String path = "message/";

        app.initiateAPICall(Request.Method.GET, path, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                classifyJSON(response);
                setUserLabels();
                fillChatHistory();
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


    // Keep for further improvement
    public void arrange(){
        btnSend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (editText.getText().toString().trim().equals("")) {
                    Toast.makeText(ChatHistory.this, "Please input some text...", Toast.LENGTH_SHORT).show();
                } else {
                    //add message to list
                    ChatBubble ChatBubble = new ChatBubble(editText.getText().toString(), myMessage);
                    ChatBubbles.add(ChatBubble);
                    adapter.notifyDataSetChanged();
                    editText.setText("");

                    if (myMessage) {
                        myMessage = false;
                    } else {
                        myMessage = true;
                    }
                }
            }
        });
    }

    public void onClickSend(View view){

        String path = "message/";

        JSONObject json = new JSONObject();
        try {
            json.put("username",person);
            json.put("text",editText.getText().toString());
            //Log.i(TAG, "postJson: " + json.toString() );
        } catch (JSONException e) {
            Log.i(TAG, "Could not create request body");
            e.printStackTrace();
        }

        app.initiateAPICall(Request.Method.POST, path, json, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                placeNewMessage();
                Toast.makeText(ChatHistory.this,"Message sent successfully",Toast.LENGTH_LONG).show();
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
            Toast.makeText(ChatHistory.this, "Please input some text...", Toast.LENGTH_SHORT).show();
        } else {
            //add message to list
            ChatBubble ChatBubble = new ChatBubble(editText.getText().toString(), false);
            ChatBubbles.add(ChatBubble);
            adapter.notifyDataSetChanged();
            editText.setText("");
        }
    }

    public void setUserLabels(){
        meLabel.setText(person);
        friendLabel.setText(app.getUsername());
    }

    public void fillChatHistory(){
        JSONArray arr;
        try{
            arr = classified_conversations.getJSONArray(person);

            for(int i=0;i < arr.length(); i++){

                String from = arr.getJSONObject(i).getString("from_username");
                String text = arr.getJSONObject(i).getString("text");

                if(Objects.equals(from, app.getUsername())){
                    myMessage = false;
                }
                else{
                    myMessage = true;
                }

                ChatBubble ChatBubble = new ChatBubble(text, myMessage);
                ChatBubbles.add(ChatBubble);
                adapter.notifyDataSetChanged();
                editText.setText("");
            }
        }catch (JSONException e){
            e.printStackTrace();
        }
    }



    public void classifyJSON(JSONArray messages){

        for(int i=0; i < messages.length(); i++){

            try {
                String to = messages.getJSONObject(i).getString("to_username");
                String from = messages.getJSONObject(i).getString("from_username");

                HashSet<String> current_pair = new HashSet<String>();
                current_pair.add(to);
                current_pair.add(from);
                String talker = getTalker(current_pair);
                if(conversation_pairs.contains(current_pair)) {

                    classified_conversations.getJSONArray(talker).put(messages.getJSONObject(i));
                }
                else{
                    JSONArray ja = new JSONArray();
                    ja.put(messages.getJSONObject(i));

                    classified_conversations.put(talker, ja);
                    conversation_pairs.add(current_pair);
                }

            }catch (JSONException e){
                e.printStackTrace();
            }
        }
    }

    public String getTalker(HashSet<String> pair){
        Iterator<String> i = pair.iterator();
        while(i.hasNext()){
            String curr = i.next();
            if(!Objects.equals(curr,app.getUsername())) {
                return curr;
            }
        }
        return "Could not get the person!";
    }
}
