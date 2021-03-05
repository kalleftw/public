package handlers;

import models.*;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class JsonHandler {

    public int getLastIdCount (JSONObject db, String key) {
        try {
            return db.getInt(key);
        } catch (Exception e) {
            return 0;
        }
    }

    public JSONArray getJsonArrayFromMemberArray (Member[] members) {
        JSONArray memberList = new JSONArray();
        for (Member m : members) {
            JSONArray boats = new JSONArray();
            JSONObject member = new JSONObject();

            for (Boat b : m.getBoats()) {
                JSONObject jsonBoat = new JSONObject();
                jsonBoat.put(DBKeys.BOAT_TYPE.toString(), b.getBoatType().name());
                jsonBoat.put(DBKeys.BOAT_LENGTH.toString(), b.getLength());
                boats.put(jsonBoat);
            }

            MemberName name = m.getName();

            member.put(DBKeys.MEMBER_ID.toString(), m.getMemberId());
            member.put(DBKeys.MEMBER_FIRST_NAME.toString(), name.getFirst());
            member.put(DBKeys.MEMBER_LAST_NAME.toString(), name.getLast());
            member.put(DBKeys.MEMBER_SSN.toString(), m.getSsn());
            member.put(DBKeys.MEMBER_BOATS.toString(), boats);
            memberList.put(member);
        }
        return memberList;
    }
    public JSONObject loadJsonDBObject (String filename) throws IOException {
        BufferedReader reader;
        String jsonString;

        reader = new BufferedReader(new FileReader(filename));
        StringBuilder sb = new StringBuilder();
        String line = reader.readLine();

        while (line != null) {
            sb.append(line);
            sb.append("\n");
            line = reader.readLine();
        }
        jsonString = sb.toString();
        reader.close();

        return new JSONObject(jsonString);
    }


    public ArrayList<Member> dbToMembersList (JSONObject db) {
        JSONArray memberJsonList;
        try {
            memberJsonList = db.getJSONArray(DBKeys.MEMBER_LIST.toString());
        } catch (Exception e) {
            return new ArrayList<>();
        }
        ArrayList<Member> memberList = new ArrayList<>();

        for(int i = 0; i < memberJsonList.length(); i++) {
            JSONObject temp = memberJsonList.getJSONObject(i);
            Member m = new Member(temp.getString(DBKeys.MEMBER_FIRST_NAME.toString()),
                                    temp.getString(DBKeys.MEMBER_LAST_NAME.toString()),
                                    temp.getString(DBKeys.MEMBER_SSN.toString()),
                                    temp.getInt(DBKeys.MEMBER_ID.toString()));

            JSONArray membersBoatJsonList = temp.getJSONArray(DBKeys.MEMBER_BOATS.toString());
            for (int j = 0; j < membersBoatJsonList.length(); j++) {
                JSONObject boatJson = membersBoatJsonList.getJSONObject(j);
                int length = boatJson.getInt(DBKeys.BOAT_LENGTH.toString());
                BoatType type = BoatType.valueOf(boatJson.getString(DBKeys.BOAT_TYPE.toString()));
                Boat boat = new Boat(type, length);

                m.registerBoat(boat);
            }
            memberList.add(m);
        }
        return memberList;
    }
}