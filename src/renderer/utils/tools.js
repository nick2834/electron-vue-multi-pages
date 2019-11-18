//将对象元素转换成字符串以作比较
function obj2key(obj, keys) {
    var n = keys.length,
        key = [];
    while (n--) {
        key.push(obj[keys[n]]);
    }
    return key.join('|');
}

//去重操作

function uniqeByKeys(array, keys) {
    var arr = [];
    var hash = {};
    for (var i = 0, j = array.length; i < j; i++) {
        var k = obj2key(array[i], keys);
        if (!(k in hash)) {
            hash[k] = true;
            arr.push(array[i]);
        }
    }
    return arr;
}
/*
 * 速度最快， 占空间最多（空间换时间）
 *
 * 该方法执行的速度比其他任何方法都快， 就是占用的内存大一些。
 * 现思路：新建一js对象以及新数组，遍历传入数组时，判断值是否为js对象的键，
 * 不是的话给对象新增该键并放入新数组。
 * 注意点：判断是否为js对象键时，会自动对传入的键执行“toString()”，
 * 不同的键可能会被误认为一样，例如n[val]-- n[1]、n["1"]；
 * 解决上述问题还是得调用“indexOf”。*/
function uniq(array) {
    var temp = {},
        r = [],
        len = array.length,
        val, type;
    for (var i = 0; i < len; i++) {
        val = array[i];
        type = typeof val;
        if (!temp[val]) {
            temp[val] = [type];
            r.push(val);
        } else if (temp[val].indexOf(type) < 0) {
            temp[val].push(type);
            r.push(val);
        }
    }
    return r;
}

//格式化时间
function formatTime(time) {
    if (typeof time !== 'number' || time < 0) {
        return time
    }

    var hour = parseInt(time / 3600)
    time = time % 3600
    var minute = parseInt(time / 60)
    time = time % 60
    var second = time

    return ([hour, minute, second]).map(function (n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    }).join(':')
}

function sortId(a, b) {
    return a.position - b.position
}

//用于生成uuid
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
    return (S4() + S4() + S4() + S4());
}

function find(list, f) {
    return list.filter(f)[0]
}

function deepCopy(obj, cache = []) {
    // just return if obj is immutable value
    // 如果不是引用类型，直接返回值，完成copy
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    // if obj is hit, it is in circular structure
    // 如果缓存中的对象和传入的对象相等，则拷贝完成，直接返回缓存中的copy值
    const hit = find(cache, c => c.original === obj)
    if (hit) {
        return hit.copy
    }

    // 如果obj是否是数组，数组的话赋值[]，否则赋值{}
    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // 将copy放入缓存
    // because we want to refer it in recursive deepCopy
    // 因为我们深拷贝的时候会用到
    cache.push({
        original: obj,
        copy
    })

    // 对obj进行遍历
    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache)
    })

    return copy
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function formatTime2(number, format) {

    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];

    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}
export {
    uniqeByKeys,
    sortId,
    uniq,
    formatTime,
    guid,
    deepCopy,
    formatTime2
}