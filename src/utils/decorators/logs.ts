export default function log(message: string): any {
    //noinspection TsLint
    return (target: Function, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        return {
            value(...args: any[]): any {
                //noinspection TsLint
                console.log(message);
                return descriptor.value.apply(this, args);
            }
        };
    };
}
