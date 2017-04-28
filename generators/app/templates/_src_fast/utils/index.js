import request from './request.js'
import qs from 'qs'
export {qs}
export {request}
export {_} from 'lodash'




export const formatDate = function(timestamp) {
    var date = new Date(timestamp*1000);
    var formatDate = date.getFullYear() + '/' +
                        ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
                        ('0' + date.getDate()).slice(-2) + ' ' +
                        ('0' + date.getHours()).slice(-2) + ':' +
                        ('0' + date.getMinutes()).slice(-2) + ':' +
                        ('0' + date.getSeconds()).slice(-2);
    return formatDate;
};

// 秒转化成 00:00:00 格式
export const formatSeconds = function (value) {
    var theSecond = parseInt(value);
    var theMinute = 0;
    var theHour = 0;

    if (theSecond > 60) {
        theMinute = parseInt(theSecond/60);
        theSecond = parseInt(theSecond%60);

        if (theMinute > 60) {
            theHour = parseInt(theMinute/60);
            theMinute = parseInt(theMinute%60);
        }
    }
    if (parseInt(theSecond) < 10) {
        var result = '0' + parseInt(theSecond);
    } else {
        var result = parseInt(theSecond);
    }

    if (parseInt(theMinute) > 0 && parseInt(theMinute) < 10) {
        result = '0' + parseInt(theMinute) + ':' + result;
    } else if (parseInt(theMinute) > 10){
        result = parseInt(theMinute) + ':' + result;
    } else {
        result = '00:' + result;
    }
    if (parseInt(theHour) > 0 && parseInt(theHour) < 10){
        result = '0' + parseInt(theHour) + ':' + result;
    } else if (parseInt(theHour) > 10){
        result = parseInt(theHour) + ':' + result;
    } else {
        result = '00:' + result;
    }
    return result;
};

// 返回 YYYY-MM-DD 格式的日期，若无传入timestamp则返回当前时间
export const formatDateYYYYMMDD = function(timestamp) {
    var date = timestamp ? new Date(timestamp * 1000) : new Date();
    var formatDate = [date.getFullYear(), ('0' + (date.getMonth() + 1)).slice(-2), ('0' + date.getDate()).slice(-2)].join('-');
    return formatDate;
};
/**
 * 获取对象深层的值
 * @params {Object} obj
 * @params {String} path
 * eg. getDeepValue(obj, 'a.b.c[0].name')
 */
export const getDeepValue = function(obj = {}, path = []) {
    let current = obj,
        temp = path.split('.'),
        paths = [], match = [];

    temp.forEach(function(key) {
        if (match = key.match(/(\w+)\[(\d+)\]/)) {
            paths.push(match[1]);
            paths.push(match[2]);
        } else {
            paths.push(key);
        }
    });

    for (let key of paths) {
        if (current[key] === null || current[key] === undefined) {
            return undefined;
        }
        current = current[key];
    }

    return current;
};

/**
 * 获取元素距离页面左上角的距离
 */

export const getOffset = function(el) {
    let offset = {
        left: 0,
        top: 0
    };

    while (el !== null && el !== document.documentElement) {
        offset.left += el.offsetLeft;
        offset.top  += el.offsetTop;
        el = el.offsetParent;
    }

    return offset;
};