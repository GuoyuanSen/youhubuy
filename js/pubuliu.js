function WaterFall(){}
$.extend(WaterFall.prototype,{
    init:function(){
        // 页数;
        this.page = 1;
        // 结构外包围;
        this.main = $("#wrap100");
        // 是否在加载中;
        this.loading = false;

        this.loadJson()
        .done(function(res){
            // deferred 的 done 回调 this指向的都是 jquery 对象本身
            // console.log(res,this);
            this.renderPage(res);
        })

        this.bindEvent();
    },
    loadJson:function(){
        var opt = {
            url:"http://www.wookmark.com/api/json/popular",
            dataType:"jsonp",
            data:{page:this.page},
            // this => 指向实例化对象;
            context:this
        }
        return $.ajax(opt);
    },
    renderPage:function(json){
        // console.log(json);
        var html = "";
        for(var i = 0 ; i < json.length ; i ++){

            var height = json[i].height / (json[i].width / 220);
            if(isNaN(height)) continue; 
            html += `  <ul class="clearfix style="height:${height}px">
                            <img src="${json[i].image}" alt="">
                            <p><a href="#">MLB WATCH 手表  灰色</a></p>
                            <p> ¥259.00 </p>
                    
                   
                       </ul>
                    `
        }
        this.main.html(this.main.html() + html);
        this.sortPage();
    },
    sortPage(){
        var aBox = this.main.children();
        // console.log(aBox);
        var heightArray = [];
        for(var i = 0 ; i < aBox.length; i ++){
            // 第一排设置基准;
            if( i < 5 ){
                // console.log(aBox.eq(i));
                heightArray.push(aBox.eq(i).height());
            }else{
                // 找到数组之中最小值(第一排里面最矮的哪一个);
                // Math.min.apply => 可以取得数组之中的最小值;
                var min = Math.min.apply(false,heightArray);
                // console.log(min);
                // 最小值和最小值下标;
                var minIndex = heightArray.indexOf(min);
                aBox.eq(i).css({
                    position:"absolute",
                    top:min,
                    // 最矮的那一个元素 , 获取到left值;
                    left:aBox.eq(minIndex).offset().left
                })
                // 给最小值加上拼接之后的高度;
                heightArray[minIndex] += aBox.eq(i).height();
            }
            // 第二排,及以后;
        }
        // console.log(heightArray);
        this.loading = false;
    },
    bindEvent(){
        $(window).on("scroll",this.ifLoad.bind(this));
    },
    ifLoad(){
        // console.log(1);
        // scrollTop ;
        // 最后一张图片;
        // 当前屏幕的高度;
        var scrollTop = $("html,body").scrollTop();
        var clientHeight = $("html")[0].clientHeight;
        var lastBox = this.main.children(":last");
        // console.log(scrollTop,clientHeight,lastBox.offset());
        if(scrollTop + clientHeight > lastBox.offset().top){
            // 加载数据;
            if(this.loading){
                return 0;
            }
            this.loading = true;
            // console.log("加载");
            this.page ++;
            this.loadJson()
            .done(function(res){
                // deferred 的 done 回调 this指向的都是 jquery 对象本身
                // console.log(res,this);
                this.renderPage(res);
            })
        }
    }
})

var waterfall = new WaterFall();
waterfall.init();