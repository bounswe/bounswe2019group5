package com.example.languageLearning;

import android.content.Context;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.text.ParseException;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;



@RunWith(MockitoJUnitRunner.class)
public class JSONParseUnitTests {
    @Mock
    MyApplication mockContext; // MyApplication -> Application -> ContextWrapper -> Context. So, MyApplication is a Context.

    @Test
    public void test_ChatMessage() throws JSONException, ParseException {
        when(mockContext.getApplicationContext()).thenReturn(mockContext);
        when(mockContext.getLanguage()).thenReturn("english");
        when(mockContext.getToken()).thenReturn("beb9a6ae0bb9ea89f6afa23f6605c41628ae5ec5");
        when(mockContext.getUsername()).thenReturn("kbozdogan");

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
}