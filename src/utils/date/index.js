"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const index_1 = require("../enviroment/index");
const invariant = require("typed-invariant");
moment.locale(`zh-cn`, {
    week: {
        dow: 1,
        doy: undefined
    }
});
if (index_1.isDev()) {
    invariant(moment().endOf('isoWeek').days() === 0, `当前时间环境变量与期待不一致, 期望每周的最后一天为Sunday, moment的序列应为0`);
}
function getBusinessStartEndDay(relativeWeek = 0) {
    return {
        startDate: moment().add(relativeWeek, 'week').startOf('isoWeek'),
        endDate: moment().add(relativeWeek, 'week').endOf('isoWeek').add(-2, 'day')
    };
}
exports.getBusinessStartEndDay = getBusinessStartEndDay;
function isWithinBusinessDay(target, relativeWeek = 0) {
    const { startDate, endDate } = getBusinessStartEndDay(relativeWeek);
    /**
     * TODO: 暂时不明白days的含义
     */
    return target.isBetween(startDate, endDate, 'days', '[]');
}
exports.isWithinBusinessDay = isWithinBusinessDay;
function generateBusinessDateRangeString(relativeWeek = 0, DATE_FORMAT = `YYYY.MM.DD`) {
    const { startDate, endDate } = getBusinessStartEndDay(relativeWeek);
    return `${startDate.format(DATE_FORMAT)}-${endDate.format(DATE_FORMAT)}`;
}
exports.generateBusinessDateRangeString = generateBusinessDateRangeString;
//# sourceMappingURL=index.js.map