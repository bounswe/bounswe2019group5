package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.Window;
import android.view.WindowManager;
import android.view.inputmethod.EditorInfo;
import android.widget.Toast;
//import android.widget.SearchView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;

//public class ChatSearchActivity extends AppCompatActivity {
public class ChatSearchActivity extends AppCompatActivity {
    private UserSearchAdapter adapter;
    private List<UserSearchItem> exampleList;



    private MyApplication app;
    JSONArray users;
    ArrayList<UserSearchItem> users_list;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);





        setContentView(R.layout.activity_chat_search);

        app = (MyApplication) getApplication();
        fillExampleList();
        setUpRecyclerView();

        users_list = new ArrayList<>();
    }

    private void fillExampleList() {
        exampleList = new ArrayList<>();
        exampleList.add(new UserSearchItem(R.drawable.ic_chat_black_24dp, "One", "Ten"));
        exampleList.add(new UserSearchItem(R.drawable.ic_chat_black_24dp, "Two", "Eleven"));
        exampleList.add(new UserSearchItem(R.drawable.ic_chat_black_24dp, "Three", "Twelve"));
        exampleList.add(new UserSearchItem(R.drawable.ic_chat_black_24dp, "Four", "Thirteen"));
        exampleList.add(new UserSearchItem(R.drawable.ic_chat_black_24dp, "Five", "Fourteen"));
        exampleList.add(new UserSearchItem(R.drawable.ic_chat_black_24dp, "Six", "Fifteen"));
        exampleList.add(new UserSearchItem(R.drawable.ic_chat_black_24dp, "Seven", "Sixteen"));
        exampleList.add(new UserSearchItem(R.drawable.ic_chat_black_24dp, "Eight", "Seventeen"));
        exampleList.add(new UserSearchItem(R.drawable.ic_chat_black_24dp, "Nine", "Eighteen"));
    }

    private void setUpRecyclerView() {
        RecyclerView recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setHasFixedSize(true);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this);
        adapter = new UserSearchAdapter(exampleList);

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
        for(int i=0; i < users.length(); i++){

            try {
                String username = users.getJSONObject(i).getString("username");
                String native_lang = users.getJSONObject(i).getString("native_language");

                users_list.add(new UserSearchItem(R.drawable.ic_person, username, native_lang));

            }catch (JSONException e){
                e.printStackTrace();
            }
        }

    }

    public void setSearchResults(JSONArray response){
        users = response;
    }

    public void makeGetRequest(final String query){

        String path = "users/?";
        if (!query.equals("")) {
            path += "&username=" + query;
        }

        app.initiateAPICall(Request.Method.GET, path, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                /*
                if (response.length() == 0) {
                    //Toast.makeText(getApplicationContext(), "No Users Found With Given Parameters", Toast.LENGTH_SHORT).show();
                    setSearchResults(response);
                    return ;
                }*/

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






}
