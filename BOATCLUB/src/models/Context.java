package models;

/**
 * Context represents application state
 * that may need to be passed around
 */
public class Context {
    private int memberCount;

    /**
     * Constructor
     * @param a_memberCount the total amount of members registered
     */
    public Context (int a_memberCount) {
        memberCount = a_memberCount;
    }

    /**
     * Get member count
     * @return member count
     */
    public int getMemberCount() {
        return memberCount;
    }

    /**
     * Increment memberCount
     */
    public void incrementMemberCount() {
        this.memberCount++;
    }

    /**
     * Decrement member count
     */
    public void decrementMemberCount() {
        this.memberCount--;
    }

}
