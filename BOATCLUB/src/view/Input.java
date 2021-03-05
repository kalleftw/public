package view;
import java.util.Scanner;

public class Input {
    final Scanner scan;

    public Input () {
        scan = new Scanner(System.in);
    }

    public String promptStringInput (String regexPattern) {
        String input = scan.next();
        if (input.matches(regexPattern)) {
            throw new IllegalArgumentException("Must be a number");
        }
        return input;
    }

    public int promptNumericInput () {
        String choice = scan.next();
        if (!choice.matches("[0-9]+")) {
            throw new IllegalArgumentException("Must be a number");
        }
        return Integer.parseInt(choice);
    }

    public double promptDoubleNumericInput () {
        String choice = scan.next();
        if (!choice.matches("[0-9]+")) {
            throw new IllegalArgumentException("Must be a number");
        }
        return Double.parseDouble(choice);
    }

}
