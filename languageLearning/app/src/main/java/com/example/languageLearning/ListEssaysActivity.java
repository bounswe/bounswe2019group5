package com.example.languageLearning;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.viewpager.widget.ViewPager;

import android.app.ActionBar;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ListView;
import android.widget.TableLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.google.android.material.tabs.TabLayout;

import android.util.Log;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Random;

class ListEssaysTabsPagerAdapter extends FragmentPagerAdapter {

    private boolean hideOutgoing;

    public ListEssaysTabsPagerAdapter(FragmentManager fm, boolean hideOutgoing) {
        super(fm);
        this.hideOutgoing = hideOutgoing;
    }

    @Override
    public Fragment getItem(int index) {

        switch (index) {
            case 0:
                return new ListEssaysTabbedFragment(false);
            case 1:
                return new ListEssaysTabbedFragment(true);
        }

        return null;
    }

    @Override
    public int getCount() {
        if (hideOutgoing)
            return 1;
        else
            return 2;
    }
}

public class ListEssaysActivity extends AppCompatActivity {

    private final String TAG = getClass().getName();
    private MyApplication app;
    private ViewPager pager;
    private TabLayout tabLayout;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_essays);
        app = (MyApplication)getApplication();
        pager = findViewById(R.id.list_essays_pager);
        tabLayout = findViewById(R.id.essay_list_tab_layout);

        String pendingsString = getIntent().getStringExtra("pendings");
        if(pendingsString == null) {
            pager.setAdapter(new ListEssaysTabsPagerAdapter(getSupportFragmentManager(), false));
            pager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));
            tabLayout.addOnTabSelectedListener(new TabLayout.ViewPagerOnTabSelectedListener(pager));
        }else {
            tabLayout.setVisibility(View.GONE);
            pager.setAdapter(new ListEssaysTabsPagerAdapter(getSupportFragmentManager(), true));
        }
    }
}
