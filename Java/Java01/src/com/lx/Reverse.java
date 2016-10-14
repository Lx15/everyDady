package com.lx;
import java.lang.Math;

/**
 * Created by pc on 2016/10/7.
 */
public class Reverse {
    public String intToRoman(int num) {
      String arr[][]={{"","I","II","III","IV","V","VI","VII","VIII","IX"},//个
              {"","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"},//十
              {"","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"},//百
              {"","M","MM","MMM"}};
            int th= (int)Math.floor(num/1000) ;
    int hu=  (int)Math.floor((num-th*1000)/100);
   int ten = (int)Math.floor((num- th*1000-hu*100)/10);
    int seve= num-th*1000-hu*100-ten*10;
        StringBuilder s= new StringBuilder("");
        s.append(arr[3][th]);
        s.append(arr[2][hu]);
        s.append(arr[1][ten]);
        s.append(arr[0][seve]);
        return s.toString();
    }

  public static void main(String a[]){
      Reverse re = new Reverse();
      String val =re.intToRoman(1000);
      System.out.println(val);

  }
}
