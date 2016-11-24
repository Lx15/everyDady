
/*
 *  根据avatar 团队的界面制作的功能，使用中介者模式、canvas、requestAnimationFrame
 * 使用mediator 来更改 飞船状态，根据飞船状态来制作动画。
 */
function $(id) {
    return document.querySelector(id);
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

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        }
})();
// ship
function Ship(id) {
    this._state = 0; // launch:1,destroy: 0, stop:2 ,fly:3
    this.id = id; // 1
    this.rate = 5;
    this.energy = 100;
    this.energyConsume = 8;
    this.energyAdd = 2;
    this.ship = {};
}

//能源系统 每秒刷新
Ship.prototype.energySys = function() {
    this.energy += this.energyAdd;
    this.energy = this.energy > 100 ? 100 : this.energy;
    var state = this.getState();
    if (state === 3) { // 在飞行阶段
        this.energy -= this.energyConsume;
        this.energy = this.energy < 0 ? 0 : this.energy;
    }
}

Ship.prototype.signalSys = function(command) {
        if (!command) {
            return;
        }
        var flag = this.isSelf(command);
        if (!flag) {
            return;
        }
        var oldState = this.getState();
        this.setStateByCommand(command);
        var state = this.getState();
        switch (state) {
            case 3: // fly
            case 2: // stop
                if (oldState === 0) {
                    alert("请先登录飞船再飞行");
                    this.setStateByNum(oldState);
                    return;
                }
                this.powerSys(); //  其实没做啥
                break;
            case 1: //launch
            case 0: // destroy
                this.suicideSys();
                break;
            default:
                alert("命令出错");
        }
    }
    // 自爆系统 用来显示隐藏飞船
Ship.prototype.suicideSys = function() {
        var state = this.getState();
        var context = $("#space-ship").getContext("2d");
        if (state === 1) {
            this.ship.drawCircle(context, 'green', 'green');
        }
        if (state === 0) {
            //destroy
            this.ship = {};
            this.ship = new Circle(new Center((earth.center.x + this.orbit.radius), (earth.center.y)), 10, Math.PI / 180);
        }
    }
    // 得到飞船的能量
Ship.prototype.getEnergy = function() {
        return this.energy;
    }
    // 更改飞船状态
Ship.prototype.getState = function() {
    return this._state;
}
Ship.prototype.setStateByCommand = function(command) {
    var command = command.command;
    switch (command) {
        case "launch":
            this._state = 1;
            break;
        case "destroy":
            this._state = 0;
            break;
        case "stop":
            this._state = 2;
            break;
        case "fly":
            this._state = 3;
            break;
        default:
            alert("指令错误");
    }
}
Ship.prototype.setStateByNum = function(num) {
    this._state = num;
}
Ship.prototype.isSelf = function(command) {
        if (command.id === this.id) {
            return true;
        }
        return false;
    }
    // 动力系统
Ship.prototype.powerSys = function() {
        var state = this.getState();
        switch (state) {
            case 2:
                // 飞机停止
                break;
            case 3:
                // 飞机画圈
                break;
            default:
                alert("不可能有这个状态的好吧");
        }
    }
    /*============================================mediator======================================*/
function messageTemplate(flag, command) {
    var template = "发送给飞船" + command.id + "的" + command.command + "命令发送";
    if (flag) {
        template += "成功";
    } else {
        template += "失败";
    }
    return template;
}
var mediator = {
    ships: [], // 存放所有飞船
    setUp: function() {
        var ships = this.ships;
        // 初始化时建飞船
        ships[0] = new Ship(0);
        ships[1] = new Ship(1);
        ships[2] = new Ship(2);
        ships[3] = new Ship(3);
        // 建轨道
        var canvas = $("#space-ship");
        if (canvas.getContext) {
            var context = canvas.getContext("2d");
            context.translate(250, 250);
            var earthCenter = new Center(0, 0);
            earth = new Circle(earthCenter, 50, 0);
            ships[0].orbit = new Circle(earthCenter, 90, 0);
            ships[1].orbit = new Circle(earthCenter, 130, 0);
            ships[2].orbit = new Circle(earthCenter, 170, 0);
            ships[3].orbit = new Circle(earthCenter, 210, 0);
        }
        ships[0].ship = new Circle(new Center((earth.center.x + ships[0].orbit.radius), (earth.center.y)), 10, ships[0].rate / 90);
        ships[1].ship = new Circle(new Center((earth.center.x + ships[1].orbit.radius), (earth.center.y)), 10, ships[1].rate / 130);
        ships[2].ship = new Circle(new Center((earth.center.x + ships[2].orbit.radius), (earth.center.y)), 10, ships[2].rate / 170);
        ships[3].ship = new Circle(new Center((earth.center.x + ships[3].orbit.radius), (earth.center.y)), 10, ships[3].rate / 210);
        // 这里竟然没有问题
        this.ships.forEach(function(item) {
            setInterval(function() {
                item.energySys();
            }, 1000);
        })
    },
    sendMessage: function(command) {
        // 模拟丢包率
        var possible = Math.random();
        if (possible < 0.3) {
            $("#message").innerHTML += '<p>' + messageTemplate(false, command) + '</p>';
        } else {
            $("#message").innerHTML += '<p>' + messageTemplate(true, command) + '</p>';
            this.ships.forEach(function(item) {
                item.signalSys(command);
            })
        }

    }
}

/*---------------------------------------canvas-------------------------------------------------*/
function Center(x, y) {
    this.x = x;
    this.y = y;
}

function Circle(center, radius, augular) {
    this.center = center;
    this.radius = radius;
    this.augular = augular; // 旋转角度
    this.angle = 0;
}
Circle.prototype.drawCircle = function(cxt, fillStyle, strokeStyle) {
    cxt.save();
    cxt.beginPath();
    if (fillStyle) {
        cxt.fillStyle = fillStyle;
    }
    cxt.strokeStyle = strokeStyle;
    cxt.lineWidth = 2;
    cxt.arc(this.center.x, this.center.y, this.radius, 0, 360, false);
    cxt.stroke();
    if (fillStyle) {
        cxt.fill();
    }
    cxt.restore();
}

function canvasInit() {
    var canvas = $('#space-ship');
    if (canvas.getContext) {
        var context = canvas.getContext("2d");
        earth.drawCircle(context, "blue", "#2CA6CB");
        for (var i = 0; i < mediator.ships.length; i++) {
            mediator.ships[i].orbit.drawCircle(context, "", "tomato");
        }
    }
}

function clearCanvas() {
    var canvas = $('#space-ship');
    if (canvas.getContext) {
        var context = canvas.getContext("2d");
        context.save();
        context.translate(-250, -250);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
    }
}


function flyShip(context, ship, orbit) {
    ship.center.x = orbit.center.x + orbit.radius * Math.cos(ship.angle);
    ship.center.y = orbit.center.y + orbit.radius * Math.sin(ship.angle);
    ship.angle += ship.augular;
    ship.drawCircle(context, "green", "green");
}

function stopShip(context, ship) {
    ship.drawCircle(context, 'red', 'red');
}

function launchShip(context, ship) {
    ship.drawCircle(context, 'green', 'green');
}

function destroyShip() {

}
// 根据 4个飞船的状态来绘制
function draw() {
    var context = $("#space-ship").getContext("2d");
    clearCanvas();
    canvasInit();
    mediator.ships.forEach(function(item){
      var state = item.getState();
      var ship = item;
      var orbit = item.orbit;
      switch (state) {
        case 3:
            var energy = ship.getEnergy();
            if (!energy) {
                stopShip(context, ship.ship, orbit);
                ship.setStateByNum(2); //更改状态使得下一帧不再绘制
                return;
            }
            flyShip(context, ship.ship, orbit);
            break;
        case 2:
            stopShip(context, ship.ship);
            break;
        case 1:
            launchShip(context, ship.ship);
            break;
        case 0:
            destroyShip();
            break;
        default:
      }
    })
}

function animate() {
    requestId = requestAnimFrame(animate);
    draw();
}
var  earth, requestId;
function init() {
    EventUtil.addHandler($(".commander"), 'click', clickHandler);
    mediator.setUp(); // 建飞船，轨道 ，地球
    canvasInit(); // 画轨道，地球
    // 若是每个飞船单独控制动画，会使得刷新越来越快
    animate();
}
init();
/*======================================event===================================================*/
function clickHandler(e) {
    var event = EventUtil.getEvent(e);
    var target = EventUtil.getTarget(e);
    var command = {};
    var id =target.id.trim();
    var command = id.slice(0,id.length-1)
    var idnum = id.slice(id.length-1);
    command ={
      id:parseInt(idnum),
      command:command
    }
    mediator.sendMessage(command);
}
