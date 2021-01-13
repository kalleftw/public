package exercise7;

import java.util.Random;

public class insertSort {
    public static long total = 0;
    public static int counter = 0;
    public static int sum = 0;
    public static int warmupCounter = 0;

    public static void main(String[] args) {
        System.out.println("Initiating experiment: InsertSort");

        long longArray[] = new long[10];

        int length = 69799; // length of array
        int fillArray = length * 2; // number of elements that _CAN_ be added to the array, l*2 to avoid dupes
        int[] insertionArr = fillArray(length, fillArray); // new array

        /*
        Warmup
         */
        for (int j = 0; j < 5; j++) {
            insertionSort(insertionArr); // execute
            warmupCounter++;
            System.out.println("Warmup! " + warmupCounter);
            insertionArr = fillArray(length, fillArray); // new array
        }
        System.out.println();

        insertionArr = fillArray(length, fillArray); // new array
        /*
        Loop 10 times to get avarage
         */
        for (int i = 0; i < 10; i++) {
            System.gc();
            long start = System.currentTimeMillis();
            insertionSort(insertionArr); // make computation
            longArray[i] = System.currentTimeMillis() - start; // save time
            insertionArr = fillArray(length, fillArray); // new array for next iteration
        }

        for (int i = 0; i < longArray.length; i++) {
            System.out.println(++counter + " processed. Time taken: " + longArray[i]);
        }

        /*
        Sum of time
         */
        for (long a : longArray)
            total = total + a;


        //presentation
        System.out.println("Avarage Time taken: " + (total / 10) + " in milliseconds");
        System.out.println("Number of ints sorted in each array: " + (insertionArr.length));



    }

    public static int[] insertionSort(int[] in) {
        int[] input = in.clone(); // New array with the same size as the original.

        int temp;
        for (int i = 1; i < input.length; i++) { // Iterate over the  array size
            for (int j = i; j > 0; j--) { // Iterate over the array size, but from i and decrement
                if (input[j] < input[j - 1]) { // [3, 2, 1] -> If 2 is less than 3, perform swap below
                    temp = input[j]; // temp = input[j], 3
                    input[j] = input[j - 1]; // input[j] = input[j+1] = 2, basically SWAPPING 3 with 2
                    input[j - 1] = temp; //2 = temp, to finalize the swap
                }
            }
        }
        return input;
    }

    private static int[] fillArray(int length, int n) {
        Random ran = new Random();
        int[] arr = new int[length];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = ran.nextInt(n);
        }
        return arr;
    }
}

