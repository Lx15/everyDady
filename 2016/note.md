1. sass 是Ruby语言写的，两者语法没有关系，但必须先装Ruby,然后再安装sass.
    gem install sass
2. 阴影：box-shadow:1px 1px 2px 1px #848484;
      border-radius:左 上 右  下 ;可用来画扇形；
3.  list-style-type:none;/*去掉列表前的点*/
4.  合并单元格 colspan="2"
5.   border-collapse: collapse;/*设置表格的边框被合并为一个单一的边框*/
6.                   <!--同一组的单选按钮，name 取值一定要一致，这样同一组的单选按钮才可以起到单选的作用。-->

 <!--value提交数据到服务器的值；checked默认被选中-->
    <div>
     <label class="tips">性别</label>
     <input type="radio" value="male" name="sex" checked="checked" />
        <label>男</label>
        <input type="radio" value="female" name="sex" />
        <label>女</label>
    </div>
7. border-radius :10px; 边框角度
8. 使用relative absolute 定位 不一定要用float;
9. gitnore 使用
    # 此为注释 – 将被 Git 忽略
    # 忽略所有 .a 结尾的文件
    *.a
    # 但 lib.a 除外
    !lib.a
    # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
    /TODO
    # 忽略 build/ 目录下的所有文件
    build/
    # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
    doc/*.txt
    # ignore all .txt files in the doc/ directory
    doc/**/*.txt

10.  margin :top, right, bottom, and left
11.  左右两侧固定，中间自适应 (浮动+ margin-left +margin-right 配合使用)
    .left
    .right
    .middle
left 左飘，right 右飘，middle 用margin-right,margin-left;

12. 清除浮动---1  <a href="http://zh.learnlayout.com/clearfix.html">浮动</a>
      子元素因为浮动使得子元素的高度大于父元素的高度，即造成父元素塌陷。

      方法一： 在父元素上添加
         .clear{
            overflow:auto;
            zoom:1;//兼容 IE6
         }
    清除浮动后原来在父容器上面添加的padding margin 对于子元素仍是适用的。
