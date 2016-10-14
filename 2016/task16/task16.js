/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData(city,value) {
 aqiData[city]=value;
}
function objToArr(obj){
  var objArr=[];
  objArr[0]=[];
  objArr[1]=[];
  for(var key in obj){
    objArr[0].push(key);
    objArr[1].push(obj[key]);
  }
  return objArr;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var aqitable = document.getElementById("aqi-table");
  var thead = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
  var objArr = objToArr(aqiData);
  console.log(objArr);
  var length = objArr[0].length;
  if(!length){
    aqitable.innerHTML = "";
  }else{
    var node =thead;
    //添加tbody
    for(var i=0;i<length;i++){
      var tr ='<tr><td>'+objArr[0][i]+'</td><td>'+objArr[1][i]+'</td><td><button data-city='+objArr[0][i]+'>删除</button></td></tr>';
    node+=tr;
    }
    aqitable.innerHTML = node;
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle(city,value) {
  addAqiData(city,value);
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}

function init() {
var addBtn = document.getElementById("add-btn");
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
addBtn.onclick = function(){
  var cityinput = document.getElementById("aqi-city-input");
  var city = cityinput.value.trim();
  var cityvalue = document.getElementById("aqi-value-input");
  var value = document.getElementById("aqi-value-input").value.trim();
  //只有汉字与英文字符
  var cityFlag  =  /^[\u4e00-\u9fa5a-zA-Z]+$/g.test(city);
  // //只有整数
  var valueFlag = /^[1-9][0-9]*$/g.test(value);
  if(!cityFlag||!valueFlag){
    alert("城市名称只能是中英文字符，空气指数只能是正整数,请重新输入");
    cityinput.value = "";
    cityvalue.value = "";
    return;
  }
  addBtnHandle(city,value);
  cityinput.value = "";
  cityvalue.value = "";
}
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
document.getElementById("aqi-table").addEventListener('click',function(event){
  if(event.target.nodeName.toLowerCase() ==="button"){
    delBtnHandle.call(null,event.target.dataset.city);
  }
},false);
}
(function(){
  init();
})();
