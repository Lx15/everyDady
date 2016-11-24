package com.lx;


import sun.reflect.generics.tree.Tree;

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
    //是否是平衡二叉树
    public int getMaxDepth(TreeNode root){
        if(root == null){
            return 0;
        }
        if(root.left == null && root.right ==null){
            return 1;
        }
        return  Math.max(getMaxDepth(root.left),getMaxDepth(root.right))+1;
    }
    public boolean isBalanced(TreeNode root) {
        if(root ==null){
            return true;
        }
        int left = getMaxDepth(root.left);
        int right = getMaxDepth(root.right);
        if(Math.abs(left-right)>=2){
            return false;
        }
        return isBalanced(root.left)&&isBalanced(root.right);
    }
    // 反转二叉树的左右子树
    public void exchange(TreeNode root){
        TreeNode temp =null;
        temp = root.left;
        root.left = root.right;
        root.right = temp;
    }
    public TreeNode invertTree(TreeNode root) {
      if(root == null){
          return root;
      }
        exchange( root);
        invertTree(root.left);
        invertTree(root.right);

        return  root;
    }
    // 打印 从根到叶子的所有路径
    public void createStr(TreeNode root,String path,List<String> paths){
        if(root == null){
            return ;
        }
        if(root.left == null && root.right == null){
            paths.add(path );
            return ;
        }
        if(root.left != null){
            createStr(root.left,path+"->"+String.valueOf(root.left.val),paths);
        }
        if(root.right !=null){
            createStr(root.right,path+"->"+String.valueOf(root.right.val),paths);
        }

    }
    public List<String> binaryTreePaths(TreeNode root) {
        List<String> result = new ArrayList<String>();
        if(root == null){
            return result;
        }
       createStr(root,String.valueOf(root.val),result);
        return result;
    }
    // 是否是相同的二叉树
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if(p == null && q== null){
            return true;
        }
        if(p == null || q== null || p.val != q.val){
            return false;
        }
        return isSameTree(p.left,q.left)&&isSameTree(p.right,q.right);
    }
    // 对称树
    public boolean compareTree(TreeNode left ,TreeNode right){
        if(left == null && right == null){
            return true;
        }
        if(left == null || right == null || left.val != right.val){
            return false;
        }
        return compareTree(left.left,right.right)&&compareTree(left.right,right.left);
    }
    public boolean isSymmetric(TreeNode root) {
      if(root == null){
          return true;
      }
        return  compareTree(root.left,root.right);
    }
    // BST 找到公共的祖先
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if(root == null){
            return null;
        }
        if(root.val >p.val && root.val< q.val){
            return root;
        }
        if(root.val>p.val && root.val >q.val){
            return lowestCommonAncestor(root.left,p,q);
        }
        if(root.val<p.val && root.val<q.val){
            return lowestCommonAncestor(root.right,p,q);
        }
        return root;
    }
    // 迭代二叉树后序遍历
    public List<Integer> postorderTraversal(TreeNode root) {
      ArrayList<Integer> re = new ArrayList<Integer>();
        if(root == null){
            return re;
        }
      Stack<TreeNode> sta = new Stack<TreeNode>();
        sta.push(root);
        re.add(root.val);
        TreeNode ele = root;
        while(!sta.empty()){
            ele = sta.peek();
            if(ele.left !=null){
                sta.add(ele.left);
                ele.left = null;
            }else if(ele.right != null){
                sta.add(ele.right);
                ele.right = null;
            }else{
                sta.pop();
                re.add(ele.val);
            }
        }
       return re;
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