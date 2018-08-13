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
            alias = loader.query && loader.query.alias,
            file;

        // 获取模块路径
        if (url.startsWith('~')) {
            file = url.substr(1);

            // 替换别名
            if (alias) {
                let idx = file.indexOf('/') + 1 || file.length + 1,
                    name = file.substr(0, idx - 1);

                if (name in alias) {

                    // 不存在文件
                    if (!alias[name]) {
                        return cb({ file, contents: '' });
                    }

                    // 拼接别名
                    file = alias[name] + file.substr(idx);
                }
            }
        } else {
            file = /^(\.|\/)/.test(url) ? url : './' + url;
        }

        // 解析文件路径
        loader.resolve(dir, file, (err, result) => {

            // 处理对象
            if (err) {
                return cb(url);
            }

            let [file, query] = result.split('?');

            // 解析参数
            query = query ? utils.parseQuery('?' + query) : {};

            // 解析【json】
            if (file.endsWith('.json')) {
                return cb({ file, contents: sassify(require(file), query.default) });
            }

            // 解析【js】
            if (file.endsWith('.js')) {
                let deferred = babel.load(result, {
                        context: dir,
                        reader: (...args) => loader.loadModule(...args),
                        resolver: (...args) => loader.resolve(...args)
                    });

                // 监听结果
                return deferred
                    .then(data => {
                        cb({ file, contents: sassify(data, query.default) });
                    })
                    .catch(err => {
                        stdout.error(err);
                        cb({ file, contents: '' });
                    });
            }

            // 返回源路径
            return cb(result);
        });
    };
};
