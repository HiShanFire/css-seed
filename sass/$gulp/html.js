var $path = require('./config').path,
    gulp = require('gulp'),
    fileinclude = require('gulp-file-include')
;

module.exports = {
    dev: ()=>{
        return gulp.src($path.dev +'/**/*.html')
            //.pipe(newer($path.dev_server, {extension: '.html'}))
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest($path.dev_server))
    },

    prod: ()=>{
        return gulp.src($path.pre +'/**/!(_)*.html')
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest($path.prod));
    }
};
