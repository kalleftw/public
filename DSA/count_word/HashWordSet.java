package count_word;

import java.util.Iterator;

public class HashWordSet implements WordSet {


    private int sz; // Current size
    private Node[] buckets = new Node[8];

    /**
     * Method which tries to add a word to the bucket
     * @param word to be added
     */
    @Override
    public void add(Word word) {
        int pos = getBucketNumber(word);
        Node node = buckets[pos]; // First node in list
        while (node != null) { // Search list
            if (node.value.equals(word))
                return; // Element found ==> return
            else
                node = node.next; // Next node in list
        }
        node = new Node(word); // Not found, add new node as first entry
        node.next = buckets[pos];
        buckets[pos] = node;
        sz++;
        if (sz == buckets.length) rehash(); // Rehash if needed
    }

    /**
     * Method which checks if the word is in the bucket or not
     * @param word to be checked
     * @return true if it is, false if it's not
     */
    @Override
    public boolean contains(Word word) {
        int pos = getBucketNumber(word);
        Node node = buckets[pos];
        while (node != null) { // Search list for element
            if (node.value.equals(word))
                return true; // Found!
            else
                node = node.next;
        }
        return false; // Not found
    }

    /**
     * Method which checks to size
     * @return the size
     */
    @Override
    public int size() {
        return sz;
    }

    /**
     * Iterator which iterates until index < size
     * @return index
     */
    @Override
    public Iterator<Word> iterator() {
        return new Iterator() {
            int index = 0;

            @Override
            public boolean hasNext() {
                return index < sz;
            }

            @Override
            public Object next() {
                while (buckets[index] == null) {
                    index++;
                }
                return buckets[index++];
            }
        };
    }

    /**
     * Method which retrieves the place of the word in the bucket
     * @param word the word
     * @return it's hashed pos
     */
    private int getBucketNumber(Word word) {
        int hc = word.hashCode();
        if (hc < 0) hc = -hc;
        return hc % buckets.length;
    }

    /**
     * Method which creates a larger node array if needed
     */
    private void rehash() {
        Node[] temp = buckets;
        buckets = new Node[3 * temp.length];
        sz = 0;
        for (Node n : temp) { // Insert old values into new buckets
            if (n == null) continue; // Empty bucket
            while (n != null) {
                add(n.value); // Add elements again
                n = n.next;
            }
        }
    }

    /**
     * Private node class
     */
    private class Node { // Private inner classes
        Word value;
        Node next = null;

        public Node(Word word) {
            value = word;
        }

        public String toString() {
            return value.toString();
        }
    }


}

