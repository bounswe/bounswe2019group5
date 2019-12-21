package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Objects;

public class ChatListViewActivity extends AppCompatActivity {

    HashSet<HashSet<String>> conversation_pairs;
    JSONObject classified_conversations;
    MyApplication app;

    int people_num;

    private final String TAG = this.getClass().getName();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_list_view);

        app = (MyApplication) getApplication();

        conversation_pairs = new HashSet<HashSet<String>>();
        classified_conversations = new JSONObject();

        getHistory();
    }

    public void createListView(){
        String[] people = getPeople();
        ListAdapter tonysAdapter = new ChatListViewAdapter(this,people);


        ListView tonysListView = (ListView) findViewById(R.id.tonysListView);
        tonysListView.setAdapter(tonysAdapter);

        tonysListView.setOnItemClickListener(
                new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                        String person = String.valueOf(adapterView.getItemAtPosition(i));
                        Intent intent = new Intent(ChatListViewActivity.this, ChatLiveScreenActivity.class);
                        intent.putExtra("Person", person);
                        startActivity(intent);
                    }
                }
        );
    }

    public String[] getPeople(){

        people_num = conversation_pairs.size();
        String[] people = new String[people_num];
        Iterator keys = classified_conversations.keys();

        int i=0;
        while(keys.hasNext()){
            String person = (String)keys.next();
            people[i] = person;
            i++;
        }
        return people;
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
            //if(i.next() != app.getUsername()) {
            if(!Objects.equals(curr,app.getUsername())){
                return curr;
            }
        }
        return "Could not get the person";
    }

    public void getHistory(){

        String path = "message/";

        app.initiateAPICall(Request.Method.GET, path, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                classifyJSON(response);
                createListView();

            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getApplicationContext(), "Could not take the messages", Toast.LENGTH_LONG).show();
                Log.i(TAG, "onErrorResponse: " + error.getMessage());
                error.printStackTrace();
                finish();
            }
        });
    }

    public void onClickMessage(View view){
        Intent i = new Intent(this, ChatSearchActivity.class);
        startActivity(i);
    }

}
