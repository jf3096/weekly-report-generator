import {IWorkbook} from '../../src/excel/index';
import {generateBusinessDateRangeString, isWithinBusinessDay} from '../../src/utils/date/index';
import {default as GitLog, IGitLogInfo, IGitSettings} from '../../src/models/git-log/index';
import log from '../../src/utils/decorators/logs';
import env from '../../env';

export default //noinspection JSUnusedGlobalSymbols
class WeeklyReport {
    //noinspection JSUnusedGlobalSymbols
    public static async updateAsExpected(workbook: IWorkbook): Promise<IWorkbook> {
        const worksheet = workbook.getWorksheet(`Sheet1`);
        worksheet.getCell(`A3`).value = `本周工作总结（${WeeklyReport.generateBusinessDateRangeString()}）`;
        worksheet.getCell(`A7`).value = `下周工作计划（${WeeklyReport.generateBusinessDateRangeString(1)}）`;
        worksheet.getCell(`O5`).value = await WeeklyReport.getWeeklyWorkDescriptionsFromGit();
        return workbook;
    }

    private static async getWeeklyWorkDescriptionsFromGit(): Promise<string> {
        const {gitlog} = env;
        const gitLogInfoList = await WeeklyReport.getGitLogInfoList(gitlog.settings);
        return gitLogInfoList.map((gitLogInfo, index) => {
            return `${index + 1}. ${gitLogInfo.subject}`;
        }).join(`\n`);
    }

    private static generateBusinessDateRangeString(relativeWeek: number = 0, DATE_FORMAT = `YYYY.MM.DD`): string {
        return generateBusinessDateRangeString(relativeWeek, DATE_FORMAT);
    }

    private static filterByBusinessDay(gitLogInfoList: IGitLogInfo[], relativeWeek: number = 0): IGitLogInfo[] {
        return gitLogInfoList.reduce((result, gitLogInfo) => {
            const {committerDate} = gitLogInfo;
            if (isWithinBusinessDay(committerDate, relativeWeek)) {
                result.push(gitLogInfo);
            }
            return result;
        }, [] as IGitLogInfo[]);
    }

    @log(`获取git相关日志...`)
    private static async getGitLogInfoList(gitLogSettings: IGitSettings): Promise<IGitLogInfo[]> {
        const gitLog = new GitLog(gitLogSettings);
        const gitLogInfoList = await gitLog.getGitLogInfoList();
        return WeeklyReport.filterByBusinessDay(gitLogInfoList);
    }
}
