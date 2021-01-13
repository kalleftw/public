package count_word;

public class Word implements Comparable<Word> {
    private String word;

    /**
     * Force the words to be lower case
     *
     * @param str input
     */
    public Word(String str) {
        this.word = str;
    }

    /**
     * Prints the word
     *
     * @return
     */
    public String toString() {
        return word;
    }

    /**
     * Creates a hashCode-value for the word
     *
     * @return the words hashcode
     */
    /* Override Object methods */
    public int hashCode() {
        return this.word.toLowerCase().hashCode();
    }

    /**
     * Compares the words hashcode with the objects hashcode
     *
     * @param other input
     * @return true if equal
     */
    public boolean equals(Object other) {
        if (other instanceof Word)
            return hashCode() == other.hashCode();
         else
            return false;
        }



        /* Implement Comparable */

        public int compareTo (Word w){
            return this.word.compareToIgnoreCase(w.word);
        }
    }

