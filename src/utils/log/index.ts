type ILogType = 'error' | 'log';

export default class Logger {
    public static error(message: any): void {
        Logger.print('error', message);
    }

    public static log(message: any): void {
        Logger.print('log', message);
    }

    private static print(type: ILogType, message: any): void {
        if (typeof message !== `string` || typeof message !== `number`) {
            try {
                message = JSON.stringify(message, null, 4);
            } catch (e) {
                throw new Error(`Logger.ts: message序列化失败. message = ${message}\n${e}`);
            }
        }
        console[type](message);
    }
}
