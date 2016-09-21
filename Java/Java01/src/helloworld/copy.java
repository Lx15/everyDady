package helloworld;

import java.util.Arrays;

/**
 * Created by pc on 2016/9/17.
 */
public class copy {
    public  static  void  main(String[] args){
        int arr[] = new int[]{23,42,12};
        int newarr[] = Arrays.copyOf(arr, 5);
        for(int i=0;i<newarr.length;i++){
            System.out.println(newarr[i]);
        }
         newarr = Arrays.copyOfRange(arr, 0,1);
        for(int i=0;i<newarr.length;i++){
            System.out.println(newarr[i]);
        }
    }
}
