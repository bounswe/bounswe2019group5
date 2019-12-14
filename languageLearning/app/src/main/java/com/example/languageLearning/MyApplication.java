package com.example.languageLearning;

import android.app.Application;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Handler;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.FormBodyPart;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

interface StringFunction {
    void invoke(String s);
}

interface InputStreamFunction {
    void invoke(InputStream s);
}

interface BufferedReaderFunction {
    void invoke(BufferedReader r);
}

public class MyApplication extends Application {
    static final String SERVER = "http://35.158.176.194/";
    private final String TAG = getClass().getName();
    public final int TOUCH_AND_HOLD_DELAY_MS = 500;

    private String token;
    private RequestQueue requestQueue;
    private String username;
    private String language = "english";

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        requestQueue = Volley.newRequestQueue(getApplicationContext());
    }

    @Override
    public void onTerminate() {
        super.onTerminate();
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void initiateAPICall(int method,
                                String path,
                                @Nullable JSONObject data,
                                Response.Listener<JSONObject> listener,
                                @Nullable final Response.ErrorListener errorListener) {
        String URL = SERVER + path;

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(method, URL, data, listener, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getApplicationContext(), error.toString(), Toast.LENGTH_SHORT).show();
                Log.e(TAG, error.toString());
                String message = error.getMessage();
                if (message != null)
                    Log.e(TAG, message);
                error.printStackTrace();
                if (errorListener != null)
                    errorListener.onErrorResponse(error);
            }
        }) {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }

            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> headers = new HashMap<>();
                if (getToken() != null)
                    headers.put("Authorization", "Token " + getToken());
                return headers;
            }
        };
        requestQueue.add(jsonObjectRequest);
    }

    public void initiateAPICall(int method,
                                String path,
                                @Nullable JSONArray data,
                                Response.Listener<JSONArray> listener,
                                @Nullable final Response.ErrorListener errorListener) {
        String URL = SERVER + path;

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(method, URL, data, listener, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getApplicationContext(), error.toString(), Toast.LENGTH_SHORT).show();
                Log.e(TAG, error.toString());
                //Log.e(TAG, error.getMessage());
                error.printStackTrace();
                if (errorListener != null)
                    errorListener.onErrorResponse(error);
            }
        }) {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }

            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> headers = new HashMap<>();
                if (getToken() != null)
                    headers.put("Authorization", "Token " + getToken());
                return headers;
            }
        };
        requestQueue.add(jsonArrayRequest);
    }

    public void initiateMultiPartAPICall(int method,
                                String path,
                                Map<String, String> textParams,
                                FormBodyPart[] fileParams,
                                final Response.Listener<JSONObject> listener,
                                @Nullable final StringFunction errorListener) {
        String URL = SERVER + path;
        //String URL = "http://httpbin.org/post";

        final CloseableHttpClient client = new DefaultHttpClient();
        RequestBuilder reqbuilder;
        if (method == Request.Method.POST)
            reqbuilder = RequestBuilder.post(URL);
        else if (method == Request.Method.PUT)
            reqbuilder = RequestBuilder.put(URL);
        else if (method == Request.Method.PATCH)
            reqbuilder = RequestBuilder.patch(URL);
        else
            throw new IllegalArgumentException("method must be either POST, PUT or PATCH");

        MultipartEntityBuilder entityBuilder = MultipartEntityBuilder.create();
        entityBuilder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);

        for (Map.Entry<String, String> param : textParams.entrySet()) {
            entityBuilder.addTextBody(param.getKey(), param.getValue());
        }

        for (FormBodyPart part : fileParams)
            entityBuilder.addPart(part);

        //entityBuilder.setContentType(ContentType.APPLICATION_JSON);
        entityBuilder.setCharset(Charset.forName("UTF-8"));

        if (getToken() != null)
            reqbuilder.setHeader("Authorization", "Token " + getToken());

        HttpEntity entity = entityBuilder.build();
        reqbuilder.setEntity(entity);

        final HttpUriRequest request = reqbuilder.build();

        new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... voids) {
                int statusCode;
                String responseString;
                try {
                    HttpResponse response = client.execute(request);
                    HttpEntity httpEntity = response.getEntity();
                    statusCode = response.getStatusLine().getStatusCode();
                    responseString = EntityUtils.toString(httpEntity);
                }
                catch (Exception e) {
                    showToastAndCallErrorListener(e.toString());
                    return null;
                }
                if (statusCode < 200 || statusCode >= 300) {
                    showToastAndCallErrorListener(responseString);
                    return null;
                }
                try {
                    final JSONObject jResponse = new JSONObject(responseString);
                    Handler handler =  new Handler(getMainLooper());
                    handler.post( new Runnable(){
                        public void run(){
                            listener.onResponse(jResponse); // Run the listener on the UI thread
                        }
                    });
                }
                catch (JSONException e) {
                    showToastAndCallErrorListener(e.toString());
                    return null;
                }
                return null;
            }

            void showToastAndCallErrorListener(final String s) {
                Handler handler =  new Handler(getMainLooper());
                handler.post( new Runnable(){
                    public void run(){
                        Toast.makeText(getApplicationContext(), s, Toast.LENGTH_SHORT).show();
                        Log.e(TAG, s);
                        if (errorListener != null)
                            errorListener.invoke(s);
                    }
                });
            }
        }.execute();
    }

    public void rawHTTPGetRequest(URI uri, final InputStreamFunction callback, @Nullable final StringFunction errorListener) {
        final HttpClient httpclient = new DefaultHttpClient();
        final HttpGet request = new HttpGet();
        request.setURI(uri);

        new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... voids) {
                try {
                    final HttpResponse response = httpclient.execute(request);
                    final InputStream s = response.getEntity().getContent();
                    callback.invoke(s);
                }catch(final Exception e){
                    Handler handler =  new Handler(getMainLooper());
                    handler.post( new Runnable() {
                        public void run() {
                            String message = "Error in http connection " + e.toString();
                            Toast.makeText(getApplicationContext(), message, Toast.LENGTH_SHORT).show();
                            if (errorListener != null)
                                errorListener.invoke(message);
                        }
                    });
                }
                return null;
            }
        }.execute();
    }

    public void rawHTTPGetRequest(URI uri, final BufferedReaderFunction callback, @Nullable final StringFunction errorListener) {
        rawHTTPGetRequest(uri, new InputStreamFunction() {
            @Override
            public void invoke(InputStream s) {
                final BufferedReader in = new BufferedReader(new InputStreamReader(s, StandardCharsets.UTF_8));
                callback.invoke(in);
            }
        }, errorListener);
    }
}
