let EventUtil = {
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
let queueNums = [];

function createQueue(id) {
    let queueList = document.getElementsByClassName("queueList")[0];
    let queueNum = document.getElementById("queueNum").value;
    switch (id) {
        case 'left-in':
            queueNums.unshift(queueNum);
            break;
        case 'left-out':
            queueNums.shift();
            break;
        case 'right-in':
            queueNums.push(queueNum);
            break;
        case 'right-out':
            queueNums.pop();
            break;
        default:
            break;
    }
    queueList.innerHTML="";
    for(let i=0;i<queueNums.length;i++){
      let queueNode = document.createElement("div");
        queueNode.setAttribute('class', 'queuenode');
        queueNode.innerHTML = queueNums[i];
        queueList.appendChild(queueNode);
        queueNode.setAttribute("data-id",i);
    }

}

function queueHandler(event) {
    let target = EventUtil.getTarget(event);
    let id = target.id;
    createQueue(id);
}
function removeNode(){
  let target = EventUtil.getTarget(event);
   let index =  target.dataset.id;
    queueNums.splice(index,1);
    createQueue();
}
function init() {
    let btns = document.getElementsByName("btns");
    let queueList = document.getElementsByClassName("queueList")[0];

    for (let i = 0; i < btns.length; i++) {
        EventUtil.addHandler(btns[i], 'click', queueHandler);
    }
  EventUtil.addHandler(queueList,'click',removeNode);
}
(function() {
    init();
})();
