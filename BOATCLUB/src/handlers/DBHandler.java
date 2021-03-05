package handlers;

import org.json.JSONObject;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class DBHandler {
    public void saveToDBFile (String dbFileName, String stringData) throws IOException {
        FileWriter fileWriter = new FileWriter(dbFileName);
        PrintWriter printWriter = new PrintWriter(fileWriter);
        printWriter.print(stringData);
        printWriter.close();
    }

    public JSONObject loadFromDBFile(JsonHandler jsonHandler, String dbFileName) {
        JSONObject db;
        try {
            db = jsonHandler.loadJsonDBObject(dbFileName);
        }  catch (Exception e) {
            return new JSONObject();
        }
        return db;
    }
}
