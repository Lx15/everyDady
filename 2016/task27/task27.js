/*
 *  task27 根据Avatar 团队的 task26在自己的 task26 的基础上进行更改，在这个任务中
 *　注意使用　状态模式、二次canvas 缓存、背景缓存，模块化。
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

(function() {
    var CANVASWIDTH = 500;
    var CANVASHEIGHT = 500;
    var CANVASCENTER_X = CANVASWIDTH / 2;
    var CANVASCENTER_Y = CANVASHEIGHT / 2;
    var SENDFAIL = 0.3;
    var SPACEWIDTH = 30; // 飞船宽度
    var PLANETWIDTH = 80;
    var ORBITNUM = 4;
    var PLANETURL = "min-iconfont-planet.png";
    var SHIPURL　= "min-iconfont-rocket-active.png";
    var POWERSYS = [{
        flyrate: 10,
        consumerate: 5
    }, {
        flyrate: 16,
        consumerate: 7
    }, {
        flyrate: 25,
        consumerate: 9
    }];
    var ENERGYSYS = [{
        addrate: 2
    }, {
        addrate: 3
    }, {
        addrate: 4
    }];

    function Ship(id, powerType, energyType) {
        this.id = id;
        this.powerType = powerType;
        this.energyType = energyType;
        this.orbit = 120 + 40 * id; // 轨道半径
        this.angle = 0; // 飞船飞过的角度
        this.state = 0; // 0: destroy 1: launch 2: stop 3: fly
        this.energytotal = 100;
        this.timeId = null;
    }
    Ship.prototype.energySys = function(){
      this.energytotal += this.energyType.addrate;
      this.energytotal = this.energytotal > 100 ? 100 : this.energytotal;
      var state = this.getState();
      if (state === 3) { // 在飞行阶段
          this.energytotal -= this.powerType.consumerate;
          this.energytotal = this.energytotal < 0 ? 0 : this.energytotal;
      }
    }
    Ship.prototype.getEnergy = function(){
      return this.energytotal;
    }
    Ship.prototype.powerSys = function() {
        var self = this;
        var fly = function() {
            self.timeId = setInterval(function() {
                self.angle += self.powerType.flyrate / self.orbit;
                self.angle = self.angle > 360 ? 0 : self.angle;
                var flag = self.getEnergy();
                if(flag<=0){
                clearInterval(self.timeId);
                }
            }, 1000)

        };
        var stop = function() {
            clearInterval(self.timeId);
        };
        return {
            fly: fly,
            stop: stop
        }
    }
    Ship.prototype.getState = function() {
        return this.state;
    }
    Ship.prototype.stateChange = function(signal) {
        var command = signal.command;
        switch (command) {
            case "launch":
                this.state = 1;
                break;
            case "destroy":
                this.state = 0;
                break;
            case "fly":
                this.state = 3;
                this.powerSys().fly();
                break;
            case "stop":
                this.state = 2;
                this.powerSys().stop();
                break;
            default:
                alert("不应该到这里的好吧>_<")
        }
    }
    Ship.prototype.isSelf = function(signal) {
        if (signal.id === this.id) {
            return true;
        }
        return false;
    }
    Ship.prototype.signalSys = function(signal) {
        var flag = this.isSelf(signal);
        if (!flag) {
            return;
        }
        this.stateChange(signal);
    }
    var mediator = (function() {
        var ships = [];
        var commandToState = {
            launch: 1,
            destroy: 0,
            fly: 3,
            stop: 2
        }
        var m =0;
        function sendSignal(signal) {
            var command = signal.command.trim();
            var id = signal.id;
            switch (command) {
                case 'launch':
                    if (ships[id] !== undefined) {
                        alert("此飞船已经创建");
                        return;
                    }
                    var ship = new Ship(id,signal.powerType,signal.energyType);
                    ship.stateChange(signal);
                    setInterval(function(){
                      ship.energySys();
                    },1000);
                    ships[id] = ship;
                    break;
                case 'destroy':
                    if (ships[id] === undefined) {
                        return;
                    }
                    delete ships[id];
                    break;
                case 'stop':
                case 'fly':
                    for (var i = 0; i < ships.length; i++) {
                      if(ships[i]!==undefined){
                        ships[i].signalSys(signal);
                      }
                    }
                    break;
                default:
                    alert("命令出错");
            }
        }
        function getShips() {
            return ships;
        }
        return {
            sendSignal: sendSignal,
            getShips: getShips
        }
    })();
    /*
      在Animate中进行 bgcanvas 初始化
    */
    var AnimateUtil = (function() {
        var bgCanvas = $("#background");
        bgCanvas.width = CANVASWIDTH;
        bgCanvas.height = CANVASHEIGHT;

        var canvas = $("#space-ship");
        canvas.width = CANVASWIDTH;
        canvas.height = CANVASHEIGHT;

        var cacheCanvas = document.createElement("canvas");
        cacheCanvas.width = CANVASWIDTH;
        cacheCanvas.height = CANVASHEIGHT;

        try {
            var bgcxt = bgCanvas.getContext("2d");
            bgcxt.translate(CANVASCENTER_X, CANVASCENTER_Y);
            var cxt = canvas.getContext("2d");
            var cachecxt = cacheCanvas.getContext("2d");
        } catch (e) {
            alert("不支持canvas 的 getContext");
        }
       function drawPlanet (context) {
            context.save();
            var img = new Image();
            img.src = PLANETURL;
            img.onload = function() {
                var a = PLANETWIDTH/2 ;
                context.drawImage(img, -a, -a, PLANETWIDTH, PLANETWIDTH);
            }
            context.restore();
        }
        function drawOrbit (context) {
                context.save();
                context.strokeStyle = "blue";
                for (var i = 0; i < ORBITNUM; i++) {
                    var radius = 120 + 40 * i;
                    context.moveTo(radius,0);
                    context.arc(0, 0, radius, 0, 360, false);
                    context.stroke();
                }
                context.restore();
            }
       //  初始化时即创建背景canvas
        (function(){
          drawPlanet(bgcxt);
          drawOrbit(bgcxt);
        })();
        // 二次缓存
        function drawShip(cachecxt,ship) {
          var img = new Image();
          img.src = SHIPURL;
          img.onload = function(){
            cachecxt.save();
            cachecxt.translate(CANVASCENTER_X, CANVASCENTER_Y);
            cachecxt.rotate(-ship.angle);
            var a = SPACEWIDTH/2;
            var b = CANVASWIDTH/2;
            cachecxt.drawImage(img,ship.orbit-a,-a,SPACEWIDTH,SPACEWIDTH);
            cachecxt.restore();
            cxt.clearRect(0,0, CANVASWIDTH, CANVASWIDTH);
            cxt.drawImage(cacheCanvas,0,0,CANVASWIDTH,CANVASWIDTH);
          }
        }
        function drawShips(ships){
          if(ships ===undefined || ships.every(function(item){
             return item === undefined;
          })){
            cxt.clearRect(0,0,CANVASWIDTH,CANVASWIDTH);
            return ;
          }
          cachecxt.clearRect(0,0,CANVASWIDTH,CANVASWIDTH);
          for(var i=0;i<ships.length;i++){
            if(ships[i] !== undefined){
              drawShip(cachecxt,ships[i]);
            }
          }
        }
        function animateLoop() {
            requestAnimFrame(animateLoop);
            drawShips(mediator.getShips())
        }
        return {
            animateLoop:animateLoop
        }
    })();

    var event = (function() {
        var currentId=-1 ;
        var signal ={};
        function commandHandler(e) {
            var target = EventUtil.getTarget(e);
            var signal = {};
            var id = target.id.trim();
            var command = id.slice(0, id.length - 1); //
            var idnum = id.slice(id.length - 1);
            if (command === "launch") {
                var model = $(".modelContainer");
                model.style.display = "flex";
                currentId = parseInt(idnum);
            } else {
                signal = {
                    id: parseInt(idnum),
                    command: command
                }
                mediator.sendSignal(signal);
            }
        }

        function okHandler(e) {
            var form = document.forms[0];
            var powerType = parseInt(form.elements["powerType"].value);
            var energyType = parseInt(form.elements["energyType"].value);
            signal =　{
              id :currentId,
              command　: "launch",
              powerType :POWERSYS[powerType],
              energyType:ENERGYSYS[energyType]
            }
            mediator.sendSignal(signal);
            $(".modelContainer").style.display ="none";

        }

        function cancelHandler(e) {

        }
        return {
            commandHandler: commandHandler,
            okHandler: okHandler,
            cancelHandler: cancelHandler
        }
    })();


    window.onload = function() {
      EventUtil.addHandler($(".commander"), 'click', event.commandHandler);
      EventUtil.addHandler($(".ok"), 'click', event.okHandler);
      EventUtil.addHandler($(".cancel"), 'click', event.cancelHandler);
      AnimateUtil.animateLoop();

    }
})();
