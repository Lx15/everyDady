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
let resetNums =[];
function createQueue(id,arr) {
    let queueList = document.getElementsByClassName("queueList")[0];
    let queueNum = document.getElementById("queueNum").value;
    let maxlength = 60;
    let arrToSort =!arr?queueNums:arr;
    switch (id) {
        case 'left-in':
            if (queueNums.length >= maxlength) {
                alert("队列最大容量是60");
                return;
            }
            queueNums.unshift(queueNum);
              resetNums = queueNums.slice(0);
            break;
        case 'left-out':
            queueNums.shift();
              resetNums = queueNums.slice(0);
            break;
        case 'right-in':
            if (queueNums.length >= maxlength) {
                alert("队列最大容量是60");
                return;
            }
            queueNums.push(queueNum);
              resetNums = queueNums.slice(0);
            break;
        case 'right-out':
            queueNums.pop();
              resetNums = queueNums.slice(0);
            break;
        default:
            break;
    }

    queueList.innerHTML = "";
    for (let i = 0; i < arrToSort.length; i++) {
        let queueNode = document.createElement("div");
        queueNode.setAttribute('class', 'queuenode');
        queueNode.innerHTML = arrToSort[i];
        queueList.appendChild(queueNode);
        queueNode.setAttribute("data-id", i);
        queueNode.style.height =arrToSort[i]+'px';
        queueNode.style.top =150-arrToSort[i]+'px';
        queueNode.style.marginLeft = '5px';
    }

}

function queueHandler(event) {
    let target = EventUtil.getTarget(event);
    let id = target.id;
    createQueue(id);
}

function removeNode() {
    let target = EventUtil.getTarget(event);
    if(target.className ==="queuenode"){
      let index = target.dataset.id;//看这里看这里。。。哈哈哈哈、、、、
      queueNums.splice(index, 1);
      createQueue();
    }

}
function swap(ele1, ele2) {
    var temp = ele1.offsetHeight;
    ele1.style.height = ele2.offsetHeight + "px";
    ele1.style.top = 150-ele2.offsetHeight + "px";
    ele2.style.height = temp + "px";
    ele2.style.top = 150-temp + "px";
};

function bubbleSorthandler(){
  var queuenodearr = document.getElementsByClassName("queuenode"),
      len  = queuenodearr.length, i, j = 0, delay = 50, timer;

  i = len - 1;
  timer = setInterval(function() {
      if(i < 1) {
          clearInterval(timer);
      }
      if(j == i) {
          --i;
          j = 0;
      }
      if (queuenodearr[j].offsetHeight > queuenodearr[j+1].offsetHeight) {
          swap(queuenodearr[j], queuenodearr[j+1]);
      }
      ++j;
  }, delay);

}
function resethandler(){
  createQueue('reset',resetNums);
}
function init() {
    let btns = document.getElementsByName("btns");
    let queueList = document.getElementsByClassName("queueList")[0];
    let bubbleSortBtn = document.getElementById("bubbleSort");
    let reset = document.getElementById("reset");
    for (let i = 0; i < btns.length; i++) {
        EventUtil.addHandler(btns[i], 'click', queueHandler);
    }
    EventUtil.addHandler(queueList, 'click', removeNode);
    EventUtil.addHandler(bubbleSortBtn,'click',bubbleSorthandler);
    EventUtil.addHandler(reset,'click',resethandler);
}
(function() {
    init();
})();
