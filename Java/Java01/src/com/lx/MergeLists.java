package com.lx;

/**
 * Created by pc on 2016/10/13.
 */
public class MergeLists {
    public ListNode mergeLists(ListNode l1 ,ListNode l2){
        ListNode lastnode = new ListNode(0);
        ListNode head = lastnode;
        while(l1!=null && l2!=null){
            if(l1.val<l2.val){
                lastnode.next = l1;
                l1 = l1.next;
            }else{
                lastnode.next = l2;
                l2 = l2.next;
            }
            lastnode = lastnode.next;
        }
        if(l1!=null){
            lastnode.next = l1;
        }
        if(l2!=null){
            lastnode.next = l2;
        }

        return head.next;
    }

    public  static  void main(String args[]){
        ListNode l1 = new ListNode(1);
        ListNode l2 = new ListNode(2);
        l1.next = l2;
        l2.next = null;
        ListNode l3 = new ListNode(3);
        ListNode l4 = new ListNode(4);
        l3.next = l4;
        l4.next = null;

        MergeLists melist = new MergeLists();
        ListNode  head = melist.mergeLists( l1, l3);
        while(head !=null){
             System.out.println(head.val);
            head = head.next;
        }
    }
}
