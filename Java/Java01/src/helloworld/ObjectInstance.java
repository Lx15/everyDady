package helloworld;

/**
 * Created by pc on 2016/9/23.
 */
public class ObjectInstance {
    public ObjectInstance(){
        System.out.println("构造函数");
    }
    //为什么能运行？
    public String toString(){
        return "in "+getClass()+"类中重写toString()方法";
    }
    public String show(){
        return "lalal ";
    }
    public static void main(String[] a){

           System.out.println(new ObjectInstance());
    }
}
