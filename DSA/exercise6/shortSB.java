package exercise6;

public class shortSB {

    public static StringBuilder sb = new StringBuilder();

    public static Runtime runtime = Runtime.getRuntime();

    public static long concats = 0;
    public static long total = 0;
    public static int counter = 0;
    public static String text = "";

    public static void main(String[] args) {
        System.out.println("Initiating experiment: Short StringBuilder");

        long longArray[] = new long[10];


        // Loop 10 times, got get an avarage value

        for (int j = 0; j < 10; j++) {
            concats = 0;
            text = "";
            // start timer
            System.gc();
            long start = System.currentTimeMillis();

            // loop and append.
            for (int i = 0; i < 220000000; i++) {
                sb.append("a");
                concats++;
            }
            text = sb.toString();
            // stop time
            longArray[j] = System.currentTimeMillis() - start;
            sb = new StringBuilder();
        }
        // print each
        for (int i = 0; i < longArray.length; i++) {
            System.out.println(++counter + " processed. Time taken: " + longArray[i]);
        }

        //add time
        for (long a : longArray)
            total = total + a;


        System.out.println("Average Time taken: " + (total / 10) + " in milliseconds");
        System.out.println("Number of concatenations: " + concats);
        System.out.println("String length: " + text.length());

    }
}
