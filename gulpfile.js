'use strict';
// generated on 2014-10-29 using generator-gulp-webapp 0.1.0

var gulp          = require('gulp');
var glob          = require('glob');
var path          = require('path');
var flatten       = require('flatten');
var concat        = require('gulp-concat');
//var uglify        = require('uglify');
var less          = require('gulp-less');
var sass          = require('gulp-ruby-sass')
var cssimport     = require('gulp-cssimport');
var minifyCss     = require('gulp-minify-css');
var streamqueue   = require('streamqueue');
var debug         = require('gulp-debug');
var autoprefix    = require('gulp-autoprefixer')
var notify        = require('gulp-notify')
var bower         = require('gulp-bower');
var gutil         = require("gulp-util");
var webpack       = require("webpack");
var webpackConfig = require("./webpack.config.js");


// load plugins
var $ = require('gulp-load-plugins')();

require('./js-minify.js')(gulp);
require('./css-minify.js')(gulp);


var config = {
    sassPath: './app/css/',
    bowerDir: './app/bower_components/',
    fontPath: '../cakephp-2.5.5/app/webroot/fonts/',
    cssPath: '../cakephp-2.5.5/app/webroot/css/',
}

gulp.task('bower', function() {

    return bower()
        .pipe(gulp.dest(config.bowerDir))
        .pipe($.size());
});

gulp.task('icons', function() {

    return gulp.src(config.bowerDir + 'fontawesome/fonts/**.*')
//        .pipe(debug({verbose: true}))
        .pipe(gulp.dest(config.fontPath));
});

gulp.task('css', function() {

    return gulp.src([
//    config.sassPath + 'cake.generic.scss'
                config.bowerDir + 'bootstrap-sass-official/vendor/assets/stylesheets/**/*.scss',
                config.bowerDir + 'fontawesome/scss/**/*.scss',
    ])
        .pipe(sass({
            style: 'compressed',
//            loadPath: [
//                './resources/sass',
//                config.bowerDir + 'bootstrap-sass-official/vender/assets/stylesheets',
//                config.bowerDir + 'fontawesome/scss',
//            ]
        })
            .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            })))
        .pipe(autoprefix('last 2 version'))
//        .pipe(flatten())
//        .pipe(concat())
//        .pipe(uglify())
        .pipe(gulp.dest(config.cssPath))
        .pipe($.size());
});

//gulp.task('css', function () {
//    gulp.src(['./app/**/*.scss'])
//        .pipe($.rubySass({
//            style: 'expanded',
//            precision: 10
//        }))
//        .pipe($.autoprefixer('last 1 version'))
//        .pipe(gulp.dest('.tmp/css/'))
//        .pipe($.size());
//});

gulp.task('js', function () {
    return gulp.src('app/js/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size());
});

gulp.task('html', ['css', 'js'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('../cakephp-2.5.5/app/webroot'))
        .pipe($.size());
});

gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'))
        .pipe($.size());
});

//gulp.task('fonts', function () {
//    return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
//        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
//        .pipe($.flatten())
//        .pipe(gulp.dest('dist/fonts'))
//        .pipe($.size());
//});

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html'], { dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['bower', 'icons', 'css', 'webpack:build', 'img', 'extras']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('app'))
        .use(connect.static('.tmp'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect', 'css'], function () {
    require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/css/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/css'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components',
            exclude: ['bootstrap-sass-official']
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        'app/*.html',
        '.tmp/css/**/*.css',
        'app/js/**/*.js',
        'app/img/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/css/**/*.scss', ['css']);
    gulp.watch('app/js/**/*.js', ['js']);
    gulp.watch('app/img/**/*', ['img']);
    gulp.watch('bower.json', ['wiredep']);
});

gulp.task("webpack:build", ['css', 'js'], function(callback) {

	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});
