import Logger from '../log/index';

type VoidFunctionType = (args: any) => void;
type ParamType = string | VoidFunctionType;

function handleMessage(param: ParamType, {args, context}: any): void {
    const type = typeof param;
    switch (type) {
        case `string`:
            Logger.log(param as string);
            break;
        case `function`: {
            (param as VoidFunctionType).apply(context, args);
            break;
        }
        default:
            throw new Error(`decorators/logs.ts: 发现未处理log参数类型`);
    }
}

export default function log(param: ParamType): any {
    //noinspection TsLint
    return (target: Function, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        return {
            value(...args: any[]): any {
                handleMessage(param, {args, context: this});
                return descriptor.value.apply(this, args);
            }
        };
    };
}
