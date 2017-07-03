import log from './utils/decorators/logs';
import GitLog, {IGitLogInfo, IGitSettings} from './models/git-log/index';
import env from '../env';
import {getBusinessStartEndDay, isWithinBusinessDay} from './utils/date/index';

export default class Workflow {

    @log(`开始执行...`)
    public static async start(): Promise<void> {
        const {gitlog} = env;
        const gitLogInfoList = await Workflow.getGitLogInfoList(gitlog.settings);
        console.log(gitLogInfoList);
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
        return Workflow.filterByBusinessDay(gitLogInfoList);
    }
}
