// 无缝轮播图
function Banner(){};
    $.extend(Banner.prototype,{
        init:function(options){
           //所有图片
            this.item_list=$(options.item_list)
            this.btn_list=$(options.btn_list)
            this.nowIndex=0;
            //有多少元素
            this.item_num=this.item_list.length;
            this.ul=$("#brand ul");
            //和获取列表中第一个元素的宽度值
            this.item_width=this.item_list.width();
            
            
            this.bindEvent();
        },
        bindEvent:function(){
            
            this.btn_list.mouseover($.proxy(this.toIndex ,this))
            
        },
        next:function(){
            if(this.nowIndex==this.item_num-4){
                this.nowIndex=1;
                this.ul.css({
                    left:0
                })
            }else{
                this.nowIndex++;
            }
            this.animate()
        },
        prev:function(){
            if(this.nowIndex==0){
                this.nowIndex=this.item_num-4;
                this.ul.css({
                    left:-(this.item_num-4)*this.item_width
                })
            }else{
                this.nowIndex--
            }
            this.animate()
        },
        toIndex:function(event){
            var target=event.target||event.srcElement;
            this.nowIndex=$(target).index() 
            this.animate();
        },
        animate:function(){
            
            this.ul.stop().animate({
                left:-this.item_width*this.nowIndex
            })
            var index=this.nowIndex==this.item_num-1 ? 0 : this.nowIndex;

            this.btn_list.eq(index).addClass("active")
            .siblings("button").removeClass("active")
        },
    
        autoPlay:function(){
            
                this.autoTimer=setInterval(function(){
                    this.next()
                }.bind(this),3000)
            
        }
        })

        var banner=new Banner();
        banner.init({
            item_list : ".lunbo li",
            btn_list : "#btn3 button",
        })
        banner.autoPlay()








// 原生轮播图
var aItem =
document.querySelectorAll(".slider-wrapper li");
var oLeft =
document.getElementById("left");
var oRight =
document.getElementById("right");
var aSpan =
document.querySelectorAll("#btnlist span")
var nowIndex = 0;
        oRight.onclick = function(){
            if(nowIndex == aItem.length -1){
                nowIndex = 0
            }else{
                nowIndex ++
            }
         animate()
       }
       oLeft.onclick = function(){
           if(nowIndex == 0){
               nowIndex = aItem.length-1;
           }else{
               nowIndex --
           }
           animate()
       }
       for(let i = 0 ; i <aSpan.length; i++){
           aSpan[i].onmouseover = function(){
               nowIndex = i;
               animate()
           }
       }
       function animate(){
           for(var i = 0 ; i <aItem.length ; i++){
               aItem[i].className = "";
               aSpan[i].className = "";
           }
           aItem[nowIndex].className="active";
           aSpan[nowIndex].className = "active";
       }


// 2. 动画; css3 凑合;

setInterval(oRight.onclick, 3000)