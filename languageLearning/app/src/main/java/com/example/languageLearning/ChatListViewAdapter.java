package com.example.languageLearning;




import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

class ChatListViewAdapter extends ArrayAdapter<String> {

    public ChatListViewAdapter(@NonNull Context context, String[] families) {
        super(context, R.layout.chat_list_view_custom_row,families);
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        LayoutInflater tonysInflater = LayoutInflater.from(getContext());
        View customView = tonysInflater.inflate(R.layout.chat_list_view_custom_row,parent,false);

        String singleFamilyItem = getItem(position);
        TextView tonysText = (TextView) customView.findViewById(R.id.tonysText);
        ImageView tonysImage = (ImageView) customView.findViewById(R.id.tonysImage);

        tonysText.setText(singleFamilyItem);
        tonysImage.setImageResource(R.drawable.ic_person);

        return customView;
    }
}