package models;

public enum BoatType {
    SAILBOAT("Sailboat"),
    MOTORSAILER("Motorsailer"),
    KAYAK("Kayak"),
    OTHER("Other");

    private final String name;
    BoatType(String a_name) { name = a_name; }
    public String toString() { return name; }
}
