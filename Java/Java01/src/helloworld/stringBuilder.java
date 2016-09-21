package helloworld;

import javax.sound.midi.SysexMessage;

/**
 * Created by pc on 2016/9/17.
 */
public class stringBuilder {
    public static void main(String[] args){
        String str = "";
        long starTime  = System.currentTimeMillis();
        for(int i=0; i<100000;i++){
            str = str +i;
        }
        long endTime = System.currentTimeMillis();
        long time = endTime - starTime;
        System.out.println("String消耗时间："+time);
        StringBuilder  builder = new StringBuilder("");
        starTime = System.currentTimeMillis();
        for(int i=0;i<10000;i++){
            builder.append(i);
        }
        endTime = System.currentTimeMillis();
        time = endTime - starTime;
        System.out.println("builder 消耗时间:"+time);
    }
}
