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

5.cursor:crosshair; 鼠标光标是十字;
6.label标签的用法：除了用for属性与指定的表单元素关联外，直接把表单元素包含在label里面也能实现关系。
7.事件的套路。。