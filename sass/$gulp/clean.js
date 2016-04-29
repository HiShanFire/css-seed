var $path = require('./config').path,
    del = require('del');

module.exports = {
    dev: ()=>{
        return del([$path.dev_server + '/**/*'] );
    },

    prod: ()=>{
        return del([$path.prod + '/**/*'] );
    }
};
