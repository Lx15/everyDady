package helloworld;

/**
 * Created by pc on 2016/9/19.
 */
public class AnyThing {
    public AnyThing(){
        this("this 调用有参构造方法");
        System.out.println("无参构造方法");
    }
    public AnyThing(String name){
        System.out.println("hello this");
    }
}
