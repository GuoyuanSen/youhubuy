$.each($(".comment-tabs h2"),function(index,item){
    // $(this).css("border","yellow").siblings().css("border","gray")
    $(item).on("click",index,function(event){
       $($("#commitbox .comment-list")[index]).css("display","block")
       .siblings().css("display","none")
    })
})