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
    script = require('@arted/utils/script'),
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

            // 解析【json】文件
            if (result.endsWith('.json')) {
                return cb({
                    file: result,
                    contents: sassify(require(result))
                });
            }

            // 解析【js】文件
            if (result.endsWith('.js')) {
                return loader.loadModule(result, async (err, source) => {

                    // 处理错误
                    if (err) {
                        return cb({ file: result, contents: '' });
                    }

                    // 转化数据
                    try {
                        let data = script.runCode(source, {
                                __dirname: path.dirname(result),
                                __filename: result
                            });

                        // 返回结果
                        cb({ file: result, contents: sassify(data) });
                    } catch (err) {
                        stdout.error(err);
                        cb({ file: result, contents: '' });
                    }
                });
            }

            // 返回源路径
            return cb(result);
        });
    };
};
