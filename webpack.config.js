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
                use: [
                    'raw-loader',
                    {
                        loader: require.resolve('./lib/loader.js'),
                        options: {
                            alias: {
                                alias_style: require.resolve('./src/alias_style.js'),
                                alias: null
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            style: require.resolve('./src/style.json')
        }
    }
};
