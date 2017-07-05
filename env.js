"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./src/utils/date/index");
exports.default = {
    gitlog: {
        settings: {
            repo: 'D:/projects/ams',
            number: 20,
            author: `Allen`,
            nameStatus: false,
            fields: [`subject`, `authorName`, `authorDateRel`, `committerDate`]
        }
    },
    excel: {
        reflection: {
            target: `concrete-cases/weekly-report/index.js`,
            updateAsExpected: `default.updateAsExpected`
        },
        source: `tests/1111.xlsx`,
        dest: `dist/【工作周报】广州产品组XXX（${index_1.generateBusinessDateRangeString()}）.xlsx`,
        shouldOpenAfterDest: true
    }
};
//# sourceMappingURL=env.js.map