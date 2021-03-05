import models.*;
import view.View;
import handlers.*;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.ArrayList;

public class Console {

    private final View view;
    private final JSONObject db;
    private final Context context;
    private final String dbFileName;
    private final DBHandler dbHandler;
    private final BoatHandler boatHandler;
    private final JsonHandler jsonHandler;
    private final MemberHandler memberHandler;

    public Console(View a_view, String a_dbFileName) {
        jsonHandler = new JsonHandler();
        dbHandler = new DBHandler();
        dbFileName = a_dbFileName;
        view = a_view;

        /*
        Load the database file into memory
         */
        db = dbHandler.loadFromDBFile(jsonHandler, dbFileName);
        ArrayList<Member> existingMembers = jsonHandler.dbToMembersList(db);
        int memberCount = jsonHandler.getLastIdCount(db, DBKeys.HIGHEST_ID.toString());

        /*
        Create a context instance, which will contain state
        we may want to pass around.
         */
        context = new Context(memberCount);

        if (existingMembers == null) {
            memberHandler = new MemberHandler(view, context);
        } else {
            memberHandler = new MemberHandler(existingMembers, view, context);
        }
        boatHandler = new BoatHandler(view, memberHandler);
    }

    public void run() {
        runLoop:
        while (true) {
            MenuOptions[] options = MenuOptions.values();
            view.displayMenu(options);
            try {
                int input = view.getNumericInput() - 1;
                if (input < 0 || input >= options.length){
                    throw  new IllegalArgumentException("Invalid menu choice.");
                }
                MenuOptions option = options[input];

                switch (option) {
                    case VIEW_MEMBER_LIST -> memberHandler.listAllMembers();
                    case LOOKUP_MEMBER -> memberHandler.listOneMember();
                    case ADD_MEMBER -> memberHandler.addMember();
                    case UPDATE_MEMBER -> memberHandler.updateMember();
                    case DELETE_MEMBER -> memberHandler.deleteMember();
                    case REGISTER_BOAT -> boatHandler.registerBoat();
                    case SHOW_BOAT -> boatHandler.showBoat();
                    case UPDATE_BOAT -> boatHandler.updateBoat();
                    case DELETE_BOAT -> boatHandler.deleteBoat();
                    default -> {
                        save();
                        break runLoop;
                    }
                }
            } catch (IllegalArgumentException e) {
                view.showFailure(e.getMessage());
            }
        }
    }

    private void save() {
        JSONArray membersJsonArray = jsonHandler.getJsonArrayFromMemberArray(memberHandler.getAllMembers());
        this.db.put(DBKeys.MEMBER_LIST.toString(), membersJsonArray);
        this.db.put(DBKeys.HIGHEST_ID.toString(), context.getMemberCount());

        try {
            dbHandler.saveToDBFile(dbFileName, db.toString());
        } catch (Exception e) {
            view.showFailure();
        }
    }



}