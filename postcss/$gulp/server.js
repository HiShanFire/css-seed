var $path = require('./config').path,
    bs = require('browser-sync');

var devServer = bs.create(),
    prodServer = bs.create()
;


module.exports = {
    dev_server : devServer,
    dev_reload : devServer.reload,
    dev : ()=>{
        devServer.init({
            server: {
                baseDir: $path.dev_server,
                directory: true
            }
        });
    },

    prod_server : prodServer,
    prod_reload : prodServer.reload,
    prod : ()=>{
        prodServer.init({
            port: 9888,
            ghostMode: false,
            server: {
                baseDir: $path.prod,
                directory: true
            }
        });
    }
};

// gulp.task('dev_server', ()=>{
//     browserSync.init({
//         server: {
//             baseDir: $path.tmp,
//             directory: true
//         }
//     });
// });


// gulp.task('distServer', ()=>{
//     var bs = require('browser-sync').create();
//     bs.init({
//         port: 9001,
//         ghostMode: false,
//         server: {
//             baseDir: $path.dist,
//             directory: true
//         }
//     })
// });