(function() {
    function $(id) {
        return document.querySelector(id);
    }
    var nameTip = {
        nulltip: "姓名不能为空",
        long: "姓名不能超过16个字符",
        short: "姓名至少为4个字符",
        pass: "姓名格式正确",
        err: "验证出错",
        blank: "必填，长度为4-16个字符"
    }
    var passwordTip = {
        nulltip: "密码不能为空",
        long: "密码不能超过16个字符",
        short: "密码至少为4个字符",
        pass: "密码格式正确",
        err: "验证出错",
        blank: "必填，长度为4-16个字符"
    }
    var passwordCheckTip = {
        nulltip: "确认密码不能为空",
        long: "确认密码不能超过16个字符",
        short: "确认密码至少为4个字符",
        pass: "确认密码格式正确",
        err: "验证出错",
        blank: "再次输入密码"
    }
    var emailTip = {
        nulltip: "邮箱不能为空",
        long: "邮箱不能超过16个字符",
        short: "邮箱至少为4个字符",
        pass: "邮箱格式正确",
        err: "验证出错",
        blank: "必填，填写邮箱"
    }
    var cellTip = {
        nulltip: "手机号不能为空",
        long: "手机号不能超过16个字符",
        short: "手机号至少为4个字符",
        pass: "手机号格式正确",
        err: "验证出错",
        blank: "必填，填写手机号"
    }

    function removeClass(ele, className) {
        if (ele.classList.contains(className)) {
            ele.classList.remove(className);
        }
    }

    function addClass(ele, className) {
        if (!ele.classList.contains(className)) {
            ele.classList.add(className);
        }
    }

    function classhandle(flag,p,ele) {
        if (!flag) {
            addClass(p, "err-font");
            addClass(ele, "err-border");
        } else {
            addClass(p, "pass-font");
            addClass(ele, "pass-border");
        }
    }

    function nameCheck(ele, p, tipobj) {
        var value = ele.value;
        var validity = ele.validity;
        var flag = false;
        var length = value.replace(/[^\x00-\xff]/g, "xx").length;

        removeClass(p, "pass-font");
        removeClass(ele, "pass-border");
        if (validity.valueMissing) {
            p.innerHTML = tipobj.nulltip;
        } else if (length < 4) {
            p.innerHTML = tipobj.short;
        } else if (length > 16) {
            p.innerHTML = tipobj.long;
        } else {
            flag = true;
            p.innerHTML = tipobj.pass;
        }
        classhandle(flag,p,ele);
        return flag;
    }

    function passwordCheckCheck(ele,p,tipobj){
      var value = ele.value.trim();
      var validity = ele.validity;
      var flag = false;
      var pw =$("#password").value.trim();
      if(value!==pw){
        p.innerHTML = tipobj.err;
      }else{
        flag =true;
        p.innerHTML = tipobj.pass;
      }
        classhandle(flag,p,ele);
          return flag;
    }
    function emailCheck(ele,p,tipobj){
      var value = ele.value.trim();
      var validity = ele.validity;
      var flag = false;
      if(validity.patternMismatch){
        p.innerHTML = tipobj.err;
      }else{
        flag =true;
        p.innerHTML = tipobj.pass;
      }
    classhandle(flag,p,ele);
      return flag;
    }
    function getObjById(id) {
        var obj = {};
        switch (id) {
            case 'name':
                obj = nameTip;
                break;
            case 'password':
                obj = passwordTip;
                break;
            case 'passwordCheck':
                obj = passwordCheckTip;
                break;
            case 'email':
                obj = emailTip;
                break;
            case 'cell':
                obj = cellTip;
                break;
            default:
                alert("不可能到这里的好吧")
        }
        return obj;
    }

    function checkHandler(ele) {
        var p = ele.nextElementSibling;
        var value = ele.value;
        var tipobj = getObjById(ele.id);
        switch (ele.id) {
            case "name":
                nameCheck(ele, p, tipobj);
                break;
            case "password":
                nameCheck(ele, p, tipobj);
                break;
            case "passwordCheck":
                passwordCheckCheck(ele, p, tipobj);
                break;
            case "email":
                emailCheck(ele, p, tipobj);
                break;
            case "cell":
                emailCheck(ele, p, tipobj);
                break;
            default:

        }
    }

    function focusHandler(event) {
        var target = event.target;
        var id = target.id;
        target.nextElementSibling.innerHTML = getObjById(id).blank;
    }

    function blurHandler(event) {
        var target = event.target;
        var id = target.id;
        checkHandler(target);
    }
  function submitHandler(){

      var name =  nameCheck($("#name"), $("#name").nextElementSibling, nameTip);
     var password = nameCheck($("#password"),$("#password").nextElementSibling, passwordTip);
      var passwordCheck=  passwordCheckCheck($("#passwordCheck"), $("#passwordCheck").nextElementSibling, passwordCheckTip);
      var email = emailCheck($("#email"),$("#email").nextElementSibling, emailTip);
      var cell = emailCheck($("#cell"),$("#cell").nextElementSibling, cellTip);
      if(name&&password&&passwordCheck&&email&&cell){
        return;
      }else {
        alert("验证出错");
      }
  }
    function init() {
        var form = $("form").elements;
        for (var i = 0, ii = form.length; i < ii; i++) {
            if (form[i].tagName.toLowerCase() === "input") {
                (function(i) {
                    form[i].addEventListener('focus', focusHandler, false); // 这两个事件都不能冒泡
                    form[i].addEventListener('blur', blurHandler, false);
                })(i);
            }
        }
        $("#check").addEventListener("click",submitHandler,true);
    }
    window.onload = init;
})()
