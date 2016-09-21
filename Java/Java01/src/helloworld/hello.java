package helloworld;

import java.util.Date;

/**
 * Created by pc on 2016/9/12.
 */
public class hello {
    public static void main(String[] args){
        String  str,a ;
        str = "good" +
                "java";
        str = str.substring(3);
        System.out.println(str);
        Date date= new Date();
        String time = String.format("%te",date);
        System.out.println(time);
       a = String.format("c",date);
        System.out.println(a);
        AnyThing any = new AnyThing();


    }
    public void show(){
        System.out.println("xx");
    }
}
