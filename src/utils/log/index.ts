type ILogType = 'error' | 'log';

export default class Logger {
    public static error(message: string): void {
        Logger.log('error', message);
    }

    private static log(type: ILogType, message: string): void {
        console[type](message);
    }
}
