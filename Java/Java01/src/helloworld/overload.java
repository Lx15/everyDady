package helloworld;

/**
 * Created by pc on 2016/10/2.
 */
public class overload {
    public static int add(int... a){
        for(int i=1;i<a.length;i++){
            a[0] +=a[i];
        }
        return a[0];
    }
    public static void main (String[] args){
       int a = add( 1, 1, 2, 3);
        System.out.println(a);

    }
}
