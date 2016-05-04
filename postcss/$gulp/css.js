var $path = require('./config').path,
    gulp = require('gulp'),
    // newer = require('gulp-newer'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    precss = require('precss'),
    autoprefixer = require('autoprefixer'),
    nano = require('gulp-cssnano'),
    calccss = require('postcss-calc'),
    sprites = require('postcss-sprites').default
;

/* postcss插件配置 */
var processors = [
    precss,
    calccss,
    autoprefixer({
        browsers: ['last 2 versions']
    }),
    // css sprite
    sprites({
        stylesheetPath: './dist',
        spritePath: './dist/images/sprites/',
        filterBy: function(image) {
            if(image.url.indexOf('sprites/') == -1){
                return Promise.reject();
            }
            return Promise.resolve();
        },
        groupBy: function(image){
            if(/sprites\/.+@/.test(image.url)){
                return Promise.resolve( image.url.match(/sprites\/(.*)@/)[1] );
            }
            return Promise.reject();
        }
    })
];

module.exports = {
    dev: $reload => () => {
        return gulp.src($path.dev+'/**/!(_)*.css')
            // .pipe(newer({dest:$path.dev_server, ext:'.css'}))
            .pipe(sourcemaps.init())
            .pipe(postcss(processors))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest($path.dev_server))
            .pipe($reload({stream: true}))
    },

    prod: () => {
        return gulp.src($path.pre+'/**/!(_)*.css')
            .pipe(postcss(processors))
            .pipe(nano({zIndex:false}))
            .pipe(gulp.dest($path.prod))
    }
};
