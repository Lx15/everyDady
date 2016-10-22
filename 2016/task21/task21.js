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
var tagArr=[];
function renderTag(arr,ele){
    var tagContainer = $('.tag-container');
    ele.innerHTML ="";
    arr.map(function(tag){
      ele.innerHTML +='<div class="tag-content">'+tag+'</div>';
    })
}
function tagHandler(event){
  var tag = $('#tag');
  var e = EventUtil.getEvent(event);
  // enter :13  space:32 , :188
     if(e.keyCode===13 || e.keyCode===32 || e.keyCode ===188){
       let tagnocomma ="";
       if(e.keyCode ===188){
          tagnocomma = tag.value.slice(0,tag.value.length-1).trim();
         tagArr.push();
       }else{
         tagnocomma = tag.value.trim();
       }
       if(tagnocomma==""){
         return ;
       }
       //去重
       if(tagArr.includes(tagnocomma)){
         tag.value ="";
         return;
       }
       tagArr.push(tagnocomma);
       //清空
       tag.value ="";
       if(tagArr.length>10){
         tagArr.shift();
       }
       renderTag(tagArr,$('.tag-container'));
     }
}
function mouseoverHandler(event){
  var target = EventUtil.getTarget(event);
  if(target.classList.contains("tag-content")){
    if(!target.innerHTML.startsWith("删除")){
      target.innerHTML = "删除:"+target.innerText;
    }
  }
}
function mouseoutHandler(event){
  var target = EventUtil.getTarget(event);
  if(target.classList.contains("tag-content")){
    if(target.innerHTML.startsWith("删除")){
      target.innerHTML = target.innerText.slice(3);
    }
  }
}
function tagClickHandler(event){
  var target = EventUtil.getTarget(event);
  if(target.classList.contains("tag-content")){
     for(let i=0;i<tagArr.length;i++){
       if("删除:"+tagArr[i] === target.innerHTML.trim()){
         tagArr.splice(i,1);
         break;
       }
     }
     renderTag(tagArr,$('.tag-container'));
  }
}
var hobbyData = [];
function hobbyClickHandler(event){
  var target = EventUtil.getTarget(event);
  if(target.classList.contains("tag-content")){
     for(let i=0;i<hobbyData.length;i++){
       if("删除:"+hobbyData[i] === target.innerHTML.trim()){
         hobbyData.splice(i,1);
         break;
       }
     }
     renderTag(hobbyData,$('.hobby-container'));
  }
}
Array.prototype.unique = function(){
  var obj={};
  for(var i=0;i<this.length;i++){
    obj[this[i]] = this[i];
  }
  return Object.keys(obj);
}

function okHandler(event){
  var str = $('#textArea').value.trim();
  var arrWord = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5\.]+/).filter(function(e) {
      return e.length !== 0;
  });
  hobbyData = hobbyData.concat(arrWord);
  //去重
  hobbyData = hobbyData.unique();
  renderTag(hobbyData,$('.hobby-container'));
}
function init() {
    EventUtil.addHandler($('#tag'), 'keyup', tagHandler);
    EventUtil.addHandler($('.tag-container'),'mouseover',mouseoverHandler);
    EventUtil.addHandler($('.hobby-container'),'mouseover',mouseoverHandler);
    EventUtil.addHandler($('.tag-container'),'mouseout',mouseoutHandler);
    EventUtil.addHandler($('.hobby-container'),'mouseout',mouseoutHandler);
    EventUtil.addHandler($('.tag-container'),'click',tagClickHandler);
    EventUtil.addHandler($('.hobby-container'),'click',hobbyClickHandler);
    EventUtil.addHandler($('#ok'),'click',okHandler);
}
init();
