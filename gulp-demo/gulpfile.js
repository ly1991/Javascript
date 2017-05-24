/**
 * Created by ly on 17/4/12.
 */
var gulp = require('gulp');
    // less = require('gulp-less');
    // minify = require('gulp-minify');
    // del = require('del');
    // cwd = process.cwd();
    // copy = require('copy');
    // uglify = require('gulp-uglify');
    // concat = require('gulp-concat');
    // minifyCSS = require('gulp-minify-css');
    // imgmin = require('gulp-imagemin');
    // htmlmin = require('gulp-htmlmin');
    // htmlReplace = require("gulp-html-replace");
    connect = require('gulp-connect');


// 复制文件
gulp.task('clean',function (cb) {
    del('build/*');
    cb();
});

//复制文件
gulp.task('copy',function (cb) {
    copy('js/*','build',cb);
});

//压缩合并js文件
gulp.task('uglifyjs',function () {
    gulp.src(['js/*.js'])
        .pipe(uglify())
        .pipe(concat('helloWorld.js'))
        .pipe(gulp.dest('dest/js'))
});

//压缩css文件
gulp.task('cssmin',function () {
    gulp.src('css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dest/css/'))
});

//压缩图片
gulp.task('imgmin',function () {
    gulp.src('img/*.jpg')
        .pipe( imgmin({
            progressive:true
        }) )
        .pipe(gulp.dest('dest/img'))
});

gulp.task('htmlmin', function () {
    var options = {
        collapseWhitespace: true,//压缩HTML
        //省略布尔属性的值 <input checked="true"/> ==> <input />
        collapseBooleanAttributes: false,
        //删除所有空格作属性值 <input id="" /> ==> <input />
        removeEmptyAttributes: true,
        //删除<script>的type="text/javascript"
        removeScriptTypeAttributes: true,
        //删除<style>和<link>的type="text/css"
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('index.html')
        .pipe( htmlReplace({
            'datasjs': 'datas/datas.js',
            'mainjs': 'js/main.js'
        }) )
        .pipe( htmlmin(options) )
        .pipe( gulp.dest('dest/') );
});



gulp.task('testLess', function () {
    gulp.src('less/style.less')
    // gulp.src(['less/**/*.less','!less/{extend,page}/*.less'])
        .pipe(less())
        .pipe(gulp.dest('./css'));
});


gulp.task('testJs',function () {
    gulp.src('js/*.js')
        .pipe(minify({
            ext:{
                src:'-min.js',
                min:'.js'
            },
            // exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('./build'));

});

gulp.task('watch',function () {
    gulp.watch('js/*.js', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('connect', function() {
    connect.server({
        root:'v',
        livereload: true,
        port: 1234
    });
});


