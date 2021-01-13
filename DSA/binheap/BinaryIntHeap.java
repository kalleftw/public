package binheap;

/**
 * Max Heap
 * Parents are always greater than the children,
 * Credit goes to:
 *  Sarah Ettritch: author/creator of the Udemy course "Data Structures and Algorithms Deep Dive Using Java".
 *  Specific episodes used: Lesson 102 - Lesson 106
 *
 *  More credits:
 *  https://www.geeksforgeeks.org/binary-heap/
 */
public class BinaryIntHeap {
    private int[] heap;
    private int size;
    int capacity = 50;


    /**
     * Constructor
     */
    public BinaryIntHeap() { // Constructs an empty heap
        heap = new int[capacity];
    }


    /**
     * Adds the int into the array
     *
     * @param n the item to be inserted
     * @throws IndexOutOfBoundsException if heap is full
     */
    public void insert(int n) { // Add n to heap
        if (isFull()) {
            throw new IndexOutOfBoundsException("Heap is full");
        }

        //put the new item at the first available spot
        heap[size] = n;


        // Runs method fixHeapAbove and increments size
        percolateUp(size);
        size++;

    }

    /**
     * Method which takes the root number, shows us it and deletes it
     * @return the deleted value
     */
    public int pullHighest() {  // Return and remove element with highest priority
        if (isEmpty()) {
            throw new IndexOutOfBoundsException("Heap is empty");
        }

        // since this is supposed to only work with top prio, heap[0] will be removed
        int deletedValue = heap[0];
        heap[0] = heap[size - 1]; // new heap root


        // Runs method fixHeapBelow and decrements size
        percolateDown(0);
        size--;

        return deletedValue;
    }

    /**
     * Method which tells us the size
     * @return the size
     */
    public int size() {      // Current heap size
        return size;
    }

    /**
     * Method which tells us if it's empty
     * @return true if empty
     */
    public boolean isEmpty() { // True if heap is empty
        return size == 0;
    }

    /**
     * Size of the array/heap
     *
     * @return true or false
     */
    public boolean isFull() {
        return size == heap.length;
    }

    /**
     * Method which retrieves the parent in heap
     *
     * @param index index of that int
     * @return the parent of the int
     */
    public int getParent(int index) {
        return (index-1) / 2;
    }


    /**
     * Swapping method. Need to look UP the tree, comparing value to its parents
     *
     * @param index the value that was inserted
     */
    private void percolateUp(int index) {
        int newValue = heap[index];
        // if index = 0, we hit the root, comparing value against the value of its parent
        // calling getParent() to get the index of the parent
        // if new value has a greater value than the parents value, we'll swap them
        while (index > 0 && newValue > heap[getParent(index)]) {
            heap[index] = heap[getParent(index)];
            index = getParent(index);
        }
        // after loop is done, assigning the newValue to heap(index)
        heap[index] = newValue;
    }

    /**
     * Compare node at index with its two children
     * Swap them if necessary, if value on heap index is less than either of its children,
     * It will be swapped with the child with the greatest child
     * @param index of the deleted item
     */
    private void percolateDown(int index) {
        int childToSwap;

        // while index is not the last index
        while (index <= size-1) {
            /*
            Assign these variables values if left or right
             */
            int leftChild = getChild(index, true);
            int rightChild = getChild(index, false);

            if (leftChild <= size-1) { // if node has a left child
                if (rightChild > size-1) {  // if rightChild is greater than size-1, it does not have a right child
                    childToSwap = leftChild; // therefor childtoswap is leftchild
                } else { // if we have a right child
                    //child to swap = index of the greatest value
                    childToSwap = (heap[leftChild] > heap[rightChild] ? leftChild : rightChild); // if leftchild is greater than rightchild, then swap with left  child
                }
                /*
                Compare value in heap[index] with the value of childToSwap
                If value in index, we break
                Only swap if index is less than child
                 */
                if (heap[index] < heap[childToSwap]) { // if true, swap with largest child
                    int tmp = heap[index];
                    heap[index] = heap[childToSwap];
                    heap[childToSwap] = tmp;
                } else {
                    break;
                }

                index = childToSwap; // swap complete
            } else { // if not, just exit the loop
                break;
            }
        }
    }

    /**
     * Printing method
     */
    public void printHeap() {
        for (int i = 0; i < size; i++) {
            System.out.print(heap[i]);
            System.out.print(", ");

        }
    }

    /**
     * Method which will retrieve the child of the element in the heap
     *
     * @param index the parent
     * @param left  left or right child
     * @return left or right child, if left: 2*index+1, if right: 2*index+2
     */
    public int getChild(int index, boolean left) {
        return 2 * index + (left ? 1 : 2);
    }

    public static void main(String[] args) {
        BinaryIntHeap heap = new BinaryIntHeap();
        System.out.println("Binary heap:");
        heap.insert(52);
        heap.insert(46);
        heap.insert(24);
        heap.insert(16); // 3 , 3/2 = 1
        heap.insert(13);
        heap.insert(6); // 5, parent = 5 / 2 = 2
        heap.insert(15);
        heap.insert(7);

        System.out.println("Full heap:");
        heap.printHeap();
        System.out.println("Size of heap: " + heap.size());
        System.out.println();
        System.out.println("Expected left child of 4: 9");
        System.out.println("Child: " + heap.getChild(4, true));
        System.out.println();
        System.out.println("Expected right child of 4: 10");
        System.out.println("Child: " + heap.getChild(4, false));
        System.out.println();
        System.out.println("Expected parent: 2" );
        System.out.println("Actual parent: " + heap.getParent(5));
        System.out.println();
        System.out.println("pullHighest: " + heap.pullHighest());
        System.out.println();
        System.out.println("Heap after pull: ");
        heap.printHeap();
        System.out.println();
        System.out.println("Size of heap:");
        System.out.println(heap.size());
    }
}
