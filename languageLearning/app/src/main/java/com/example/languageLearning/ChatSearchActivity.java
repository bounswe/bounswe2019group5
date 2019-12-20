package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.inputmethod.EditorInfo;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;

public class ChatSearchActivity extends AppCompatActivity implements UserSearchAdapter.OnPersonListener {
    private UserSearchAdapter adapter;

    private MyApplication app;
    JSONArray users_json;
    ArrayList<UserSearchItem> users_list;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_search);

        app = (MyApplication) getApplication();
        setUpRecyclerView();

        Toolbar toolbar = findViewById(R.id.main_toolbar);
        TextView toolbar_text = findViewById(R.id.title_text);

        toolbar.setTitle("");
        toolbar_text.setText("Search User");
        setSupportActionBar(toolbar);

        users_list = new ArrayList<>();
    }

    private void setUpRecyclerView() {
        RecyclerView recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setHasFixedSize(true);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this);
        adapter = new UserSearchAdapter(new ArrayList<UserSearchItem>(),this);

        recyclerView.setLayoutManager(layoutManager);
        recyclerView.setAdapter(adapter);


    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.user_search_menu, menu);

        MenuItem searchItem = menu.findItem(R.id.action_search);
        SearchView searchView = (SearchView) searchItem.getActionView();

        searchView.setImeOptions(EditorInfo.IME_ACTION_DONE);

        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                makeGetRequest(newText);
                return false;
            }
        });
        return true;
    }

    public void Json2Arraylist(){

        users_list.clear();
        for(int i = 0; i < users_json.length(); i++){

            try {
                String username = users_json.getJSONObject(i).getString("username");
                String native_lang = users_json.getJSONObject(i).getString("native_language");

                users_list.add(new UserSearchItem(R.drawable.ic_person, username, native_lang));

            }catch (JSONException e){
                e.printStackTrace();
            }
        }

    }

    public void setSearchResults(JSONArray response){
        users_json = response;
    }

    public void makeGetRequest(final String query){

        String path = "users_json/?";
        if (!query.equals("")) {
            path += "&username=" + query;
        }

        app.initiateAPICall(Request.Method.GET, path, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {

                setSearchResults(response);
                Json2Arraylist();
                adapter.setUserList(users_list);
                adapter.getFilter().filter(query);


            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                //finish();
                error.printStackTrace();
            }
        });

    }


    @Override
    public void onPersonClick(int position) {
        String person = users_list.get(position).getUserName();

        Intent intent = new Intent(this, ChatLiveScreenActivity.class);
        intent.putExtra("Person",person);
        startActivity(intent);
    }
}
