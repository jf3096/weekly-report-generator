"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    static error(message) {
        Logger.print('error', message);
    }
    static log(message) {
        Logger.print('log', message);
    }
    static print(type, message) {
        if (typeof message !== `string` || typeof message !== `number`) {
            try {
                message = JSON.stringify(message, null, 4);
            }
            catch (e) {
                throw new Error(`Logger.ts: message序列化失败. message = ${message}\n${e}`);
            }
        }
        console[type](message);
    }
}
exports.default = Logger;
//# sourceMappingURL=index.js.map