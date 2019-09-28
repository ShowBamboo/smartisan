//gulp是一个自动执行任务的工具

//我们需要编写要执行的任务

//使用gulp来自动完成这些若干任务

//任务包括但不限于 压缩JS/转换语法/压缩CSS/处理兼容/压缩图片 ......

// 压缩JS  
// 编译JS (把新语法转换ES5)
// 压缩CSS 
// 编译SASS 
// 压缩图片
// 压缩html 
// 本地服务器搭建（热部署）（实时刷新）


let gulp = require("gulp"); // 加载gulp这个模块

const uglify = require("gulp-uglify"); // 加载压缩JS的模块 gulp-uglify

const babel = require("gulp-babel"); // 加载编译JS的模块 gulp-babel,ES6转为ES5

const csso = require("gulp-csso"); // 加载编译CSS的模块 gulp-csso

const webserver = require("gulp-webserver");

const sass = require("gulp-sass");

//在执行server之前，会先执行build任务
gulp.task("server", ["build"], () => {
    gulp.src("./dist")
        .pipe(webserver({
            livereload: true,
            proxies: [{
                source: "/api",
                target: "https://shopapi.smartisan.com"
            }]
        }))
    //监听文件变化，一旦变化就执行对应的任务
    gulp.watch("./src/**/*.js", ["compileJS"]);
    gulp.watch("./src/**/*.html", ["compileHTML"]);
    gulp.watch("./src/**/*.scss", ["compileCSS"]);
})

gulp.task("build", () => {
    // base参数， 可以指定读取文件的根路径，生成文件时，会保留src后的所有路径
    gulp.src("./src/scripts/**/*.js", {
        base: "./src"
    }).pipe(gulp.dest("./dist"));

    gulp.src("./src/pages/**/*.js", {
        base: "./src"
    }).pipe(gulp.dest("./dist"));

    gulp.src("./src/pages/**/*.html", {
        base: "./src"
    }).pipe(gulp.dest("./dist"));

    gulp.src("./src/styles/**/*.scss", {
        base: "./src"
    }).pipe(sass({
        outputStyle: "expanded" //设定生成代码风格
    }).on('error', sass.logError)).pipe(gulp.dest("./dist"));

    gulp.src("./src/static/**/*.*", {
        base: "./src"
    }).pipe(gulp.dest("./dist"))
})

gulp.task("compileJS", () => {
    gulp.src("./src/**/*.js", {
            base: "./src"
        }) //读取源文件
        /* .pipe(babel({ //将新语法转为ES5
            presets: ["@babel/env"]
        }))
        .pipe(uglify()) //将文件传送给 压缩工具进行压缩 */
        .pipe(gulp.dest("./dist")) //将压缩后的内容，生成一个新文件
});

gulp.task("compileHTML", () => {
    gulp.src("./src/**/*.html", {
        base: "./src"
    }).pipe(gulp.dest("./dist"))
})

gulp.task("compileCSS", () => {
    gulp.src("./src/**/*.scss", {
            base: "./src"
        }).pipe(sass({
            outputStyle: "expanded" //设定生成代码风格
        }).on('error', sass.logError))
        // .pipe(csso())
        .pipe(gulp.dest("./dist"))
})