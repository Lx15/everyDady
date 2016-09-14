1. 元素的id target.id

2. 元素的标签名 target.nodeName

3. 元素的兄弟元素节点 target.parentNode.children;

4.     
         function hasClass(element, className) {
                return (new RegExp('(\\s|^)' + className + '(\\s|$)')).test(element.className);
            }

            function addClass(element, newClassName) {
                if (!hasClass(element, newClassName)) {
                    element.className = element.className ? (element.className + " " + newClassName) : newClassName;
                }
            }

            function removeClass(element, oldClassName) {
                if (hasClass(element, oldClassName)) {
                    element.className = element.className.replace(new RegExp('(\\s|^)'+ oldClassName + '(\\s|$)'), " ").trim();
                }
            }

5. cursor:crosshair; 鼠标光标是十字;

6. label标签的用法：除了用for属性与指定的表单元素关联外，直接把表单元素包含在label里面也能实现关系。

7. 事件的套路。。事件代理是挂在祖先元素上时，监听鼠标移入移出子元素时只能用mouseover和mouseout事件了

8. 清除设置的属性   box.style.cssText =" ";

9. margin 折叠：
    - 发生折叠需要时相邻的非浮动元素
    - 折叠发生在垂直外边距上，即margin-top/margin-bottom;
    - 折叠后取其中最大的那个margin值作为最终值。
    - 定义了属性overflow且值不为visible（即创建了新的块级格式化上下文）的块元素，不与它的子元素发生margin 折叠；
    - 绝对定位元素的 margin 不与任何 margin 发生折叠。
    - 根元素的 margin 不与其它任何 margin 发生折叠；

10 parent.childNodes 是所有的子元素
   parent.child 是只有第一层子元素