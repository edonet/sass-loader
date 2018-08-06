/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-06 13:54:17
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import style from '../dist/app';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【sass-loader】', () => {
    test('测试打包后内容', () => {
        expect(style.indexOf('color:#333')).not.toBe(-1);
        expect(style.indexOf('border-color:#aaa')).not.toBe(-1);
        expect(style.indexOf('background-color:#efefef')).not.toBe(-1);
    });
});
