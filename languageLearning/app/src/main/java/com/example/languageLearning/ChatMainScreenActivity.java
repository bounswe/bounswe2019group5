package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.Toast;

public class ChatMainScreenActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_main_screen);

        String[] families = {"Starks","Lannisters","Targaryens","Baratheons","Tullies","Mormonts","Vales","Freys"};
        ListAdapter tonysAdapter = new ChatListViewAdapter(this,families);
        //ListAdapter tonysAdapter = new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,families);
        ListView tonysListView = (ListView) findViewById(R.id.tonysListView);
        tonysListView.setAdapter(tonysAdapter);

        tonysListView.setOnItemClickListener(
                new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                        String family = String.valueOf(adapterView.getItemAtPosition(i));
                        Toast.makeText(ChatMainScreenActivity.this,family,Toast.LENGTH_LONG).show();
                    }
                }
        );
    }
}
