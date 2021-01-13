package binheap;

import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

class BinaryIntHeapTest {
    BinaryIntHeap heap = new BinaryIntHeap();


    @Test
    void checkInstance() {
        assertTrue(heap instanceof BinaryIntHeap);
    }

    @Test
    void insert() {
        heap.insert(80);
        assertEquals(80, heap.pullHighest());
        heap.insert(75);
        heap.insert(87);
        assertEquals(87, heap.pullHighest());
        heap.insert(60);
        heap.insert(85645651);

        assertEquals(85645651, heap.pullHighest());


    }

    @Test
    void pullHighest() {
        heap.insert(75);
        assertEquals(75, heap.pullHighest());
        heap.insert(80);
        heap.insert(43);
        assertEquals(80, heap.pullHighest());

    }

    @Test
    void size() {
        heap.insert(80);
        heap.insert(43);
        int expected = 2;
        assertEquals(expected, heap.size());

    }

    @Test
    void isEmpty() {
        assertTrue(heap.isEmpty());
    }

    @Test
    void isFull() {
        for (int i = 0; i < 50; i++) {
            heap.insert(i);
        }
        assertTrue(heap.isFull());
    }

    @Test
    void getParent() {
        heap.insert(16);
        heap.insert(14);
        heap.insert(10);
        heap.insert(8); // 3 , 3/2 = 1
        heap.insert(7);
        heap.insert(9); // 5, parent = 5 / 2 = 2
        heap.insert(3);
        heap.insert(2);
        heap.insert(4);
        heap.insert(1);


        int expected = 4;
        assertEquals(expected, heap.getParent(9));
    }

    @Test
    void getChild() {
        heap.insert(11);
        heap.insert(10);
        heap.insert(7);
        heap.insert(9); // 3 , 3/2 = 1
        heap.insert(5);
        heap.insert(6); // 5, parent = 5 / 2 = 2
        heap.insert(4);
        heap.insert(8);
        heap.insert(2);
        heap.insert(3);
        heap.insert(1);

        int leftExpected = 9;
        assertEquals(leftExpected, heap.getChild(4, true));
        int rightExpected = 10;
        assertEquals(rightExpected, heap.getChild(4, false));
    }
}