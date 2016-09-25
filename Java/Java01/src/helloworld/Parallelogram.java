package helloworld;

/**
 * Created by pc on 2016/9/23.
 */
public class Parallelogram extends Quadrangle{
    public static void main(String[] a){
        Parallelogram p = new Parallelogram();
        draw(p);
        Quadrangle q = new Quadrangle();
        draw(q);
        if(q instanceof Parallelogram){
            System.out.println("dd");
            Parallelogram  c = (Parallelogram)q;

        }
        System.out.println(p instanceof Parallelogram);
        // ?
        System.out.println(q instanceof Parallelogram);

    }
}
