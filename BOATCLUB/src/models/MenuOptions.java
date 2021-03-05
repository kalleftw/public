package models;

public enum MenuOptions {

    VIEW_MEMBER_LIST("View member list"),
    LOOKUP_MEMBER("Lookup member"),
    ADD_MEMBER("Add member"),
    UPDATE_MEMBER("Update member"),
    DELETE_MEMBER("Delete member"),
    REGISTER_BOAT("Register boat for member"),
    SHOW_BOAT("Show boat information"),
    UPDATE_BOAT("Update boat"),
    DELETE_BOAT("Delete boat"),
    EXIT("Exit program");

    private final String name;

    MenuOptions(String a_name) {
        name = a_name;
    }
    public String toString() {
        return name;
    }
}
