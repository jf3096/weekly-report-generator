"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../log/index");
function handleMessage(param, { args, context }) {
    const type = typeof param;
    switch (type) {
        case `string`:
            index_1.default.log(param);
            break;
        case `function`: {
            param.apply(context, args);
            break;
        }
        default:
            throw new Error(`decorators/logs.ts: 发现未处理log参数类型`);
    }
}
function log(param) {
    //noinspection TsLint
    return (target, key, descriptor) => {
        return {
            value(...args) {
                handleMessage(param, { args, context: this });
                return descriptor.value.apply(this, args);
            }
        };
    };
}
exports.default = log;
//# sourceMappingURL=logs.js.map