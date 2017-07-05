"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gitlog = require("gitlog");
const moment = require("moment");
const invariant = require("typed-invariant");
class GitLog {
    static processGitLogInfo(commits = []) {
        return commits.map((commit) => {
            const { committerDate } = commit;
            if (typeof committerDate === `string`) {
                return Object.assign({}, commit, { committerDate: GitLog.parseCommitterDate(committerDate) });
            }
            return commit;
        });
    }
    static parseCommitterDate(committerDate, END_SYNTAX_REGEX = /@end@\n?$/) {
        /**
         * gitlog库存在bug, 使用以下方式修正
         */
        const normalisedDateString = committerDate.replace(END_SYNTAX_REGEX, '');
        const result = moment(new Date(normalisedDateString));
        invariant(result.isValid(), `在转换moment.js时发生错误, 原始committerDate = ${committerDate}`);
        return result;
    }
    //noinspection JSUnusedGlobalSymbols
    constructor(gitLog) {
        this.repo = gitLog.repo;
        this.number = gitLog.number;
        this.author = gitLog.author;
        this.fields = gitLog.fields;
        this.nameStatus = gitLog.nameStatus;
    }
    getGitLogInfoList() {
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
exports.default = GitLog;
//# sourceMappingURL=index.js.map