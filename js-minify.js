/** gulp/js-minify.js */
module.exports = function(gulp) {
    var taskName       = 'js-minify';
    var uglify         = require('gulp-uglify');
    var concat         = require('gulp-concat');
    var srcPath        = 'app/scripts/*.js';
    var dstPath        = 'dist/scripts';
    var exportFileName = 'script.js';
    gulp.task(taskName, function () {
        gulp.src(srcPath)
            .pipe( concat(exportFileName) )
            .pipe( uglify() )
            .pipe( gulp.dest(dstPath) );
    });
};
