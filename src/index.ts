import log from './utils/decorators/logs';
import env from '../env';
import Excel from './excel/index';
import * as path from 'path';
import updateAsExpected from '../concrete-cases/index';
import * as open from 'open';
import Logger from './utils/log/index';

function getAbsFileFromWorkingDirectory(relativePath: string): string {
    return path.resolve(process.cwd(), relativePath);
}

export default class Workflow {
    @log(`开始执行...`)
    public static async start(): Promise<void> {
        const {source, dest, shouldOpenAfterDest} = env.excel;
        await Excel.write({
            filename: getAbsFileFromWorkingDirectory(source),
            decorator: async (workbook) => {
                return updateAsExpected(workbook);
            },
            dest: getAbsFileFromWorkingDirectory(dest)
        });
        if (shouldOpenAfterDest) {
            await Workflow.openDestFile(getAbsFileFromWorkingDirectory(dest));
        }
    }

    @log((filename: string) => {
        Logger.log(`打开指定文件: ${filename}`);
    })
    public static async openDestFile(filename: string): Promise<void> {
        open(filename);
    }
}
