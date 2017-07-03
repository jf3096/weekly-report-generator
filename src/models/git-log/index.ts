import * as gitlog from 'gitlog';
import {Moment} from 'moment';
import moment = require('moment');

/**
 * https://github.com/domharrington/node-gitlog
 */
export interface IGitSettings {
    repo: string;
    number: number;
    author: string;
    fields: string[];
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
            if (typeof commit.committerDate === `string`) {
                return Object.assign({}, commit, {committerDate: moment(commit.committerDate)});
            }
            return commit;
        });
    }

    public repo: string;
    public number: number;
    public author: string;
    public fields: string[];

    public constructor(gitLog: IGitSettings) {
        this.repo = gitLog.repo;
        this.number = gitLog.number;
        this.author = gitLog.author;
        this.fields = gitLog.fields;
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
