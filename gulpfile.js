const gulp = require("gulp");//引用gulp
const connect = require("gulp-connect");//引用http插件
const concat = require("gulp-concat");//引用合并插件;
const uglify = require("gulp-uglify");
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass-china");
gulp.task("hello",() => {
    console.log("定义了一个hello任务");
})

//配置index.html由开发环境转存到发布环境;
// gulp.task("html",() => {
//     //html是事件名,gulp.src;找到对应的源文件,源文件就是buffer数据
//     return gulp.src("index.html").pipe(gulp.dest("dist/")).pipe(connect.reload());
//     //nodejs的方法  pipe()方法;用来安置buffer数据
//     //gulp.dest();//转存文件,如果文件夹存在,则表示进入文件夹,如果文件夹不存在,则表示创建并进入文件夹

// })
//转存js的指令,取名为:script;
// gulp.task("script",() => {
//     // return gulp.src(["script/app/*.js","script/libs/*.js","script/module/*.js"]).pipe(gulp.dest("dist/script"));
//     return gulp.src(["script/*/*.js"]).pipe(gulp.dest("dist/script"));//最多转存一级/   /** : 表示不论层级;
// })
//默认指令;     gulp +指令;
// gulp.task("default",["html","script"]);

//监测  gulp.watch; 
//当文件发生改变,自动转存文件
// gulp.task("watch",() => {
//     //如果index.html发生了改变,转存就执行html指令;
//     //如果js文件发生了改变,那么这个时候就执行script指令;
//     //gulp.watch接收两个参数,参数1监测的文件;2.文件发生变化执行的指令;
//     gulp.watch("index.html",["html"]);
// })

//=========================gulp的插件==================================
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
    return gulp.src("*.html").pipe(gulp.dest("dist/"))
    .pipe(connect.reload());//自动更新
})
gulp.task("watch", ()=>{
    gulp.watch("*.html",["script","html","sass"]);
    gulp.watch("sass/*.scss",["html","sass"]);
    gulp.watch("script/*/*.js",["script","html","sass"]);
    gulp.watch("img/*.*"["img","script","html","sass"])
})
//当发送更改时,自动加载当前文件;
gulp.task("default",["watch","connect"]);
//合并插件  gulp-concat
//images
gulp.task("img",() =>{
    return gulp.src(["img/*.png,img/*.jpg,img/*.gif"])
    .pipe(gulp.dest("dist/img"))
})
//script转存指令;
gulp.task("script",() => {
    return gulp.src(["script/app/*.js","script/module/*.js","script/libs/*.js","!script/libs/jquery.js"])//!*script.js;除了script.js文件
    .pipe(concat("main.js"))
    .pipe(uglify())
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
//压缩css
gulp.task("css",() =>{
    return gulp.src(["style/*.css"])
    .pipe(Cleancss())
    .pipe(gulp.dest("dist/css"))
})
//scss
gulp.task("sass", () =>{
    return gulp.src(["sass/*.scss"])
           .pipe(sass().on("error",sass.logError))
           .pipe(gulp.dest("dist/css"))
})
