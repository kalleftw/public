import view.View;

public class Main {
    public static void main(String[] args) {
        View view = new View();
        String dbFileName = "db";
        new Console(view, dbFileName).run();
    }
}
