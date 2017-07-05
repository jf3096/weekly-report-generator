import * as moment from 'moment';
import {isDev} from '../enviroment/index';
import * as invariant from 'typed-invariant';
import {Moment} from 'moment';

moment.locale(`zh-cn`, {
    week: {
        dow: 1,
        doy: undefined
    }
});

if (isDev()) {
    invariant(moment().endOf('isoWeek').days() === 0, `当前时间环境变量与期待不一致, 期望每周的最后一天为Sunday, moment的序列应为0`);
}

interface IBusinessStartEndDay {
    startDate: Moment;
    endDate: Moment;
}

export function getBusinessStartEndDay(relativeWeek: number = 0): IBusinessStartEndDay {
    return {
        startDate: moment().add(relativeWeek, 'week').startOf('isoWeek'),
        endDate: moment().add(relativeWeek, 'week').endOf('isoWeek').add(-2, 'day')
    };
}

export function isWithinBusinessDay(target: Moment, relativeWeek: number = 0): boolean {
    const {startDate, endDate} = getBusinessStartEndDay(relativeWeek);
    /**
     * TODO: 暂时不明白days的含义
     */
    return target.isBetween(startDate, endDate, 'days', '[]');
}

export function generateBusinessDateRangeString(relativeWeek: number = 0, DATE_FORMAT = `YYYY.MM.DD`): string {
    const {startDate, endDate} = getBusinessStartEndDay(relativeWeek);
    return `${startDate.format(DATE_FORMAT)}-${endDate.format(DATE_FORMAT)}`;
}
