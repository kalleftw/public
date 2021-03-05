package models;

public class Boat {
    private BoatType boatType;
    private int length;

    public Boat (BoatType type, int len) {
        boatType = type;
        length = len;
    }

    public BoatType getBoatType() {
        return boatType;
    }

    public void setBoatType(BoatType boatType) {
        this.boatType = boatType;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public String toString () {
        return this.getBoatType().name() + ": " + this.getLength() + " ft" + "\n";
    }
}
