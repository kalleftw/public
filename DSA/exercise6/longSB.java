package exercise6;

public class longSB {
    public static StringBuilder sb = new StringBuilder();
    public static int concats;
    public static long total = 0;
    public static int counter = 0;
    public static String text = "";


    public static void main(String[] args) {
        System.out.println("Initiating experiment: Long StringBuilder");


        long longArray[] = new long[10];

        /*
        Iterates 10 times to get a fair average
         */
        for (int j = 0; j < 10; j++) {

            /*
            Looping through 23100000 times
             */
            concats = 0;
            text = "";
            System.gc();
            long start = System.currentTimeMillis();
            for (int i = 0; i < 23100000; i++) {
                sb.append("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
                concats++;
            }
            text = sb.toString();
            // Array index[j] holding time
            longArray[j] = System.currentTimeMillis() - start;
            sb = new StringBuilder(); // new sb each iteration
        }
        for (int i = 0; i < longArray.length; i++) {
            System.out.println(++counter + " processed. Time taken: " + longArray[i]);
        }
        /*
        Total time
         */
        for (long a : longArray)
            total = total + a;

        // Presentation

        System.out.println("Average Time taken: " + (total / 10) + " in milliseconds");
        System.out.println("Number of concatinations: " + concats);
        System.out.println("String length: " + text.length());

    }



}

// Long StringBuilder appends.






