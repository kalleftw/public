package count_word;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Iterator;
import java.util.Scanner;

public class WordCount2Main {
    public static StringBuilder sb = new StringBuilder();

    public static void main(String[] args) throws FileNotFoundException {
        String word = words("C:\\Users\\Kalle\\Desktop\\Skola\\java_courses\\1DV507\\src_ass-4\\count_word\\HistoryOfProgramming.txt");
        //        String word = words("./HistoryOfProgramming.txt");
        HashWordSet hash = new HashWordSet();
        TreeWordSet tSet = new TreeWordSet();
        String[] split = word.split("[\\s]+");

        for (String s : split) {

            hash.add(new Word(s));
            tSet.add(new Word(s));
        }

        System.out.println("HashSet size: " + hash.size());
        System.out.println("TreeSet size: " + tSet.size());

        Iterator<Word> IT = tSet.iterator();
        while (IT.hasNext()){
            System.out.println(IT.next().toString());
        }

    }

    public static String words (String path) {
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
        return sb.toString();
    }
}
