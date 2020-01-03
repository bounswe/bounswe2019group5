package com.example.languageLearning;

import android.content.Context;
import android.os.UserHandle;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.net.URI;
import java.net.URISyntaxException;
import java.text.ParseException;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;



@RunWith(MockitoJUnitRunner.class)
public class JSONUnitTests {
    @Mock
    MyApplication mockContext; // MyApplication -> Application -> ContextWrapper -> Context. So, MyApplication is a Context.

    @Before
    public void prepareMockContext() {
        when(mockContext.getApplicationContext()).thenReturn(mockContext);
        when(mockContext.getLanguage()).thenReturn("english");
        when(mockContext.getToken()).thenReturn("beb9a6ae0bb9ea89f6afa23f6605c41628ae5ec5");
        when(mockContext.getUsername()).thenReturn("kbozdogan");
    }

    @Test
    public void test_ChatMessage() throws JSONException, ParseException {
        final String to_username = "hasan";
        final String from_username = "kbozdogan";
        final String text = "wyd?";
        final String date = "2019-12-10T08:30:32.154Z";

        JSONObject mockResponse = new JSONObject();

        mockResponse.put("to_username", to_username);
        mockResponse.put("from_username", from_username);
        mockResponse.put("text", text);
        mockResponse.put("date", date);

        ChatMessage parsed = ChatMessage.fromJSON(mockContext, mockResponse);
        assertEquals(to_username, parsed.to);
        assertEquals(from_username, parsed.from);
        assertEquals(text, parsed.text);
        assertEquals(true, parsed.mine);
        assertEquals(2019-1900, parsed.date.getYear()); // Someone though it was a good idea to offset years by 1900
        assertEquals(12-1, parsed.date.getMonth()); // Someone though it was a good idea to have the months 0-based
        assertEquals(10, parsed.date.getDate()); // Someone though it was a good idea to have getDay() return day-of-week, instead of day-of-month. So we use getDate()
        assertEquals(8, parsed.date.getHours());
        assertEquals(30, parsed.date.getMinutes());
        assertEquals(32, parsed.date.getSeconds());
    }

    @Test
    public void test_Essay() throws JSONException, URISyntaxException, ParseException {
        final int id = 12;
        final String language = "turkish";
        final String uri = "http://test.com/myfile.txt";
        final String reviewer = "ahmet";
        final String author = "kbozdogan";
        final String status = "completed";

        JSONObject mockResponse = new JSONObject();

        mockResponse.put("id", id);
        mockResponse.put("language", language);
        mockResponse.put("writing", uri);
        mockResponse.put("reviewer", reviewer);
        mockResponse.put("author", author);
        mockResponse.put("status", status);

        Essay parsed = Essay.fromJSON(mockResponse);
        assertEquals(id, parsed.id);
        assertEquals(language, parsed.language);
        assertEquals(uri, parsed.fileUri.toString());
        assertEquals(reviewer, parsed.reviewer);
        assertEquals(author, parsed.author);
        assertEquals(status, parsed.status);
    }

    private JSONObject getMockQuestion(int id, String text, String[] options) throws JSONException {
        JSONObject mockResponse = new JSONObject();

        mockResponse.put("id", id);
        mockResponse.put("body", text);

        JSONArray optionsArray = new JSONArray();
        for (String option : options)
            optionsArray.put(option);
        mockResponse.put("options", optionsArray);

        return mockResponse;
    }

    @Test
    public void test_Question() throws JSONException {
        final int id=13;
        final String text="which one?";
        final String options[] = {"this one?", "or this?", "the first one.", "the last one."};

        JSONObject mockResponse = getMockQuestion(id, text, options);
        Question parsed = Question.fromJSON(mockResponse);
        assertEquals(id, parsed.id);
        assertEquals(text, parsed.text);
        assertNull(parsed.answer);
        assertArrayEquals(options, parsed.options);
    }

    @Test
    public void test_Exercise() throws JSONException {
        final int question_ids[]={13, 14};
        final String question_texts[]={"which one?", "again"};
        final String question_options[][] = {{"this one?", "or this?", "the first one.", "the last one."}, {"a","b","c","d"}};

        JSONObject[] mockQuestions = new JSONObject[question_ids.length];
        for (int i=0; i<question_ids.length; i++) {
            mockQuestions[i] = getMockQuestion(question_ids[i], question_texts[i], question_options[i]);
        }

        final int exercise_id = 10;
        JSONObject mockResponse = new JSONObject();
        mockResponse.put("id", exercise_id);
        JSONArray questionsArray = new JSONArray();
        for (JSONObject question : mockQuestions)
            questionsArray.put(question);
        mockResponse.put("questions", questionsArray);

        Exercise parsed = Exercise.fromJSON(mockResponse);
        assertEquals(exercise_id, parsed.id);
        assertEquals(question_ids[0], parsed.questions[0].id);
        assertEquals(question_ids[1], parsed.questions[1].id);
    }

    private JSONObject getMockComment(String username, String comment, double rate) throws JSONException {
        JSONObject res = new JSONObject();
        res.put("username", username);
        res.put("comment", comment);
        res.put("rate", rate);
        return res;
    }

    @Test
    public void test_UserProgress() throws JSONException {

        final int not = 7;
        final int nof = 3;
        final int ntc = 6;
        final int nt = 10;
        final int cecl = 2;
        final int eicl = 3;
        final double grade = 70;
        final double progress = 60;


        JSONObject mockResponse = new JSONObject();
        mockResponse.put("number_of_true", not);
        mockResponse.put("number_of_false", nof);
        mockResponse.put("number_of_test_completed", ntc);
        mockResponse.put("number_of_test", nt);
        mockResponse.put("completed_exercise_current_level", cecl);
        mockResponse.put("exercise_in_current_level", eicl);

        AppProgress parsed = AppProgress.fromJSON(mockResponse);
        assertEquals(not, parsed.number_of_true);
        assertEquals(nof, parsed.number_of_false);
        assertEquals(ntc, parsed.ntc);
        assertEquals(nt, parsed.nt);
        assertEquals(cecl, parsed.cecl);
        assertEquals(eicl, parsed.eicl);

    }

    @Test
    public void test_UserProfile() throws JSONException {
        final int id = 42;
        final String username = "halil";
        final String first_name = "Halil";
        final String last_name = "Ne";
        final String native_language = "german";
        final double rating_average = 4.98;
        final String[] commenter_usernames = {"kbozdogan", "yilmaz"};
        final String[] comments = {"good", "bad"};
        final double[] rates = {4.0, 1.0};

        JSONObject mockResponse = new JSONObject();
        mockResponse.put("id", id);
        mockResponse.put("username", username);
        mockResponse.put("first_name", first_name);
        mockResponse.put("last_name", last_name);
        mockResponse.put("native_language", native_language);
        mockResponse.put("rating_average", rating_average);

        JSONArray user_comments = new JSONArray();
        for (int i=0; i<commenter_usernames.length; i++)
            user_comments.put(getMockComment(commenter_usernames[i], comments[i], rates[i]));
        mockResponse.put("user_comments", user_comments);

        UserProfile parsed = UserProfile.fromJSON(mockResponse);
        assertEquals(id, parsed.id);
        assertEquals(username, parsed.username);
        assertEquals(first_name, parsed.first_name);
        assertEquals(last_name, parsed.last_name);
        assertEquals(native_language, parsed.native_language);
        assertEquals(rating_average, parsed.rating_average, 1e-4);
        assertEquals(commenter_usernames[0], parsed.comments.get(0).username);
        assertEquals(comments[0], parsed.comments.get(0).comment);
        assertEquals(rates[0], parsed.comments.get(0).rate, 1e-4);
        assertEquals(commenter_usernames[1], parsed.comments.get(1).username);
    }
}