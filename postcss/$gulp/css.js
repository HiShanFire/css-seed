var $path = require('./config').path,
    gulp = require('gulp'),
    // newer = require('gulp-newer'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    precss = require('precss'),
    autoprefixer = require('autoprefixer'),
    nano = require('gulp-cssnano'),
    calccss = require('postcss-calc'),
    // sprites = require('postcss-sprites').default,
    // spritesUpdateRule = require('postcss-sprites').updateRule
    path = require('path')
;

/* postcss插件配置 */
var processors = [
    precss,
    calccss,
    autoprefixer({
        browsers: ['last 2 versions']
    })
];

// css sprite
// var initSprite = opts => {
//     var sp;
//     sp = sprites({
//         stylesheetPath: opts.stylesheetPath,
//         spritePath: './dist/images/sprites/',
//         filterBy: function(image) {
//             if(image.url.indexOf('sprites/') == -1){
//                 return Promise.reject();
//             }
//             return Promise.resolve();
//         },
//         groupBy: function(image){
//             if(/sprites\/.+@/.test(image.url)){
//                 return Promise.resolve( image.url.match(/sprites\/(.*)!/)[1] );
//             }
//             return Promise.reject();
//         }
//     });
//     return sp;
// }

module.exports = {
    dev: $reload => () => {
        // processors.push(initSprite({
        //     stylesheetPath: $path.dev_server,
        //     spritePath: $path.dev_server + '/images/sprites/'
        // }));
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
