package handlers;

import models.*;
import view.View;

/**
 * Handles everything regarding boats.
 */
public class BoatHandler {
    final View view;
    final MemberHandler memberHandler;

    /**
     * Constructor
     * @param a_view view
     * @param a_memberHandler memberhandled
     */
    public BoatHandler (View a_view, MemberHandler a_memberHandler) {
        view = a_view;
        memberHandler = a_memberHandler;
    }

    /**
     * Register a boat
     */
    public void registerBoat() {
        int id = view.askForID();
        Member member = memberHandler.getMember(id);
        if (member == null) return;

        BoatType boatType = view.getBoatType();
        int lengthInput = view.getBoatLength();

        registerBoat(member, boatType, lengthInput);
        view.showSuccess();
    }

    /**
     * Register a boat
     */
    public void registerBoat(Member owner, BoatType type, int length) {
        Boat boat = new Boat(type, length);
        owner.registerBoat(boat);
    }

    /**
     * Show boat details
     */
    public void showBoat() {
        int id = view.askForID();
        Member member = memberHandler.getMember(id);
        if (member == null) return;

        if (member.getBoats().length == 0) {
            view.showNotFound();
            return;
        }
        view.displayBoatList(member.getBoats());

        int indexToExamine = view.getNumericInput("Enter index of boat to examine further: ");
        Boat toExamine = member.getBoats()[indexToExamine];

        view.displayBoat(toExamine);
    }

    /**
     * Delete a boat
     */
    public void deleteBoat() {
        int id = view.askForID();
        Member member = memberHandler.getMember(id);
        if (member == null) return;

        if (member.getBoats().length == 0) {
            view.showNotFound();
            return;
        }
        view.displayBoatList(member.getBoats());

        int indexToDelete = view.getNumericInput("Enter number associated with the boat you want to delete:");

        deleteBoat(member, indexToDelete);
        view.showSuccess();
    }

    /**
     * Delete a boat
     */
    public void deleteBoat(Member owner, int index) {
        owner.deleteBoat(index);
    }

    /**
     * Update a boat
     */
    public void updateBoat() {
        int id = view.askForID();
        Member member = memberHandler.getMember(id);
        if (member == null) return;

        if (member.getBoats().length == 0) {
            view.showNotFound();
            return;
        }
        view.displayBoatList(member.getBoats());

        int indexToUpdate = view.getNumericInput();
        Boat toUpdate = member.getBoats()[indexToUpdate];
        BoatType boatType = view.getBoatType();
        int lengthInput = view.getBoatLength();
        updateBoat(toUpdate, boatType, lengthInput);
        view.showSuccess();
    }

    /**
     * Update a boat
     */
    public void updateBoat(Boat boat, BoatType type, int len) {
        boat.setBoatType(type);
        boat.setLength(len);
    }
}
