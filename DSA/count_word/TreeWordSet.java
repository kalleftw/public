package count_word;

import java.util.Iterator;
import java.util.Stack;

public class TreeWordSet implements WordSet {
    int size = 0;
    BST root = null;

    /**
     * Method which adds the word, if the root of the BST is empty,
     * If word is there, do nothing
     * @param word the word to be added
     */
    @Override
    public void add(Word word) {
        if (root == null) {
            root = new BST(word);
            size++;
        } else {
            if (contains(word)) {
                return;
            }
            root.add(word);
            size++;
        }
    }


    /**
     * Checks if root contains word
     * @param word the word to be checked
     * @return true or false
     */
    @Override
    public boolean contains(Word word) {
        return root.contains(word);
    }

    /**
     * Method which returns size
     * @return
     */
    @Override
    public int size() {
        return size;
    }

    /**
     * Iterator,
     * @return iterator of root
     */
    @Override
    public Iterator<Word> iterator() {
        return new TreeIterator(root);
    }

    /**
     * Private class that contains methods
     */
    private class BST { // private inner class
        Word value;
        BST left = null, right = null;

        BST(Word word) {
            value = word;
        }


        /**
         * Method which adds a word to the tree,
         * If one part is empty, create a new
         * Else add the word
         * @param word
         */
        void add(Word word) { // recursive add
            if (word.compareTo(value) < 0) { // add to left branch
                if (left == null)
                    left = new BST(word);
                else
                    left.add(word); // Recursive call
            } else if (word.compareTo(value) > 0) { // add to right branch
                if (right == null)
                    right = new BST(word);
                else
                    right.add(word); // Recursive call
            }
        }

        /**
         * Method which checks if the word is present in the BST
         * @param word the word to be checked
         * @return the word
         */
        public boolean contains(Word word) {
            if (word.compareTo(value) < 0) {
                if (left == null) {
                    return false;
                } else {
                    return left.contains(word);
                }
            } else if (word.compareTo(value) > 0) {
                if (right == null) {
                    return false;
                } else {
                    return right.contains(word);
                }
            }
            return true;
        }
    }

    /**
     * Simple toString
     * @return toString
     */
    public String toString() {
        return root.toString();
    }


    /**
     * Alot of inspiration taken from:
     * https://stackoverflow.com/questions/4581576/implementing-an-iterator-over-a-binary-search-tree/17959135#17959135
     */

    private class TreeIterator implements Iterator {
        private Stack<BST> stackTree = new Stack<>();
        private BST current;

        private TreeIterator(BST root) {
            current = root;
        }

        @Override
        public boolean hasNext() {
            return (!stackTree.isEmpty() || current != null);
        }

        @Override
        public Word next() {
            while (current != null) {
                stackTree.push(current);
                current = current.left;
            }

            current = stackTree.pop();
            BST node = current;
            current = current.right;

            return node.value;
        }
    }


}


