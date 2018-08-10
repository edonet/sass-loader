/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-06 10:17:08
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    path = require('path'),
    utils = require('loader-utils'),
    babel = require('@arted/babel'),
    stdout = require('@arted/utils/stdout'),
    sassify = require('./sassify');


/**
 *****************************************
 * 【js】加载器
 *****************************************
 */
module.exports = function createImporter(loader) {
    return function importer(url, context, cb) {
        let dir = path.dirname(context),
            file = (
                url.startsWith('~') ?
                url.substr('1') :
                /^(\.|\/)/.test(url) ? url : './' + url
            );

        // 解析文件路径
        loader.resolve(dir, file, (err, result) => {

            // 处理对象
            if (err) {
                return cb(url);
            }

            let [file, query] = result.split('?');

            // 解析参数
            query = query ? utils.parseQuery('?' + query) : {};

            // 解析模块
            try {
                let data = resolveFile(file);

                if (data) {
                    return cb({ file, contents: sassify(data, query.default) });
                }
            } catch (err) {
                stdout.error(err);
                return cb({ file, contents: '' });
            }

            // 返回源路径
            return cb(result);
        });
    };
};


/**
 *****************************************
 * 解析文件
 *****************************************
 */
function resolveFile(file) {
    return (
        file.endsWith('.json') ?
        require(file) :
        file.endsWith('.js') ?
        babel.executeFile(file) :
        null
    );
}
