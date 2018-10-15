//所有的a 标签 不刷新
var oA = document.querySelectorAll("a")
for (var i = 0 ;i <=oA.length-1 ; i++){
    oA[i].href = "javascript:;"
}