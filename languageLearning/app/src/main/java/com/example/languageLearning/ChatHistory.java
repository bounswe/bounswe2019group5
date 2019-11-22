package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
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
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_history);
        app = (MyApplication) getApplication();

        conversation_pairs = new HashSet<HashSet<String>>();
        classified_conversations = new JSONObject();

        //arrange();

        getHistory();
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
            if(i.next() != app.getUsername()) {
                return curr;
            }
        }
        return "ola";
    }

    public void arrange(){
        ChatBubbles = new ArrayList<>();

        listView = (ListView) findViewById(R.id.list_msg);
        btnSend = findViewById(R.id.btn_chat_send);
        editText = (EditText) findViewById(R.id.msg_type);

        //set ListView adapter first
        adapter = new MessageAdapter(this, R.layout.left_chat_bubble, ChatBubbles);
        listView.setAdapter(adapter);

        //event for button SEND
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

    public void getHistory(){
        String url = "http://35.158.176.194/message/";

        JsonArrayRequest jsonRequest = new JsonArrayRequest(Request.Method.GET, url,null,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {

                        Log.i(TAG, "onResponse: " + response.toString());

                        classifyJSON(response);

                        Log.i(TAG,"classify:" + classified_conversations.toString());
                        /*
                        try {
                            uploadedImageName = response.getString("imageName");
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        */
                        Toast.makeText(ChatHistory.this,"Messages taken successfully",Toast.LENGTH_LONG).show();

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(getApplicationContext(), "Could not take the messages", Toast.LENGTH_LONG).show();
                        Log.i(TAG, "onErrorResponse: " + error.getMessage());
                        error.printStackTrace();
                    }
                })

        {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }

            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> headers = new HashMap<>();
                String token = app.getToken();
                if (token != null)
                    headers.put("Authorization", "Token " + token);
                return headers;
            }
        };

        Volley.newRequestQueue(this).add(jsonRequest);
    }

}
