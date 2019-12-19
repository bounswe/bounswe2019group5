package com.example.languageLearning;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class ListEssaysTabbedFragment extends Fragment {

    private final String TAG = "TEST";
    private MyApplication app;
    ListView listView;
    private boolean outgoing;

    ListEssaysTabbedFragment(boolean outgoing) {
        this.outgoing = outgoing;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        View rootView = inflater.inflate(R.layout.list_essays_tab, container, false);
        listView = rootView.findViewById(R.id.listView);
        app = (MyApplication)getActivity().getApplication();
        return rootView;
    }

    private void gotEssays(JSONArray essays) {
        if (essays.length() == 0) {
            Toast.makeText(getActivity(), "No Essays", Toast.LENGTH_SHORT).show();
            return;
        }

        try {
            ArrayList<Essay> essaysParsed = new ArrayList<>();

            for (int i=0; i<essays.length(); i++) {
                try {
                    Essay parsed = Essay.fromJSON(essays.getJSONObject(i));
                    if (outgoing == parsed.author.equals(app.getUsername()))
                        essaysParsed.add(parsed);
                }
                catch (Exception e) {
                    e.printStackTrace();
                    Toast.makeText(getActivity(), e.toString(), Toast.LENGTH_SHORT).show();
                    getActivity().finish();
                    return ;
                }
            }

            Collections.sort(essaysParsed, new Comparator<Essay>() {
                @Override
                public int compare(Essay o1, Essay o2) {
                    return -o1.date.compareTo(o2.date); // Sort in reverse, show recent essays at the top
                }
            });

            EssayAdapter essayAdapter = new EssayAdapter(getActivity(), getActivity(), essaysParsed);
            listView.setAdapter(essayAdapter);
        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(getActivity(), e.toString(), Toast.LENGTH_SHORT).show();
            getActivity().finish();
            return;
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        String pendingsString = getActivity().getIntent().getStringExtra("pendings");
        if(pendingsString == null) {
            String path = "essay/";
            app.initiateAPICall(Request.Method.GET, path, null, new Response.Listener<JSONArray>() {
                @Override
                public void onResponse(JSONArray response) {
                    gotEssays(response);
                }

            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    getActivity().finish();
                }
            });
        }else {
            JSONArray pendings;
            try {
                pendings = new JSONArray(pendingsString);
            }
            catch (JSONException e) {
                e.printStackTrace();
                Toast.makeText(getActivity(), e.toString(), Toast.LENGTH_SHORT).show();
                getActivity().finish();
                return ;
            }
            gotEssays(pendings);
        }
    }
}
