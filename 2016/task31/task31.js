(function() {
    function $(id) {
        return document.querySelector(id);
    }
    var stuData = {
        "北京": ["北京一号",
            "北京二号", "北京三号", "北京四号", "北京五号", "北京六号", "北京七号", "北京八号"
        ],
        "西安": ["西安一号",
            "西安二号", "西安三号", "西安四号", "西安五号", "西安六号", "西安七号", "西安八号"
        ],
        "深圳": ["深圳一号",
            "深圳二号", "深圳三号", "深圳四号", "深圳五号", "深圳六号", "深圳七号", "深圳八号"
        ]
    }

    var firmData = ["公司一号",
        "公司二号", "公司三号", "公司四号", "公司五号", "公司六号", "公司七号", "公司八号"
    ]
    function  initData (){
      var form = document.forms["info"];
      var  province = form.elements["province"];
      var  school = form.elements["school"];
      var  firm = form.elements["firm"];
      var provinces =[];
      for(var key in stuData){
        provinces.push(key);
      }
      for(var i=0,ii= provinces.length;i<ii;i++){
        var option = new Option(provinces[i],provinces[i]);
        province.add(option,undefined);// undefined 保证浏览器兼容 添加在最后一项
      }
      var schools =stuData[provinces[0]];
      for(var i=0,ii=schools.length;i<ii;i++){
        var option = new Option(schools[i],schools[i]);
        school.add(option,undefined);
      }
      for(var i=0,ii= firmData.length;i<ii;i++){
        var option = new Option(firmData[i],firmData[i]);
        firm.add(option,undefined);
      }
    }
    // radio　切换
    function noneChange(showval){
      showval ="."+showval;
      if(showval==".stu"){
        var hideval=".staff";
      }else{
        var hideval =".stu";
      }
      if($(showval).classList.contains("none")){
        $(showval).classList.remove("none");
      }
      if(!$(hideval).classList.contains("none")){
        $(hideval).classList.add("none");
      }
    }
    function radioChange(){
      var val = document.forms["info"].elements["job"].value;// 当前选中值
      noneChange(val);
    }
    function clearSelectbox(selectBox){
      for(var i=0,len=selectBox.options.length;i<len;i++){
        selectBox.remove(0);
      }
    }
    function provinceChange(e){
      var selectedProvince = e.target.options[e.target.selectedIndex].value;
      var schools =stuData[selectedProvince];
      var school = document.forms[0].elements["school"];
      // 先移除之前的选项
      clearSelectbox(school);
      for(var i=0,ii=schools.length;i<ii;i++){
        var option = new Option(schools[i],schools[i]);
        school.add(option,undefined);
      }
    }
    function init() {
     initData();
     $(".radio").addEventListener('click',radioChange,true);
     document.forms["info"].elements["province"].addEventListener('change',provinceChange,true);
    }
    window.onload = init;
})()
