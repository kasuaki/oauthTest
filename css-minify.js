/** gulp/css-minify.js */
module.exports = function(gulp) {
    var taskName       = 'css-minify';
    var minifyCSS      = require('gulp-minify-css');
    var concat         = require('gulp-concat');
    var srcPath        = 'app/css/*.css';
    var dstPath        = 'build/css';
    var exportFileName = 'style.css';
    var option         = { 'keepBreaks' : false };
    gulp.task(taskName, function () {
        gulp.src(srcPath)
            .pipe( concat(exportFileName) )
            .pipe( minifyCSS(option) )
            .pipe( gulp.dest(dstPath) );
    });
};
