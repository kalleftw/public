package exercise6;

public class shortString {
    public static long total = 0;
    public static int concats = 0;
    public static String str = "";


    public static void main(String[] args) {
        System.out.println("Initiating experiment: Short String");

        long longArray[] = new long[10];

        int counter = 0;
        for (int j = 0; j < 10; j++) {
            str = "";
            concats = 0;
            long start = System.currentTimeMillis();
            for (int i = 0; i < 147300; i++) {
                concats++;
                str = str + "A";
            }
            longArray[j] = System.currentTimeMillis() - start; // end time
        }


        for (int i = 0; i < longArray.length; i++) {
            System.out.println(++counter + " processed. Time taken: " + longArray[i]);
        }
        for (long a : longArray)
            total = total + a;

        // printing
        System.out.println("Avarage Time taken: " + (total / 10) + " in milliseconds");
        System.out.println("Number of concatenations: " + concats);
        System.out.println("String length: " + str.length());

    }

}
