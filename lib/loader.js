/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-06 10:07:17
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    utils = require('loader-utils'),
    sassLoader = require('sass-loader'),
    createImporter = require('./importer');


/**
 *****************************************
 * 【sass】加载器
 *****************************************
 */
module.exports = function loader(...args) {
    let options = utils.getOptions(this) || {},
        sassImporter = createImporter(this),
        proxy = Object.create(this, {
            minimize: {
                get() { return true; }
            },
            query: {
                get() { return options; }
            }
        });

    // 添加加载器
    if (options.importer) {
        options.importer.unshift(sassImporter);
    } else {
        options.importer = [sassImporter];
    }


    // 加载内容
    return sassLoader.apply(proxy, args);
};
