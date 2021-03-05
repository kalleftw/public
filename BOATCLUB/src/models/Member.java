package models;
import java.util.ArrayList;

public class Member {
    private MemberName name;
    private String ssn;
    private int memberId;
    private final ArrayList<Boat> ownedBoats;

    public Member(String firstName, String secondName, String ssn, int memberId) {
        this.name = new MemberName(firstName, secondName);
        this.ssn = ssn;
        this.memberId = memberId;
        this.ownedBoats = new ArrayList<>();
    }

    public MemberName getName() {
        return name;
    }

    public void setName(String firstName, String secondName) {
        this.name = new MemberName(firstName, secondName);
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public void registerBoat(Boat boat) {
        this.ownedBoats.add(boat);
    }

    public void deleteBoat(int index) {
        this.ownedBoats.remove(index);
    }

    public Boat[] getBoats() {
        return (this.ownedBoats.toArray(Boat[]::new));
    }

    public int getNoOfBoats() {
        return ownedBoats.size();
    }
}

