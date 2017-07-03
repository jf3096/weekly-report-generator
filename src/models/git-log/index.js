"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gitlog = require("gitlog");
const moment = require("moment");
class GitLog {
    static processGitLogInfo(commits = []) {
        return commits.map((commit) => {
            if (typeof commit.committerDate === `string`) {
                return Object.assign({}, commit, { committerDate: moment(commit.committerDate) });
            }
            return commit;
        });
    }
    constructor(gitLog) {
        this.repo = gitLog.repo;
        this.number = gitLog.number;
        this.author = gitLog.author;
        this.fields = gitLog.fields;
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