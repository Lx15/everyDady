package helloworld;

/**
 * Created by pc on 2016/9/21.
 */
public class SubParent extends Parent{
    SubParent(){
        super("a");
        System.out.println("subpartent的构造函数");
    }
  public static void main(String[] args){
      SubParent s = new SubParent();
  }
}
