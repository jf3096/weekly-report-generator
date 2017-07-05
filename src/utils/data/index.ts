//noinspection JSUnusedGlobalSymbols
/**
 * 移除对象中不相关的属性keys
 * 以下代码来自官方babel
 *
 * @param obj 需要移除的对象
 * @param keys 需要移除的属性
 * @returns {{}} 返回一个移除后的新对象
 */
export function objectWithoutProperties<T>(obj: T, keys: keyof T[]): Partial<T> {
    const target = {} as Partial<T>;
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

export function getArray(length: number): Array<{}> {
    return Array.from({length});
}

export function loopUpObject<T>(obj: T, objectPath: string, splitter: string = `.`): T {
    return objectPath.split(splitter).reduce((result, objectKey) => {
        return result[objectKey];
    }, obj);
}
