function ShopCar(){}
$.extend(ShopCar.prototype,{
    init:function(){
        this.main = $("#wrap100")
        this.loadJson()
        .done(function(res){
            this.addData(res);;
        })
        this.bindEvent();
        // this.listSum();
        // console.log($(".go-cart span"));
    },
    loadJson:function(){
        var opt = {
            url:"http://www.wookmark.com/api/json/popular",
            dataType:"jsonp",
            data:{page:this.page},
            context:this
        }
        return $.ajax(opt);
    },
    bindEvent:function(){
        $("#wrap100").on("click","button",this.addCar.bind(this));
        $(".go-cart").on("mouseenter",this.showList.bind(this));
        $(".go-cart span").on("mouseleave",function(){
            $(".cart-wrapper").children().remove();
        });
        $(".go-cart span").on("click",function(event){
            var target = event.target ; 
            if(target != $(".go-cart span")[0]) return 0;

            $.removeCookie("shopCar");
            // 执行鼠标移出事件;
            $(".go-cart span").triggerHandler("mouseleave");
            this.listSum();
        }.bind(this));
        $(".go-cart span").on("click",function(){
            location.href = "gouwuche.html";
        })
        
    },
    addData:function(json){
        this.json=json;
        //console.log(this.json)
    },
    addCar:function(event){
        var target = event.target ;
        var goodsId = $(target).attr("rel-id");
        //console.log(goodsId)
        var cookie;
        var hasGoods = false;
        //console.log($.cookie("shopCar"))
        if((cookie = $.cookie("shopCar"))){
            var cookieArray = JSON.parse(cookie);
            console.log(cookieArray,cookieArray.length);
            for(var i = 0 ; i < cookieArray.length ; i ++){
                if(cookieArray[i].id == goodsId ) {
                    hasGoods = true;
                    cookieArray[i].num ++;
                    break;

                }
            }
            if(hasGoods == false){
                var goods = {
                    id : goodsId,
                    num : "1"
                }
                cookieArray.push(goods);
            }
            $.cookie("shopCar",JSON.stringify(cookieArray));
        }else{
            $.cookie("shopCar",`[{"id":"${goodsId}","num":"1"}]`);
        }
        //console.log($.cookie("shopCar"));
        // this.listSum();
    }
    ,
    showList:function(event){
        var target = event.target;
        if(target != $(".go-cart span")[0]) return 0;
        //console.log($(".go-cart>div"));
        var cookie;
        if(!(cookie = $.cookie("shopCar"))){ return 0; };
        var cookieArray = JSON.parse(cookie);
        //console.log(cookieArray);
        var html = "";
        for(var i = 0 ; i < cookieArray.length ; i ++){
            //console.log(this.json)
            for(var j = 0 ; j < this.json.length ; j ++){
                console.log(cookieArray[i].id ,this.json[j].id)
                if(cookieArray[i].id == this.json[j].id){
                    html += `
                   <img src="${json[i].image}" alt="">
                            `;
                    break;
                }
            }
        }
        // $("#car_wrap")[0].style.cssText = 'display:block; z-index:4  ' 
        $(".cart-wrapper").html(html);
    }
    // listSum:function(){
    //     var cookie;
    //     if(!(cookie = $.cookie("shopCar"))){ 
    //         $(".totle").html(0);
    //         return 0;
    //     };
    //     var cookieArray = JSON.parse(cookie);
    //     var sum = 0;
    //     for(var i = 0 ; i < cookieArray.length ; i ++){
    //         sum += Number(cookieArray[i].num);
    //     }
    //     $(".totle").html(sum);
    //     $(".car_count").html(sum);
    // }
})

var car = new ShopCar();
car.init();