package exercise7;

import java.util.Comparator;
import java.util.Random;

public class insertStringSort {
    public static int warmupCounter = 0;
    public static long total = 0;
    public static int counter = 0;
    public static int sum = 0;



    public static void main(String[] args) {
        System.out.println("Initiating experiment: InsertSortString");

        long longArray[] = new long[10];

        Comparator<String> comp = String.CASE_INSENSITIVE_ORDER;
        int length = 1057; // arr length


        String[] insertionArr = randomStringArray(length); // populate array

        // warmup
        for (int j = 0; j < 5; j++) {
            insertionSort(insertionArr, comp); // make computation
            warmupCounter++;
            System.out.println("Warmup: " + warmupCounter);
            insertionArr = randomStringArray(length); // populate new array
        }

        System.out.println();


        //running 10 times,

        /*
        Loop 10 times to get avarage
         */
        for (int i = 0; i < 10; i++) {
            System.gc(); // garbage collection
            insertionArr = randomStringArray(length); // populate new array
            long start = System.currentTimeMillis(); // start timer
            insertionSort(insertionArr, comp); // make computaion
            longArray[i] = System.currentTimeMillis() - start; // stop timer and add to array
            insertionArr = randomStringArray(length); // repop array

        }

        for (int i = 0; i < longArray.length; i++) {
            System.out.println(++counter + " processed. Time taken: " + longArray[i]);
        }
        /*
        Sum of all computations
         */
        for (long a : longArray)
            total = total + a;

        // nice presentation
        System.out.println("Avarage Time taken: " + (total / 10) + " in milliseconds");
        System.out.println("Number of strings sorted in each array: " + (insertionArr.length));


    }


    /**
     * Sort algo
     *
     * @param in string array to be sorted
     * @param c  comparator
     * @return sorted string
     */
    public static String[] insertionSort(String[] in, Comparator<String> c) {
        String[] input = in.clone(); // New array with the same size as the original.
        for (int i = 1; i < in.length; i++) { // Iterate over the original array size.
            for (int j = i - 1; j >= 0; j--) {
                /*
                    Pretty much the same, however, the comparator will return a value, checking the int value of the letter
                    To sort the values, instead of the actual letters
                     */
                if (c.compare(in[j], in[i]) > 0) {
                    /*
                    Same principle as int insertion
                     */
                    String temp = in[i];
                    in[i] = in[j];
                    in[j] = temp;
                    i = j;
                }

            }
        }
        return input;
    }

    /**
     * Help method
     *
     * @param length length of array
     * @return new array with 10letter strings
     */
    private static String[] randomStringArray(int length) {
        String[] arr = new String[length];
        Random r = new Random();
        for (int j = 0; j < arr.length; j++) {
            String cToStr = "";
            for (int i = 0; i < 10; i++) {
                char c = (char) (r.nextInt(26) + 'a');
                cToStr = cToStr + c;
            }
            arr[j] = cToStr;
        }
        return arr;
    }

}

