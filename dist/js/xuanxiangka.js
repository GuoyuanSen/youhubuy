// var oItem1=document.getElementsByClassName("comment-list")
// var oItem2=document.getElementsByClassName("comment-list1")

// var oList1=document.getElementsByClassName("active")
// var oList2=document.getElementsByClassName("le")

// oList1.onclick=function(){
//     oItem1.style.display="block";
//     oItem2.style.display="none";
//     oList1.style.borderBottomColor="#fff";
//     oList2.style.borderBottomColor="#ddd";
//     console.log(1)
// }    
// oList2.onclick=function(){
//     console.log(2)

//     oItem1.style.display="none";
//     oItem2.style.display="block";
   
//     oList2.style.borderBottomColor="#fff";
//     oList1.style.borderBottomColor="#ddd";
  
// } 



$(".message .btn1").click(function(){
    $(".comment-list").css({
        display:"block"
    })
    $(".comment-list1").css({
        display:"none"
    })
    $(".message h2").removeClass("active");
    $(this).addClass("active");
})
$(".message .btn2").click(function(){
    $(".comment-list1").css({
        display:"block"
    })
    $(".comment-list").css({
        display:"none"
    })
    $(".message h2").removeClass("active");
    $(this).addClass("active");
})


//所有的a 标签 不刷新
var oA = document.querySelectorAll("a")
for (var i = 0 ;i <=oA.length-1 ; i++){
    oA[i].href = "javascript:;"
}





