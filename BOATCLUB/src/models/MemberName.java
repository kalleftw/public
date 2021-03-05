package models;

public class MemberName {
    private String first;
    private String last;

    public MemberName (String a_first, String a_last) {
        first = a_first;
        last = a_last;
    }

    @Override
    public String toString() {
        return first + " " + last;
    }

    public String getFirst() {
        return first;
    }

    public void setFirst(String first) {
        this.first = first;
    }

    public String getLast() {
        return last;
    }

    public void setLast(String last) {
        this.last = last;
    }
}
