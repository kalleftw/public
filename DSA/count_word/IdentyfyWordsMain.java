package count_word;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.Scanner;

public class IdentyfyWordsMain {
    public static StringBuilder sb = new StringBuilder();


    public static void main(String[] args) throws FileNotFoundException {
        words("C:\\Users\\Kalle\\Desktop\\Skola\\java_courses\\1DV507\\src_ass-4\\count_word\\HistoryOfProgramming.txt");
        printWords();

    }

    /**
     * Method which reads from file
     * @param path the path of the file
     */
    public static void words (String path) {
        File file = new File(path);
        try {
            Scanner input = new Scanner(file);
            while (input.hasNextLine()) {
                String tempString = input.nextLine(); // temporary string which will be used to compare with rules


                    tempString = tempString.replaceAll("[^A-Za-z\\s]+", " ");

                    sb.append(tempString + System.lineSeparator());

            }
            input.close();

            // File not found
        } catch (FileNotFoundException e) {
            System.out.println("Seems like a file gone missing, check error message: " + e.getMessage());
            System.out.println();
            System.out.println("Printing stacktrace: ");
            e.printStackTrace();
        }
    }

    /**
     * Method which prints a new file
     * @throws FileNotFoundException
     */
    public static void printWords() throws FileNotFoundException {
        PrintWriter pw = new PrintWriter("C:\\Users\\Kalle\\Desktop\\Skola\\java_courses\\1DV507\\src_ass-4\\count_word\\words.txt");
        System.out.println(sb.length());

        pw.print(sb);
        pw.close();
    }

}
