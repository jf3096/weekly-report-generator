import * as gitlog from 'gitlog';
import {Moment} from 'moment';
import moment = require('moment');
import * as invariant from 'typed-invariant';

/**
 * https://github.com/domharrington/node-gitlog
 */
export interface IGitSettings {
    repo: string;
    number: number;
    author: string;
    fields: string[];
    nameStatus: boolean;
}

export interface IGitLogInfo {
    hash?: string;
    abbrevHash?: string;
    treeHash?: string;
    abbrevTreeHash?: string;
    parentHashes?: string;
    abbrevParentHashes?: string;
    authorName?: string;
    authorEmail?: string;
    authorDate?: string;
    authorDateRel?: string;
    committerName?: string;
    committerEmail?: string;
    committerDate?: Moment;
    committerDateRel?: string;
    subject?: string;
    body?: string;
}

export default class GitLog implements IGitSettings {

    private static processGitLogInfo(commits: IGitLogInfo[] = []): IGitLogInfo[] {
        return commits.map((commit) => {
            const {committerDate} = commit;
            if (typeof committerDate === `string`) {
                return {...commit, ...{committerDate: GitLog.parseCommitterDate(committerDate as any)}};
            }
            return commit;
        });
    }

    private static parseCommitterDate(committerDate: string, END_SYNTAX_REGEX = /@end@\n?$/): Moment {
        /**
         * gitlog库存在bug, 使用以下方式修正
         */
        const normalisedDateString = committerDate.replace(END_SYNTAX_REGEX, '');
        const result = moment(new Date(normalisedDateString));
        invariant(result.isValid(), `在转换moment.js时发生错误, 原始committerDate = ${committerDate}`);
        return result;
    }

    public repo: string;
    public number: number;
    public author: string;
    public fields: string[];
    public nameStatus: boolean;

    //noinspection JSUnusedGlobalSymbols
    public constructor(gitLog: IGitSettings) {
        this.repo = gitLog.repo;
        this.number = gitLog.number;
        this.author = gitLog.author;
        this.fields = gitLog.fields;
        this.nameStatus = gitLog.nameStatus;
    }

    public getGitLogInfoList(): Promise<IGitLogInfo[]> {
        return new Promise((resolve, reject) => {
            gitlog(this, (error, commits) => {
                if (error) {
                    reject(error);
                }
                error ? reject(error) : resolve(GitLog.processGitLogInfo(commits));
            });
        });
    }
}
