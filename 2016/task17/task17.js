/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1); //控制日期增长
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
//事件处理程序
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
function getObjLength(obj){
   let arr = Object.getOwnPropertyNames(obj);
   return arr.length;

}
    // 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京", //-1
    nowGraTime: "day"
}

function getWidth(data){
   let chartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];
   let totalWidth = chartWrap.clientWidth;
   let barwidth = Math.floor(totalWidth/(getObjLength(data)*2));
   return barwidth;
}

var colors=['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
              '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb'];
function getColor(){
 let num = Math.floor(Math.random()*10);
 return colors[num];
}
/**
 * 渲染图表
 */
function renderChart() {
    let selectData = chartData[pageState.nowGraTime][pageState.nowSelectCity];
    let chartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];
       chartWrap.innerHTML="";
    let totalHeight = chartWrap.clientHeight;
    let selectDataKeys = Object.getOwnPropertyNames(selectData);
    for(let i=0;i<getObjLength(selectData);i++){
      let barnode = document.createElement("div");
      chartWrap.appendChild(barnode);
      barnode.setAttribute('class','chartbar');
      let barwidth = getWidth(selectData);
      barnode.style.width=barwidth+'px';
      barnode.style.height = selectData[selectDataKeys[i]]+'px';
      barnode.style.bottom ="20px";
      barnode.style.left = barwidth*(2*i)+'px';
      // barnode.style.marginLeft =barwidth+'px';
      barnode.style.backgroundColor =getColor();
      let tipnode = document.createElement("div");
      barnode.appendChild(tipnode);
      tipnode.setAttribute("class","tip");
      tipnode.style.left = barwidth/2+'px';
      tipnode.innerHTML =selectDataKeys[i]+':'+selectData[selectDataKeys[i]];
      EventUtil.addHandler(barnode,'mouseover',function(){
          let tipnode = this.childNodes[0];
          tipnode.style.display="inline-block";
      });
      EventUtil.addHandler(barnode,'mouseout',function(){
        let tipnode = this.childNodes[0];
        tipnode.style.display="none";
      })
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    var checked = EventUtil.getEvent(event).target.value;
    if (checked === pageState.nowGraTime) {
        return;
    }
    // 设置对应数据
    pageState.nowGraTime = checked;
    // 调用图表渲染函数
    renderChart()
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    let select = EventUtil.getTarget(event);
    let selectValue = select.value;
    if (selectValue === pageState.nowSelectCity) {
        return;
    }
    // 设置对应数据
    pageState.nowSelectCity = selectValue;
    // 调用图表渲染函数
    renderChart()
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    let radio = document.getElementById("form-gra-time").elements["gra-time"];
    for (let i = 0; i < radio.length; i++) {
        EventUtil.addHandler(radio[i], 'click', graTimeChange); //这里的event对象是自带的
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    let cities = [];
    cities = Object.getOwnPropertyNames(aqiSourceData);
    let select = document.getElementById("city-select");
    for (let i = 0; i < cities.length; i++) {
        let newOption = new Option(cities[i], cities[i]);
        select.add(newOption, null);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    EventUtil.addHandler(select, 'change', citySelectChange)
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据aqiSourceData处理成图表需要的数据格式
    //2016-01-01 周五
    let weekTotalValue = 0; //一周的总值
    let weekTotalNum = 0; //一周的天数
    let monthTotalValue = 0; //一月总值
    let monthTotalNum = 0; //一月的天数
    let weekDays = 4; // 初始日期
    let nowMonth = "";
    let nextNowMonth = "";
    let weekData = {};
    let monthData = {};

    for (let city in aqiSourceData) {
        weekData[city] = {};
        monthData[city] = {};
        let weeks = 0;
        let keyArr = Object.getOwnPropertyNames(aqiSourceData[city]); //["2016-01-01"]
        for (let day = 0; day < keyArr.length; day++) {
            nowMonth = keyArr[day].slice(5, 7);
            nextNowMonth = keyArr[day + 1] ? keyArr[day + 1].slice(5, 7) : "";

            weekDays++;
            weekTotalNum++;
            weekTotalValue += aqiSourceData[city][keyArr[day]];

            monthTotalNum++;
            monthTotalValue += aqiSourceData[city][keyArr[day]];

            if (weekDays == 6 || nowMonth !== nextNowMonth) {
                if (weekDays == 6) {
                    weekDays = 0;
                }
                weeks++;
                let weekKey = "2016" + nowMonth + '月第' + weeks + "周";
                weekData[city][weekKey] = Math.ceil(weekTotalValue / weekTotalNum);
                weekTotalNum = 0;
                weekTotalValue = 0;
                if (nowMonth !== nextNowMonth) {
                    let monthKey = "2016" + nowMonth + '月';
                    monthData[city][monthKey] = Math.ceil(monthTotalValue / monthTotalNum);
                    monthTotalNum = 0;
                    monthTotalValue = 0;
                    weeks = 0;
                }
            }
        }
    }
    //处理好的数据存到 chartData 中
    chartData.day = aqiSourceData;
    chartData.week = weekData;
    chartData.month = monthData;
    renderChart();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();
