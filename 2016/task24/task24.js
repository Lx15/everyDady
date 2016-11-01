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
var divList=[];//用于按顺序存放节点
var timer=null ;
var lock = false;
function reset(){
  divList =[];
  clearInterval(timer);
  var divs = document.getElementsByTagName('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].style.backgroundColor = '#fff';
  }
}
function changeColor(){
  var i = 0;
  divList[i].style.backgroundColor = '#900'
  timer = setInterval(function (argument) {
    i++;
    if (i < divList.length) {
      divList[i-1].style.backgroundColor = '#fff';
      divList[i].style.backgroundColor = '#900';
    } else {
      //处理最后一个
      clearInterval(timer);
      divList[divList.length-1].style.backgroundColor = '#fff';
    }
  },500)

}
function changeColorSearch(ele){
  var key =ele.value;
  if(!key){
    alert("请输入要查询的字段");
    return ;
  }
  var i = 0;
  if(divList[0].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "")== key){
    divList[0].style.backgroundColor = 'red';
  }
  divList[0].style.backgroundColor = '#900';
  timer = setInterval(function (argument) {
    i++;
    if (i < divList.length) {
      divList[i-1].style.backgroundColor = '#fff';
      if(divList[i].firstChild.nodeValue.trim() == key){
        divList[i].style.backgroundColor = '#099';
        clearInterval(timer);
        return;
      }
      divList[i].style.backgroundColor = '#900';
    } else {
      //处理最后一个
      clearInterval(timer);
      divList[divList.length-1].style.backgroundColor = '#fff';
    }
  },500)
}
function DFS(node){
  if(node === null){
     return ;
  }
  divList.push(node);
  if(node.children!== null){
    for(var i=0; i< node.children.length;i++){
      DFS(node.children[i]);
    }
  }
}
function BFS(node){
  var queue=[node];
  while((current = queue.shift())!==undefined){
    divList.push(current);
    if(current.children.length){
      for(var i=0;i<current.children.length;i++){
        queue.push(current.children[i]);
      }
    }
  }
}

function DFSHandler(){
  reset();
  DFS($(".root"));
  changeColor();
}

function BFSHandler(){
  reset();
  BFS($(".root"));
  changeColor();
}
function DFSSearchHandler(){
  reset();
  DFS($(".root"));
  changeColorSearch($("#key"));
}
function BFSSearchHandler(){
  reset();
  BFS($(".root"));
  changeColorSearch($("#key"));
}
// 存放选中的节点
var pinkDiv =[];
function rootHandler(event){
  var event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);
  if(pinkDiv.length){
    pinkDiv.pop().style.backgroundColor = "#fff";
  }
  target.style.backgroundColor = "pink";
  pinkDiv.push(target);
  if(target.hasChildNodes()){
    for(var i=0;i< target.children.length;i++){
      target.children[i].style.backgroundColor= "#fff";
    }
  }
}
function deleteBtnHandler(){
  var target = pinkDiv.pop();
  if(target){
    var parent = target.parentNode;
    parent.removeChild(target);
  }else{
    alert("请先选择一个节点！")
  }

}
function addBtnHandler(){
  var nodeValue = $("#nodeValue").value;
  if(!nodeValue){
    alert("请先输入一个节点值");
    return ;
  }else{
    var target = pinkDiv.pop();
    if(target){
      var newNode = document.createElement("div");
      newNode.innerHTML = nodeValue;
      newNode.style.backgroundColor ="red";
      target.style.backgroundColor ="#fff";
      target.appendChild(newNode);
    }else{
      alert("请先选择一个节点！")
    }
  }
}
function init(){
  EventUtil.addHandler($("#DFS"),'click', DFSHandler);
  EventUtil.addHandler($("#BFS"),'click', BFSHandler);
  EventUtil.addHandler($("#DFSSearch"),'click', DFSSearchHandler);
  EventUtil.addHandler($("#BFSSearch"),'click', BFSSearchHandler);
  EventUtil.addHandler($(".root"),'click', rootHandler);
  EventUtil.addHandler($("#deleteBtn"),'click', deleteBtnHandler);
  EventUtil.addHandler($("#addBtn"),'click', addBtnHandler);
}
init();
