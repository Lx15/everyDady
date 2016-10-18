package com.lx;

/**
 * Created by pc on 2016/10/17.
 */
public class Solution {
    public int removeDuplicates(int[] nums) {
         int l= nums.length;
        if(l==0){
            return 0;
        }
        int j=0;
        for(int i=1;i<l;i++){
            if(nums[j]!=nums[i]){
                nums[++j]= nums[i];
            }
        }
        return j+1;
    }
}
