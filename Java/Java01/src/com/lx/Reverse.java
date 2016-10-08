package com.lx;

/**
 * Created by pc on 2016/10/7.
 */
public class Reverse {
    public boolean reverse(int x) {
        if(x<0){
            return false;
        }
        String s = Integer.toString(x);
        char[] str=s.toCharArray();
        for(int i=0;i<str.length/2;i++){
            if(str[i]!=str[str.length-i-1]){
                return false;
            }
            if(str[i]<'0'|| str[i]>'9'){
                return false;
            }
            if(str[str.length-i-1]<'0'||str[str.length-i-1]>'9'){
                return false;
            }
        }
        return true;
    }

  public static void main(String a[]){
      Reverse re = new Reverse();

  }
}
