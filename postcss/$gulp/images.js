var $path = require('./config').path,
    gulp = require('gulp'),
    newer = require('gulp-newer'),
    // sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant')
;

function dev_img(){
    return gulp.src($path.dev+'/**/*.{png,jpg,gif,jpeg,ico,eot,svg,ttf,woff}')
        .pipe(newer($path.dev_server))
        .pipe(gulp.dest($path.dev_server))
}

function prod_img(){
    return gulp.src($path.pre+'/**/*.{png,jpg,gif,jpeg,ico,eot,svg,ttf,woff}')
        .pipe(imagemin({
            progressive: false,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ],
            use: [pngquant()]
        }))
        .pipe(gulp.dest($path.prod))
}

module.exports = {
    dev: dev_img,
    prod: prod_img
};
