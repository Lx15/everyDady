$ = function(el) {
    return document.querySelector(el);
}
var EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            elemenr["on" + type] = handler;
        }
    },
    //跨浏览器的事件对象
    getEvent: function(event) {
        return event ? event : window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    }
}
//前序遍历
function preOrder(node) {
	if (!(node == null)) {
		divList.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}
}

//中序遍历
function inOrder(node) {
	if (!(node == null)) {
		inOrder(node.firstElementChild);
		divList.push(node);
		inOrder(node.lastElementChild);
	}
}

//后序遍历
function postOrder(node) {
	if (!(node == null)) {
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		divList.push(node);
	}
}
function BFS(node){
  var queue =[node];
  while((current = queue.shift()) !==null){
    divList.push(current);
    if(current.firstElementChild !==null){
      queue.push(current.firstElementChild);
    }
    if(current.lastElementChild !== undefined){
      queue.push(current.lastElementChild);
    }
  }
}
function DFS(node){
  if(node === null){
    return ;
  }
  divList.push(node);
  if(node.children !== null){
     for(var i=0;i<node.children.length;i++){
        DFS(node.children[i])
     }
  }
}
//颜色变化函数
function changeColor() {
	var i = 0;
	divList[i].style.backgroundColor = 'blue'
	timer = setInterval(function (argument) {
		i++;
		if (i < divList.length) {
			divList[i-1].style.backgroundColor = '#fff';
			divList[i].style.backgroundColor = 'blue';
		} else {
      //处理最后一个
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor = '#fff';
		}
	},500)
}

//初始化样式
function reset() {
	divList = [];
	clearInterval(timer);
	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.backgroundColor = '#fff';
	}
}
function preOrderHandler(){
  reset();
  preOrder($(".one"));
  changeColor();
}
function inOrderHandler(){
  reset();
  inOrder($(".one"));
  changeColor();
}
function postOrderHandler(){
  reset();
  postOrder($(".one"));
  changeColor();
}
function BFSHandler(){
  reset();
  BFS($(".one"));
  changeColor();
}
function DFSHandler(){
  reset();
  DFS($(".one"));
  changeColor();
}
var timer=null,divList =[];
function init(){
    EventUtil.addHandler($("#preOrder"),'click',preOrderHandler);
    EventUtil.addHandler($("#inOrder"),'click',inOrderHandler );
    EventUtil.addHandler($("#postOrder"),'click',postOrderHandler);
    EventUtil.addHandler($("#BFS"),'click',BFSHandler);
    EventUtil.addHandler($("#DFS"),'click',DFSHandler);
}
init();
