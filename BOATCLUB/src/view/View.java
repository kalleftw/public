package view;
import models.Boat;
import models.Member;
import models.BoatType;
import models.MenuOptions;

public class View {
    final Input input;

    public View () {
        input = new Input();
    }

    private void waitForBackToMenu () {
        System.out.println("Press Enter to return to menu.");
        try {
            System.in.read();
        } catch (Exception e) {}
    }

    public int getNumericInput () {
        return input.promptNumericInput();
    }

    public int getNumericInput (String message) {
        System.out.println(message);
        return input.promptNumericInput();
    }

    public void displayBoatList (Boat[] boats) {
        System.out.println("List of boats: ");
        int boatIndex = 0;
        for (Boat b : boats) {
            System.out.print(boatIndex + ": ");
            System.out.println(b.getBoatType());
            boatIndex++;
        }
    }

    public void displayBoat (Boat boat) {
        System.out.println(boat.getBoatType().name() + ": " + boat.getLength() + " ft" + "\n");
        waitForBackToMenu();
    }


    /**
     * PROMPTS
     * Views that show a message and ask for user input.
     */
    public int askForID() {
        System.out.println("Select member's ID:");
        return input.promptNumericInput();
    }
    public void memberDoesNotExist() {
        System.out.println("Member does not exist.");
        waitForBackToMenu();
    }

    public void compactListMemberInfo (Member[] members) {
        for (Member m : members) {
            System.out.println("Member " + m.getMemberId() + ": " + m.getName() + " " + m.getSsn());
            for (Boat b : m.getBoats()) { System.out.println(b); }
        }
        waitForBackToMenu();
    }

    public void verboseListMemberInfo (Member[] members) {
        for (Member m : members) {
            System.out.println("Member: " + m.getName() + ". SSN: " + m.getSsn() + ". ID: " + m.getMemberId() + "\n" + "Boats: ");
            if (m.getNoOfBoats() >= 1) {
                for (Boat b : m.getBoats()) {
                    System.out.print("Type of boat: " + b.getBoatType() + ". Length of boat: " + b.getLength() + "ft." + " \n");
                }
            } else {
                System.out.print("None" + "\n");
            }
        }
        waitForBackToMenu();
    }

    public void memberDetails (Member member){
        System.out.println(
                "Member ID:" + member.getMemberId() + "\n" +
                        "Full name: " + member.getName() + "\n" +
                        "SSN: " + member.getSsn() + "\n"
        );
        for (Boat b : member.getBoats()) { System.out.println(b); }
        waitForBackToMenu();
    }


    public void displayMenu(MenuOptions[] options) {
        for (int i = 0; i < options.length; i++) {
            System.out.println(i+1 + ": " + options[i].toString());
        }
    }

    public void showLists() {
        System.out.println("Select display format - Compact or Verbose (1/2):");
        System.out.println("1. Compact\n" +
                "2. Verbose");
    }

    public BoatType getBoatType() {
        System.out.println("Select type of boat to add:");
        BoatType[] types = BoatType.values();

        for (int i = 0; i < types.length; i++) {
            System.out.println(i + ": " + types[i].toString() );
        }
        int choice = input.promptNumericInput();

        if (choice < 0 || choice > BoatType.values().length - 1) {
            System.out.println("You selected an invalid option. Try again.");
            return getBoatType();
        }

        return types[choice];
    }

    public int getBoatLength () {
        System.out.println("Enter length of boat, in feet: ");
        return input.promptNumericInput();
    }

    public void showSuccess () {
        System.out.println("Success!");
        waitForBackToMenu();
    }

    public void showFailure () {
        System.out.println("Failure.");
        waitForBackToMenu();
    }

    public void showFailure (String message) {
        System.out.println("Failure: " + message);
        waitForBackToMenu();
    }


    public void showNotFound () {
        System.out.println("Nothing found.");
        waitForBackToMenu();
    }

    public String getFirstName () {
        System.out.println("Enter first name:");
        return input.promptStringInput(".*\\d.*");
    }

    public String getLastName () {
        System.out.println("Enter last name:");
        return input.promptStringInput(".*\\d.*");
    }

    public String getSSN () {
        System.out.println("Enter SSN, only numbers:");
        return Double.toString(input.promptDoubleNumericInput());
    }
}
