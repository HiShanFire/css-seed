var $path = require('./config').path,
    gulp = require('gulp'),
    newer = require('gulp-newer'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    nano = require('gulp-cssnano')
;

/* 前缀配置 */
var autoprefixer_config = ['last 2 versions'];

module.exports = {
    dev: $reload => () => {
        return gulp.src($path.dev+'/**/*.{sass,scss,css}')
            .pipe(newer($path.dev_server))
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(postcss([ autoprefixer({ browsers: autoprefixer_config}) ]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest($path.dev_server))
            .pipe($reload({stream: true}))
    },

    prod: () => {
        return gulp.src($path.pre+'/**/*.{sass,scss,css}')
            .pipe(sass())
            .pipe(postcss([ autoprefixer({ browsers: autoprefixer_config }) ]))
            .pipe(nano({zindex:false}))
            .pipe(gulp.dest($path.prod))
    }
};
