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
//import android.widget.SearchView;

import java.util.ArrayList;
import java.util.List;

//public class ChatSearchActivity extends AppCompatActivity {
public class ChatSearchActivity extends AppCompatActivity {
    private UserSearchAdapter adapter;
    private List<UserSearchItem> exampleList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);





        setContentView(R.layout.activity_chat_search);
        fillExampleList();
        setUpRecyclerView();
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
                adapter.getFilter().filter(newText);
                return false;
            }
        });
        return true;
    }
}
