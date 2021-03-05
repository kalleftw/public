package handlers;

import models.*;
import view.View;
import java.util.ArrayList;

/**
 * Handles everything regarding members
 */
public class MemberHandler {
    private final View view;
    private final Context context;
    private final MemberList members;

    /**
     * Constructor
     * No existing members supplied, create an empty list.
     * @param a_view
     * @param a_context
     */
    public MemberHandler(View a_view, Context a_context ) {
        members = new MemberList();
        view = a_view;
        context = a_context;
    }

    /**
     * Constructor
     * From a list of existing members.
     * @param list list of members
     * @param a_view view
     * @param a_context
     */
    public MemberHandler(ArrayList<Member> list, View a_view, Context a_context ) {
        members = new MemberList(list);
        view = a_view;
        context = a_context;
    }

    /**
     * List all members
     */
    public void listAllMembers() {
        view.showLists();
        int listTypeSelection = view.getNumericInput();
        Member[] members = getAllMembers();
        if (listTypeSelection == 1) {
            view.compactListMemberInfo(members);
        } else if (listTypeSelection == 2) {
            view.verboseListMemberInfo(members);
        }
    }

    /**
     * Display one member
     */
    public void listOneMember() {
        int id = view.askForID();
        Member member = getMember(id);
        if (member == null) {
            view.memberDoesNotExist();
            return;
        }
        view.memberDetails(member);
    }


    /**
     * Add a member
     */
    public void addMember() {
        String firstName = view.getFirstName();
        String lastName = view.getLastName();
        String ssn = view.getSSN();
        context.incrementMemberCount();
        addMember(firstName, lastName, ssn, context.getMemberCount());
        view.showSuccess();
    }

    private void addMember(String firstName, String lastName, String ssn, int id) {
        Member m = new Member(firstName, lastName, ssn, id);
        members.addMember(m);
    }

    /**
     * Update a member
     */
    public void updateMember() {
        try {
            int id = view.askForID();
            Member member = getMember(id);
            if (member == null) return;

            String firstName = view.getFirstName();
            String lastName = view.getLastName();
            String ssn = view.getSSN();

            updateMember(member, firstName, lastName, ssn, id);
            view.showSuccess();
        } catch (IllegalArgumentException e) {
            System.out.println(e);
        }
    }

    /**
     * Update a member
     */
    private void updateMember(Member m, String firstName, String lastName, String ssn, int memberId) {
        m.setName(firstName, lastName);
        m.setSsn(ssn);
        m.setMemberId(memberId);
    }

    /**
     * Delete a member
     */
    public void deleteMember() {
        int id = view.askForID();
        Member member = getMember(id);
        if (member == null) return;

        deleteMember(member);
        view.showSuccess();
    }

    /**
     * Delete a member
     */
    private void deleteMember(Member m) {
        members.removeMember(m);
        context.decrementMemberCount();
    }

    /**
     * Get all members
     * @return
     */
    public Member[] getAllMembers() {
        return members.getMembers();
    }

    /**
     * Get member from ID
     * @param memberId
     * @return
     */
    public Member getMember(int memberId) {
        for (Member m : getAllMembers()){
            if (m.getMemberId() == memberId) return m;
        }
        return null;
    }
}
