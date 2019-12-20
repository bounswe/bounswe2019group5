package com.example.languageLearning;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;


public class UserSearchAdapter extends RecyclerView.Adapter<UserSearchAdapter.ExampleViewHolder> implements Filterable {
    private List<UserSearchItem> exampleList;

    ArrayList<UserSearchItem> users_list;

    OnPersonListener mOnPersonListener;

    class ExampleViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        ImageView imageView;
        TextView textView1;
        TextView textView2;

        OnPersonListener onPersonListener;

        ExampleViewHolder(View itemView, OnPersonListener onPersonListener) {
            super(itemView);
            imageView = itemView.findViewById(R.id.image_view);
            textView1 = itemView.findViewById(R.id.text_view1);
            textView2 = itemView.findViewById(R.id.text_view2);

            this.onPersonListener = onPersonListener;

            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View v) {
            onPersonListener.onPersonClick(getAdapterPosition());
        }
    }

    public interface OnPersonListener{
        void onPersonClick(int position);
    }

    UserSearchAdapter(List<UserSearchItem> exampleList, OnPersonListener onPersonListener) {
        this.exampleList = exampleList;

        this.mOnPersonListener = onPersonListener;
    }

    @NonNull
    @Override
    public ExampleViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.activity_user_search_item,
                parent, false);
        return new ExampleViewHolder(v,mOnPersonListener);
    }

    @Override
    public void onBindViewHolder(@NonNull ExampleViewHolder holder, int position) {
        UserSearchItem currentItem = exampleList.get(position);

        holder.imageView.setImageResource(currentItem.getImageResource());
        holder.textView1.setText(currentItem.getUserName());
        holder.textView2.setText(currentItem.getNativeLang());
    }

    @Override
    public int getItemCount() {
        return exampleList.size();
    }

    @Override
    public Filter getFilter() {
        return exampleFilter;
    }

    private Filter exampleFilter = new Filter() {
        @Override
        protected FilterResults performFiltering(CharSequence constraint) {

            FilterResults results = new FilterResults();
            results.values = users_list;

            return results;
        }

        @Override
        protected void publishResults(CharSequence constraint, FilterResults results) {
            exampleList.clear();
            exampleList.addAll((List) results.values);
            notifyDataSetChanged();
        }
    };

    public void setUserList(ArrayList<UserSearchItem> users){
        users_list = users;
    }



}