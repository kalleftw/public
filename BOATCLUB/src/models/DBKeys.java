package models;

public enum DBKeys {
    HIGHEST_ID("highestId"),
    MEMBER_LIST("memberList"),
    MEMBER_ID("id"),
    MEMBER_FIRST_NAME("first_name"),
    MEMBER_LAST_NAME("last_name"),
    MEMBER_SSN("ssn"),
    MEMBER_BOATS("boats"),
    BOAT_TYPE("type"),
    BOAT_LENGTH("length");

    private final String jsonString;

    DBKeys(String a_jsonString) {
        this.jsonString = a_jsonString;
    }
    public String toString() {
        return jsonString;
    }
}
