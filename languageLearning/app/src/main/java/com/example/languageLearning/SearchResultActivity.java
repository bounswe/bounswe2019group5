package com.example.languageLearning;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Random;

public class SearchResultActivity extends AppCompatActivity {


    private final String TAG = this.getClass().getName();
    MyApplication app;
    String titles[];
    ListView list;
    JSONArray arrayExercises;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search_result);
        app = (MyApplication) getApplication();
        list = findViewById(R.id.listView);


        Intent intent = getIntent();
        String jsonArray = intent.getStringExtra("searchResults");
        String searchLanguage = intent.getStringExtra("searchLanguage");




        try {

             arrayExercises = new JSONArray(jsonArray);
            String titles1[] = new String[arrayExercises.length()];
            System.out.println(arrayExercises.toString(2));
            for(int i = 0 ; i < arrayExercises.length(); i++){
                JSONObject jsonExercise = (JSONObject) arrayExercises.get(i);
                String type = jsonExercise.getString("type");
               JSONArray jarray = jsonExercise.getJSONArray("tags");
                String tags = jarray.join(", ");
                JSONArray jarray2 = jsonExercise.getJSONArray("keywords");
                String keywords = jarray2.join(", ");
                titles1[i]=searchLanguage.substring(0,1).toUpperCase()+searchLanguage.substring(1)+" "+type+" "+"exercises with tags: "+tags+ " & keywords: " + keywords;
            }
            titles = titles1;
            MyAdapter adapter = new MyAdapter(this, titles);
            list.setAdapter(adapter);
        } catch (JSONException e) {
            e.printStackTrace();
        }


        list.setOnItemClickListener(new AdapterView.OnItemClickListener(){


            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                try {
                    JSONObject jsonExercise = (JSONObject) arrayExercises.get(position);
                    Exercise exercise = Exercise.fromJSON(jsonExercise);
                    Intent intent1 = new Intent(SearchResultActivity.this, ExerciseActivity.class);
                    intent1.putExtra("exercise", exercise);
                    startActivity(intent1);

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });




    }

    class MyAdapter extends ArrayAdapter<String>{
        Context context;
        String myTitles[];


        MyAdapter(Context c, String[] titles){
            super(c, R.layout.row, R.id.exercise_id, titles);
            this.context=c;
            this.myTitles=titles;

        }
        @NonNull
        @Override
        public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent){
            LayoutInflater layoutInflater = (LayoutInflater) getApplicationContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            View row = layoutInflater.inflate(R.layout.row,parent,false);
            TextView myTitle = row.findViewById(R.id.exercise_id);

            myTitle.setText(titles[position]);

            return row;
        }
    }


}
