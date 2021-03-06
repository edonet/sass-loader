/**
 *****************************************
 * Created by lifx
 * Created on 2017-09-12 10:16:26
 *****************************************
 */
'use strict';



/**
 *****************************************
 * 将对象解析为【sass】变量
 *****************************************
 */
function sassify(data, def) {

    // 返回字符串
    if (typeof data === 'string') {
        return data;
    }

    // 处理对象
    if (typeof data === 'object') {

        // 处理数组
        if (Array.isArray(data)) {
            return data.map(v => sassify(v, def)).join('\n');
        }

        let keys = Object.keys(data),
            code = '';

        // 生成【sass】代码
        for (let name of keys) {
            if (name === 'default') {
                code += sassify(data.default, def);
            } else {
                code += `$${ name }: ${ data[name] }${ def ? ' !default' : ''};\n`;
            }
        }

        // 返回代码
        return code;
    }

    // 默认为空
    return '';
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = sassify;
