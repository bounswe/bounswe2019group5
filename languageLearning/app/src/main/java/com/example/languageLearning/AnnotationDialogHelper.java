package com.example.languageLearning;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AlertDialog;

public class AnnotationDialogHelper {

    public static void showAnnotationDialog(final Context context, String annotationText, final String reviewerUsername) {
        AlertDialog.Builder alert = new AlertDialog.Builder(context);
        MyApplication app = (MyApplication)context.getApplicationContext();
        boolean weAreTheReviewer = reviewerUsername.equals(app.getUsername());
        if (weAreTheReviewer)
            alert.setTitle("You commented...");
        else
            alert.setTitle(String.format("%s commented...", reviewerUsername));
        alert.setMessage(annotationText);
        alert.setPositiveButton("Ok", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
            }
        });
        if (weAreTheReviewer == false)
            alert.setNegativeButton("Chat", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialogInterface, int i) {
                    Intent intent = new Intent(context, ChatHistory.class);
                    intent.putExtra("Person", reviewerUsername);
                    context.startActivity(intent);
                }
            });
        alert.show();
    }
}
