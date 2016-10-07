package com.lx;

/**
 * Created by pc on 2016/10/2.
 */
public class Outclass {
    innerClass in = new innerClass();
    public  void ouf(){
        in.inf();
    }
    class innerClass{
        innerClass(){

        }
        public void inf(){
            System.out.println("ddd");

        }
        int y=0;
    }
    public innerClass doit(){
        in.y = 4;
        return new innerClass();
    }
    public static void main(String args[]){
        Outclass out = new Outclass();
        Outclass.innerClass in =  out.doit();
        Outclass.innerClass in2 = out.new innerClass();
    }
}
