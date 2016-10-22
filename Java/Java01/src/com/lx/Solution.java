package com.lx;

import java.util.List;

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
//    public ListNode deleteDuplicates(ListNode head) {
//        if (head == null) {
//            return null;
//        }
//
//        ListNode node = head;
//        while (node.next != null) {
//            if (node.val == node.next.val) {
//                node.next = node.next.next;
//            } else {
//                node = node.next;
//            }
//        }
//        return head;
//    }
    public ListNode deleteDuplicates(ListNode head) {
        if(head == null){
            return  null;
        }
       ListNode endPointer = head.next;
        ListNode headPointer = head ;
        while (endPointer!=null){
            if(headPointer.val != endPointer.val){
                headPointer.next = endPointer;
                headPointer = headPointer.next;
            }

            endPointer = endPointer.next;
            if(endPointer ==null){
                headPointer.next = null;
            }
        }
        return head;
    }
//    public ListNode removeElements(ListNode head, int val) {
//        if (head == null){
//            return null;
//        }
//        ListNode node = head;
//        ListNode headPointer = null;
//        while(node!= null){
//            if(node.val != val){
//                if(headPointer ==null) {
//                    headPointer = node;
//                }else{
//                    headPointer.next = node;
//                    headPointer = headPointer.next;
//                }
//            }
//                node = node.next;
//            if(node == null){
//                if(headPointer == null){
//                    return null;
//                }else{
//                    headPointer.next = null;
//                }
//            }
//        }
//        return headPointer ;
//    }
    public ListNode removeElements(ListNode head, int val) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        head = dummy;

        while (head.next != null) {
            if (head.next.val == val) {
                head.next = head.next.next;
            } else {
                head = head.next;
            }
        }

        return dummy.next;
    }
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode zeroNode = new ListNode(0);
        ListNode prePointer = zeroNode;
        zeroNode.next = head;
        if(head == null){
            return null;
        }
        if(n<0){
            return null;
        }
        for(int i=0;i<n;i++){
            if(head ==null){
                return null;
            }
            head = head.next;
        }
        while(head!=null){
            head = head.next;
            prePointer = prePointer.next;
        }
        prePointer.next = prePointer.next.next;
        return zeroNode.next;
    }
    public  static void main(String args[]){
        ListNode n1 = new ListNode(1);
        ListNode n2 = new ListNode(1);
//        ListNode n3 = new ListNode(2);
//        ListNode n4 = new ListNode (3);
        n1.next = n2;
//        n2.next = n3;
//        n3.next = n4;
        Solution s = new Solution();
        ListNode head = s.removeElements(n1, 2);
        while(head!=null){
            System.out.println(head.val);
            head = head.next;
        }
//        ListNode head2 = s.removeElements(n1,2);
//        while(head2 !=null){
//            System.out.println(head2.val);
//            head2 = head2.next;
//        }
    }
}
