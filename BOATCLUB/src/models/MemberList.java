package models;
import java.util.ArrayList;

public class MemberList {
    private final ArrayList<Member> members;

    public MemberList() {
        this.members = new ArrayList<>();
    }

    public MemberList(ArrayList<Member> list) {
        this.members = list;
    }

    public void addMember(Member member) {
        this.members.add(member);
    }

    public Member[] getMembers() {
        return members.toArray(new Member[0]);
    }

    public void removeMember(Member member) {
        this.members.remove(member);
    }
}
