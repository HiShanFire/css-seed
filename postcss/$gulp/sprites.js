var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    spritesmith = require('gulp.spritesmith'),
    buffer = require('vinyl-buffer'),
    merge = require("merge-stream"),
    concatCss = require('gulp-concat-css')
;

module.exports = {
    init : (opts) => () => {
        // var _path = path.join('src', 'images/sprites');
        var _files = fs.readdirSync(opts.path);
        // 默认一个通用sprite设置
        var spritesArr = [{ path:opts.path, name:'common.min'}];
        _files.forEach( (file) => {
            var pathName = path.join(opts.path, file);
            // 存在分组目录
            if(fs.statSync(pathName).isDirectory()){
                spritesArr.push({
                    path: pathName,
                    name: file
                })
            }
        })

        var cssStreamArr = [];

        spritesArr.forEach( (row, index) => {
            var src = row.path;
            // 分组目录遍历所有后代
            if(index === 0){
                src += '/*.{jpg,png}'
            }else{
                src += '/**/*.{jpg,png}'
            }

            var rowStream = gulp.src(src)
                .pipe(spritesmith({
                    imgName: row.name+'.png',
                    cssName: '_'+row.name+'.css',
                    cssTemplate : '$gulp/handlebarsStr.css.handlebars'
                }))

            cssStreamArr.push(rowStream.css)
            rowStream.css.pipe(gulp.dest(opts.cssDist))

            rowStream.img
                .pipe(buffer())
                // .pipe()mini
                .pipe(gulp.dest(opts.imgDist))
        })

        return merge.apply(this, cssStreamArr).pipe(concatCss('_mixin.sprite.css')).pipe(gulp.dest(opts.cssDist))
    }
}
