function Mygoods(){}
                                $.extend(Mygoods.prototype,{
                                    //初始化
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
                                        var oImg = document.getElementById("ximg");
                                        var oTitle = document.getElementById("title");
                                        var otImg = document.querySelector("#xiaotu");
                                        var oBimg = document.querySelector("#dimg");
                                        if(cookie("goodsId")){
                                            res=cookie("goodsId");//去cookie的velue值
                                            oImg.src =json[res].image;
                                            otImg.src =json[res].image;
                                            oBimg.src =json[res].image;
                                            oTitle.innerHTML = json[res].title;
                                        }
                                    }
                                })
                                var mygoods = new Mygoods();
                                mygoods.init();