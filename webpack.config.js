/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-06 12:06:37
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 设置配置
 *****************************************
 */
module.exports = {
    output: {
        filename: 'app.js',
        library: 'app',
        libraryTarget: 'umd'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['raw-loader', require.resolve('./lib/loader.js')]
            }
        ]
    },
    resolve: {
        alias: {
            style: require.resolve('./src/style.json')
        }
    }
};
