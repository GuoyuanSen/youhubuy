 function cookie(name,value,options){
    // 通过参数的个数进行判断; 严谨验证参数类型;
    // --- 获取cookie -----
    if(arguments.length == 1 && typeof name == "string"){
        var cookieArray = document.cookie.split("; ");
        for(var i = 0 ; i < cookieArray.length ; i ++){
            if(cookieArray[i].split("=")[0] === name){
                return cookieArray[i].split("=")[1];
            }
        }
        return "";
    }
    // --- 设置cookie -----
    var cookieStr = name+"="+value;
    if(options == undefined || typeof options != "object"){
        return document.cookie = cookieStr;
    }
    if(typeof options.path == "string"){
        cookieStr += ";path="+options.path;
    }
    if(typeof options.expires == "number" || typeof options.expires == "string"){
        var d = new Date();
        d.setDate(d.getDate() + options.expires);
        cookieStr += ";expires=" + d;
    }
    return document.cookie = cookieStr;
}
function removeCookie(name,path){
    setCookie(name,"",{
        expires:-1,
        // 做一个参数判断 , 不让path 为undefined;
        path: path ? path : ""
    })
}