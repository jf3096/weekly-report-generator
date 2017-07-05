"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//noinspection JSUnusedGlobalSymbols
/**
 * 移除对象中不相关的属性keys
 * 以下代码来自官方babel
 *
 * @param obj 需要移除的对象
 * @param keys 需要移除的属性
 * @returns {{}} 返回一个移除后的新对象
 */
function objectWithoutProperties(obj, keys) {
    const target = {};
    for (const key in obj) {
        //noinspection JSUnfilteredForInLoop
        if (keys.indexOf(key) >= 0) {
            continue;
        }
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            continue;
        }
        target[key] = obj[key];
    }
    return target;
}
exports.objectWithoutProperties = objectWithoutProperties;
function getArray(length) {
    return Array.from({ length });
}
exports.getArray = getArray;
function loopUpObject(obj, objectPath, splitter = `.`) {
    return objectPath.split(splitter).reduce((result, objectKey) => {
        return result[objectKey];
    }, obj);
}
exports.loopUpObject = loopUpObject;
//# sourceMappingURL=index.js.map