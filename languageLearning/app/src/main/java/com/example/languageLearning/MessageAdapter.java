package com.example.languageLearning;

import android.app.Activity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.List;

public class MessageAdapter extends BaseAdapter {

    private Activity activity;
    List<ChatMessage> messages;

    public MessageAdapter(Activity context, List<ChatMessage> objects) {
        this.activity = context;
        this.messages = objects;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ChatMessage chatMessage = messages.get(position);
        View view;
        if (convertView != null && (boolean)convertView.getTag(R.id.TAG_MINE) == chatMessage.mine) { // Do not use convertView if it is of wrong type
            view = convertView;
        } else {
            LayoutInflater inflater = (LayoutInflater) activity.getSystemService(Activity.LAYOUT_INFLATER_SERVICE);
            int layoutResource = chatMessage.mine?R.layout.right_chat_bubble:R.layout.left_chat_bubble;
            view = inflater.inflate(layoutResource, parent, false);
            view.setTag(R.id.TAG_MINE, chatMessage.mine);
        }

        //set message text
        ((TextView)view.findViewById(R.id.txt_msg)).setText(chatMessage.text);

        return view;
    }

    @Override
    public int getViewTypeCount() {
        // return the total number of view types. this value should never change
        // at runtime. Value 2 is returned because of left and right views.
        return 2;
    }

    @Override
    public int getCount() {
        return messages.size();
    }

    @Override
    public Object getItem(int position) {
        return messages.get(position);
    }

    @Override
    public long getItemId(int position) {
        return -1;
    }

    @Override
    public int getItemViewType(int position) {
        return messages.get(position).mine?0:1;
    }
}