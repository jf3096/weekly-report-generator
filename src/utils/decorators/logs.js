"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function log(message) {
    //noinspection TsLint
    return (target, key, descriptor) => {
        return {
            value(...args) {
                //noinspection TsLint
                console.log(message);
                return descriptor.value.apply(this, args);
            }
        };
    };
}
exports.default = log;
//# sourceMappingURL=logs.js.map