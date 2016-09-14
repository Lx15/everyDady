### 居中问题 <a href="https://css-tricks.com/centering-css-complete-guide/#center-horizontally"></a>
#### 水平居中
##### 子元素是inline 或者 inline-* 元素
      在父元素上使用 text-align:center;
##### 子元素是block元素
      用margin:0 auto 外加 block 的宽度
##### 子元素是多个block 元素
      将子元素变成inline-block形式，并在父元素上使用text-align:center;

#### 垂直居中
##### 子元素是像text或links 的inline 或 inline-* 单个元素
     设置子元素的padding-top 与padding-bottom 
     若不能使用padding，可以在父元素上面使用
     {
        height：100;
        line-height:100px;
        white-space:nowrap;  
     }
     即使子元素的行高等于父元素的高度，这样自然就居中了。
##### 子元素是像text或links 的inline 或 inline-* 多行元素
    可以使用padding-top 或者padding-bootom但当元素在table cell 中时，是不管用的，这时可以用vertical-align.
    这里使用flex 也是很好的。关于flex，之后详细看看。
    当以上方法都不可用时，可以使用伪元素 
    父元素{
        relative
    }
    父元素 ::before{
        content:"",
        display:inline-block;
        height: 100%;
        width:1%;
        vertivcal-align:middle;
    }
    子元素{
        display:inline-block;
        vertical-align : middle;
    }
##### 子元素是一个块级元素
###### 知道子元素的高度
        父元素{
            position:relative;
        }
        子元素{
            position:absolute;
            top:50%;
            height:100px;
            padding:20px;
            margin-top：-70px;// 50+20  
        }
###### 不知道子元素的高度
      .parent{
        position:relative;
      }
      .child{
        position: absolute;
        top:50%;
        transform : translateY(-50%);
      } 
###### 使用flex
    .parent {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
#### 既有水平居中又有垂直居中
#####  子元素有固定的宽和高
      .parent{
        position:relative;
      }
    .child {
      width: 300px;
      height: 100px;
      padding: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -70px 0 0 -170px;
    }
##### 子元素有未知的宽和高
    .parent {
      position: relative;
    }
    .child {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
##### 使用flex 
    是时候好好学学使用flex了
    .parent {
      display: flex;
      justify-content: center;
      align-items: center;
    }
#### 总结
    GAME　OVER  !!!