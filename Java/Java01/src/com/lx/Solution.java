package com.lx;


import java.util.*;

public class Solution{
       //层序遍历1
        public List<List<Integer>> levelOrder1(TreeNode root) {
            if(root == null){
                return  new LinkedList<List<Integer>>();
            }
            List<List<Integer>> ret = new LinkedList<List<Integer>>();
            LinkedList<TreeNode> current = new LinkedList<TreeNode>();
            LinkedList<TreeNode> next = new LinkedList<TreeNode>();
            LinkedList<Integer> temp = new LinkedList<Integer>();
            current.add(root);

            while(!current.isEmpty()){
                TreeNode a = null;
                Iterator<TreeNode> it =current.iterator();
                a = it.next();
                temp.add(a.val);
                if(a.left !=null){
                    next.add(a.left);
                }
                if(a.right != null){
                    next.add(a.right);
                }
                current.remove(0);
                if(current.isEmpty()){
//                    current =  new LinkedList<TreeNode>(next);
                    current.addAll(next);// 复制过来
                    next.clear();
                    ret.add(new LinkedList<Integer>(temp));
                    temp.clear();
                }
            }
            return ret;
        }
    //层序遍历2
    public List<List<Integer>> levelOrder(TreeNode root) {
        ArrayList result = new ArrayList();

        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            ArrayList<Integer> level = new ArrayList<Integer>();
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode head = queue.poll();
                level.add(head.val);
                if (head.left != null) {
                    queue.offer(head.left);
                }
                if (head.right != null) {
                    queue.offer(head.right);
                }
            }
            result.add(level);
        }

        return result;
    }
    // 从底向上层序遍历
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        ArrayList result = new ArrayList();

        if (root == null) {
            return result;
        }
        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            ArrayList<Integer> level = new ArrayList<Integer>();
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode head = queue.poll();
                level.add(head.val);
                if (head.left != null) {
                    queue.offer(head.left);
                }
                if (head.right != null) {
                    queue.offer(head.right);
                }
            }
            result.add(level);
        }

      Collections.reverse(result);
        return result;

    }
    //二叉树的最大深度
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int left = maxDepth(root.left);
        int right = maxDepth(root.right);
        return Math.max(left, right) + 1;
    }
    //二叉树的最小深度
    public int minDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
     return getDepth(root);
    }
    public int getDepth(TreeNode root){
        if(root == null){
            return Integer.MAX_VALUE;
        }
        if(root.left ==null && root.right == null){
            return 1;
        }
        return Math.min(getDepth(root.left),getDepth(root.right))+1;
    }
    public static  void main(String[] args){
        TreeNode root = new TreeNode(3);
        TreeNode nine = new TreeNode(9);
        TreeNode twe =  new TreeNode(20);
        TreeNode fif = new TreeNode(15);
        TreeNode seven = new TreeNode(7);
        root.left = nine;
//        root.right = twe;
//        nine.left = null;
//        nine.right = null;
//        twe.left  = fif;
//        twe.right = seven;

        Solution s = new Solution();
        List<List<Integer>> re = s.levelOrderBottom(root);
        for(int i=0;i<re.size();i++){
            List<Integer> a = re.get(i);
            for(int value:a){
                System.out.println(value);
            }
        }
        Iterator it = re.iterator();
        int depth = s.minDepth(root);
         System.out.println(depth);
    }
}