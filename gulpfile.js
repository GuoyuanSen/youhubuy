// gulp 的插件;

// 1. http插件; (服务器插件);
// gulp connect;
const gulp = require("gulp");
// gulp 服务器插件;
const connect = require("gulp-connect");
// gulp 合并插件;
 var concat = require('gulp-concat');
// // gulp 压缩插件;
 var uglify = require("gulp-uglify");
// // babel 插件;
 var babel = require("gulp-babel");
// // css 插件;
 var cleanCss = require("gulp-clean-css");
// // sass 编译插件;
 var sass = require("gulp-sass-china");

//http插件;gulp-connect
gulp.task("connect",function(){
    connect.server({
        port:8888,
        root:"dist/",
        livereload:true,
        //中间件,服务器插件gulp-connect-proxy
        //localhost:8888/proxy/目标域名;
        middleware: function (connect, opt) {
            var Proxy = require('gulp-connect-proxy');
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
        }
    })
});
gulp.task("html",() => {
    return gulp.src("*.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());//自动更新
})
gulp.task("js", ()=>{
    return gulp.src("js/*.js")
    // .pipe(js().on("error",js.logError))
    .pipe(gulp.dest("dist/js")).pipe(connect.reload());
})
gulp.task("watch", ()=>{
    gulp.watch("*.html",["html","html"]);
    gulp.watch("js/*.js",["html","js"]);
    gulp.watch("sass/*.scss",["html","sass"]);
    gulp.watch("css/*.css",["html","css"]);
    gulp.watch("php/**",["html","css","js","img","php","icon"]);
    gulp.watch("img/*.*"["img","html"])
    // gulp.watch("js/*.js",["html","js"]);
})
//当发送更改时,自动加载当前文件;
gulp.task("default",["watch","connect"]);
//合并插件  gulp-concat
//images
gulp.task("img",() =>{
    return gulp.src("img/*")
    .pipe(gulp.dest("dist/img")).pipe(connect.reload());;
})

gulp.task("css", ()=>{
    return gulp.src(["css/*.css"])
           .pipe(cleanCss())
           .pipe(gulp.dest("dist/css"))
           .pipe(connect.reload());
})

gulp.task("php", ()=>{
    return gulp.src(["php/**"]).pipe(gulp.dest("dist/php")).pipe(connect.reload());;
})
//scss
gulp.task("sass", () =>{
    return gulp.src(["sass/*.scss"])
           .pipe(sass().on("error",sass.logError))
           .pipe(gulp.dest("dist/css"))
})

gulp.task("icon",()=>{
    return gulp.src(["iconfonnt/**"])   
    .pipe(
        gulp.dest("dist/iconfont/")
    )
})

//script转存指令;
gulp.task("script",() => {
    return gulp.src(["script/app/*.js","script/module/*.js","script/libs/*.js","!script/libs/jquery.js"])//!*script.js;除了script.js文件
    // .pipe(concat("main.js"))
    // .pipe(uglify())
    .pipe(gulp.dest("dist/script"));
})
// gulp.task("script",()=>{
//     return gulp.src("js/*.js")
//     .pipe(gulp.dest("dist/js"))
// })

//压缩插件 gulp-uglify

//编译 ES6=>ES5        gulp-babel插件
gulp.task("es6",() => {
    return gulp.src("script/es2015/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/script"));
})

