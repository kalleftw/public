package exercise6;

public class longString {
    public static long total = 0;
    public static int concats;
    public static String str = "";

    public static void main(String[] args) {
        System.out.println("Initiating experiment: Long String");
        long longArray[] = new long[10];

        int counter = 0;
        // loop 10 times to get an avarage
        for (int j = 0; j < 10; j++) {

            str = "";
            concats = 0;
            System.gc();
            // loop 13752 times
            long start = System.currentTimeMillis(); // start timer
            for (int i = 0; i < 13752; i++) {
                str = str + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                concats++;
            }
            longArray[j] = System.currentTimeMillis() - start; // end time
        }

        // prints for each iteration
        for (int i = 0; i < longArray.length; i++) {
            System.out.println(++counter + " processed. Time taken: " + longArray[i]);
        }
        // sum time
        for (long a : longArray)
            total = total + a;

        // prints
        System.out.println("Avarage Time taken: " + (total / 10) + " in milliseconds");
        System.out.println("Number of concatenations: " + concats);
        System.out.println("String length: " + str.length());

    }
}
