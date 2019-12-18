package com.example.languageLearning;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.TimeZone;

public class EssayAdapter extends BaseAdapter {

    private LayoutInflater layoutInflater;
    private ArrayList<Essay> essays;
    private Context context;

    public EssayAdapter(Context context, Activity activity, ArrayList<Essay> jessays){
        this.layoutInflater = (LayoutInflater) activity.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        this.essays = jessays;
        this.context = context;
    }

    @Override
    public int getCount() {
        return essays.size();
    }

    @Override
    public Object getItem(int i) {
        return essays.get(i);
    }

    @Override
    public long getItemId(int i) {
        return essays.get(i).id;
    }

    @Override
    public View getView(int i, View essayElementView, ViewGroup viewGroup) {

        essayElementView = layoutInflater.inflate(R.layout.essay_element, null, false);
        TextView date, language, author, reviewer, status;
        date = essayElementView.findViewById(R.id.date);
        language = essayElementView.findViewById(R.id.language);
        author = essayElementView.findViewById(R.id.author);
        reviewer = essayElementView.findViewById(R.id.reviewer);
        status = essayElementView.findViewById(R.id.status);

        Essay essay = essays.get(i);
        final Essay essay1 = essay;
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        df.setTimeZone(TimeZone.getTimeZone("Europe/Istanbul"));
        date.setText(date.getText().toString() + df.format(essay.date));
        language.setText(language.getText().toString() + essay.language);
        author.setText(author.getText().toString() + essay.author);
        reviewer.setText(reviewer.getText().toString() + essay.reviewer);
        status.setText(status.getText().toString() + essay.status);
        essayElementView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent;
                if(essay1.fileUri.toString().endsWith("txt")) {
                    intent = new Intent(context, TextEssayDetailActivity.class);
                    Log.d("TEST", "TEXT ESSAY");
                }else {
                    Log.d("TEST", "IMAGE ESSAY");
                    intent = new Intent(context, ImageEssayDetailActivity.class);
                }
                intent.putExtra("essay", essay1);
                context.startActivity(intent);
            }
        });

        return essayElementView;
    }
}
