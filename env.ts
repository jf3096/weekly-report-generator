import {IGitSettings} from './src/models/git-log/index';
import {generateBusinessDateRangeString} from './src/utils/date/index';

export default {
    gitlog: {
        settings: {
            repo: 'D:/projects/ams',
            number: 20,
            author: `Allen`,
            nameStatus: false,
            fields: [`subject`, `authorName`, `authorDateRel`, `committerDate`]
        } as IGitSettings
    },
    excel: {
        reflection: {
            target: `concrete-cases/weekly-report/index.js`,
            updateAsExpected: `default.updateAsExpected`
        },
        source: `tests/1111.xlsx`,
        dest: `dist/【工作周报】广州产品组佘艾伦（${generateBusinessDateRangeString()}）.xlsx`,
        shouldOpenAfterDest: true
    }
};
