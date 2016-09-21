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