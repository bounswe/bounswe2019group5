package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

class SelectEssayReviewerViewHolder extends RecyclerView.ViewHolder {
    View view;
    public TextView name, rating;

    public SelectEssayReviewerViewHolder(View _view) {
        super(_view);
        view = _view;
        name = view.findViewById(R.id.name);
        rating = view.findViewById(R.id.rating);
    }
}

class SelectEssayReviewerRecycleViewAdapter extends RecyclerView.Adapter<SelectEssayReviewerViewHolder> {
    private final String TAG = getClass().getName();
    MyApplication app;
    private ArrayList<UserProfile> mDataset;
    String essayText, essayPath;
    Context context;

    public SelectEssayReviewerRecycleViewAdapter(MyApplication _app, Context _context, ArrayList<UserProfile> _mDataset, String _essayText, String _essayPath) {
        app = _app;
        mDataset = _mDataset;
        context = _context;
        essayPath = _essayPath;
        essayText = _essayText;
    }

    public SelectEssayReviewerViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.essay_reviewer_list_item, parent, false);
        SelectEssayReviewerViewHolder viewHolder = new SelectEssayReviewerViewHolder(v);
        return viewHolder;
    }

    public void onBindViewHolder(SelectEssayReviewerViewHolder holder, final int position) {
        holder.name.setText((mDataset.get(position)).username);
        holder.rating.setText(String.format("%.1f / 5", (mDataset.get(position)).rating_average));
        holder.view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(context, UploadEssayActivity.class);
                intent.putExtra("essayText", essayText);
                intent.putExtra("essayPath", essayPath);
                intent.putExtra("reviewerProfile", mDataset.get(position));
                context.startActivity(intent);
            }
        });
    }

    public int getItemCount() {
        return mDataset.size();
    }
}


public class SelectEssayReviewerActivity extends AppCompatActivity {

    RecyclerView recyclerView;
    MyApplication app;
    SelectEssayReviewerRecycleViewAdapter adapter;
    String essayText, essayPath;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_select_essay_reviewer);
        app = (MyApplication) getApplication();
        recyclerView = findViewById(R.id.reviewerList);
        essayText = getIntent().getStringExtra("essayText");
        essayPath = getIntent().getStringExtra("essayPath");
        app.initiateAPICall(Request.Method.GET, "recommendation/?language=" + app.getLanguage(), null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                ArrayList<UserProfile> profiles = new ArrayList<>();
                try {
                    for (int i = 0; i < response.length(); i++)
                        profiles.add(UserProfile.fromJSON((JSONObject) response.get(i)));
                }
                catch (JSONException e) {
                    e.printStackTrace();
                    finish();
                    return;
                }
                adapter = new SelectEssayReviewerRecycleViewAdapter(app, SelectEssayReviewerActivity.this, profiles, essayText, essayPath);
                recyclerView.setLayoutManager(new LinearLayoutManager(SelectEssayReviewerActivity.this));
                recyclerView.setAdapter(adapter);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(SelectEssayReviewerActivity.this, error.toString(), Toast.LENGTH_SHORT).show();
                finish();
            }
        });
    }
}
