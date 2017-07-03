"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    static error(message) {
        Logger.log('error', message);
    }
    static log(type, message) {
        console[type](message);
    }
}
exports.default = Logger;
//# sourceMappingURL=index.js.map