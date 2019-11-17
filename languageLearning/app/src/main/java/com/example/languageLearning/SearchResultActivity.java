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
        String searchTag = intent.getStringExtra("searchTag");
        String searchKeyword = intent.getStringExtra("searchKeyword");
        String searchLanguage = intent.getStringExtra("searchLanguage");




        try {

             arrayExercises = new JSONArray(jsonArray);
            String titles1[] = new String[arrayExercises.length()];
            System.out.println(arrayExercises.toString(2));
            for(int i = 0 ; i < arrayExercises.length(); i++){
                JSONObject jsonExercise = (JSONObject) arrayExercises.get(i);
                int a = jsonExercise.getInt("id");
                titles1[i]=searchLanguage+" Exercises with Tag: "+searchTag.toUpperCase()+ " & Keywordsss: " + searchKeyword.toUpperCase() + " : "+ a;
            }
            titles = titles1;
            MyAdapter adapter = new MyAdapter(this, titles);
            list.setAdapter(adapter);
            //Log.d("LOG SearchResult :",arrayExercises.get(1).toString());
            //JSONArray array2 = new JSONArray(arrayExercises.get(0).toString());
            //Log.d("LOG SearchResult222 :",array2.toString());
            //JSONObject jsonExercise = (JSONObject) arrayExercises.get(1);
            //JSONArray a2 = new JSONArray();
           // jsonExercise.toJSONArray(a2);
           /* JSONObject jsonExercise = (JSONObject) arrayExercises.get(0);

            Log.d("LOG SearchResult2 :",jsonExercise.toString(2));
             Exercise exercise = Exercise.fromJSON(jsonExercise);
            Intent intent1 = new Intent(SearchResultActivity.this, ExerciseActivity.class);
            intent1.putExtra("exercise", exercise);
            startActivity(intent1);


            */



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
                    Log.d("LOG123",""+exercise.id);
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
