(function() {
    function $(id) {
        return document.querySelector(id);
    }
    var tip = {
        nulltip: "姓名不能为空",
        long: "姓名不能超过16个字符",
        short: "姓名至少为4个字符",
        pass: "姓名格式正确",
        blank: "必填，长度为4-16个字符"
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

    function checkHandler(event) {
        var input = $("#name");
        var value = input.value;
        var tipPa = $(".tip");
        var validity = input.validity;
        var length = value.replace(/[^\x00-\xff]/g, "xx").length;
        var flag =false;
        removeClass(tipPa, "pass-font");
        removeClass(input, "pass-border");
        if (validity.valueMissing) {
            tipPa.innerHTML = tip.nulltip;
        } else if (length < 4) {
            tipPa.innerHTML = tip.short;
        } else if (length > 16) {
            tipPa.innerHTML = tip.long;
        } else {
            flag = true;
            tipPa.innerHTML = tip.pass;
        }
        if(!flag){
          addClass(tipPa, "err-font");
          addClass(input, "err-border");
        }else{
          addClass(tipPa, "pass-font");
          addClass(input, "pass-border");
        }
    }

    function keyupHandler(event) {
         checkHandler();
    }

    function init() {
        var checkBtn = $("#check");
        var input = $("#name");
        input.addEventListener('keyup', keyupHandler, true)
        checkBtn.addEventListener('click', checkHandler, true);
    }
    window.onload = init;
})()
