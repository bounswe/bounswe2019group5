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

public class EssayAdapter extends BaseAdapter {

    private LayoutInflater layoutInflater;
    private JSONArray essays;
    private Context context;

    public EssayAdapter(Context context, Activity activity, JSONArray jessays){
        this.layoutInflater = (LayoutInflater) activity.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        this.essays = jessays;
        this.context = context;
    }

    @Override
    public int getCount() {
        return essays.length();
    }

    @Override
    public Object getItem(int i) {
        try {
            return essays.get(i);
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public long getItemId(int i) {
        try {
            JSONObject jobject = (JSONObject) essays.get(i);
            return jobject.getInt("id");
        } catch (JSONException e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public View getView(int i, View essayElementView, ViewGroup viewGroup) {

        essayElementView = layoutInflater.inflate(R.layout.essay_element, null, false);
        TextView essayID, language, author, reviewer, status;
        essayID = essayElementView.findViewById(R.id.essayID);
        language = essayElementView.findViewById(R.id.language);
        author = essayElementView.findViewById(R.id.author);
        reviewer = essayElementView.findViewById(R.id.reviewer);
        status = essayElementView.findViewById(R.id.status);

        JSONObject jsonEssay = (JSONObject) getItem(i);
        Essay essay = null;
        try {
            essay = Essay.fromJSON(jsonEssay);
        } catch (JSONException e) {
            e.printStackTrace();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        final Essay essay1 = essay;
        essayID.setText(essayID.getText() + String.valueOf(essay.id));
        language.setText(language.getText() + essay.language);
        author.setText(author.getText() + essay.author);
        reviewer.setText(reviewer.getText() + essay.reviewer);
        status.setText(status.getText() + essay.status);
        essayElementView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(context, TextEssayDetailActivity.class);
                intent.putExtra("essay", essay1);
                context.startActivity(intent);
            }
        });

        return essayElementView;
    }
}
