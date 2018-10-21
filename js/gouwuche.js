function ShopCar(){}
$.extend(ShopCar.prototype,{
    init:function(){
        this.main = $("#today_now_goods")
        this.loadJson()
        .done(function(res){
            this.addData(res);;
        })
        this.bindEvent();
        this.listSum();
        // console.log($(".car_box>div"));
    },
    loadJson:function(){
        var opt = {
            url:"https://list.mogujie.com/search",
            dataType:"jsonp",
            data:{page:this.page},
            context:this
        }
        return $.ajax(opt);
    },
    bindEvent:function(){
        $("#today_now_goods").on("click","button",this.addCar.bind(this));
        $(".car_box").on("mouseenter",this.showList.bind(this));
        $(".car_box>div").on("mouseleave",function(){
            $(".goods_list").children().remove();
        });
        $(".car_box>div").on("click",function(event){
            var target = event.target ; 
            if(target != $(".car_box>div")[0]) return 0;

            $.removeCookie("shopCar");
            // 执行鼠标移出事件;
            $(".car_box>div").triggerHandler("mouseleave");
            this.listSum();
        }.bind(this));
        $(".car_box>div").on("click",function(){
            location.href = "gouwuche.html";
        })
        
    },
    addData:function(json1){
        this.json=json1.result.wall.list;
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
            // console.log(cookieArray,cookieArray.length);
            for(var i = 0 ; i < cookieArray.length ; i ++){
                if(cookieArray[i].iid == goodsId ) {
                    hasGoods = true;
                    cookieArray[i].num ++;
                    break;

                }
            }
            if(hasGoods == false){
                var goods = {
                    iid : goodsId,
                    num : "1"
                }
                cookieArray.push(goods);
            }
            $.cookie("shopCar",JSON.stringify(cookieArray));
        }else{
            $.cookie("shopCar",`[{"iid":"${goodsId}","num":"1"}]`);
        }
        //console.log($.cookie("shopCar"));
        this.listSum();
    }
    ,
    showList:function(event){
        var target = event.target;
        if(target != $(".car_box>div")[0]) return 0;
        //console.log($(".car_box>div"));
        var cookie;
        if(!(cookie = $.cookie("shopCar"))){ return 0; };
        var cookieArray = JSON.parse(cookie);
        //console.log(cookieArray);
        var html = "";
        for(var i = 0 ; i < cookieArray.length ; i ++){
            //console.log(this.json)
            for(var j = 0 ; j < this.json.length ; j ++){
                if(cookieArray[i].iid == this.json[j].iid){
                    html += `
                    <li class="btn_cart">
                        <div class="cart_con_over cart_con_single">
                            <div class="single_pic">
                                <a href="javascript:void(0)">
                                    <img src="${this.json[j].show.img}">
                                </a>
                            </div>
                            <div class="single_info">
                                <a href="javascript:void(0)" class="name">${this.json[j].title}</a>
                                <span class="price">${this.json[j].price}</span>
                                <span class="price_plus"> x </span>
                                <span class="price_num">${cookieArray[i].num}</span>
                            </div>
                        </div>
                            `;
                    break;
                }
            }
        }
        // $("#car_wrap")[0].style.cssText = 'display:block; z-index:4  ' 
        $(".goods_list").html(html);
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