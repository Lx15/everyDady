1. 左侧固定右侧自适应

    .left{
       width:200px;
       float:left;
    }
    .right{
      margin-left:200px;
    }

2. 右侧固定左侧自适应

    .left{
        margin-right:200px;
    }
    .right{
      position:absolute;
      top:0;
      right:0;
      width:200px;
    }

3. 清除浮动

    .clearfix{
      &:after{
        content: "";
        display: block;
        visibility: hidden;
        height: 0;
        clear: both;
      }
    }

4. 首字母大写 :first-letter{ font-size:22px;}
   font: 多个属性一起使用是有顺序的。
   字体倾斜：font-style:italic; 对于没有斜体变量的特殊字体应使用 oblique;
