import Logger from '../utils/log/index';
import log from '../utils/decorators/logs';
import * as ExcelJS from 'exceljs';
import {getArray} from '../utils/data/index';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

interface ISheet {
    name: string;
    row: {
        count: number
    };
    column: {
        count: number
    };
    cell: (rowIndex: number, colIndex: number) => string | number;
}

interface ICell {
    value: any;
}

interface IRow {
    getCell: (colIndex: number) => ICell;
}

interface IWorksheet {
    actualColumnCount: number;
    actualRowCount: number;
    name: string;
    getRow: (rowCount: number) => IRow;
    getCell: (coordinate: string) => ICell;
}

export interface IWorkbook {
    eachSheet: (callback: (worksheet: IWorksheet) => void) => void;
    getWorksheet: (name: string) => IWorksheet;
    xlsx: any;
}

export default class Excel {

    //noinspection JSUnusedGlobalSymbols
    @log((filename: ISheet) => {
        Logger.log(`读取excel: ${filename}`);
    })
    public static async read(filename: string): Promise<any> {
        const workbook = await Excel.open(filename);
        const workbooks = {};
        workbook.eachSheet((worksheet: IWorksheet) => {
            const {actualColumnCount, actualRowCount, name} = worksheet;
            workbooks[name] = getArray(actualRowCount).reduce((storage: any[], value, rowIndex) => {
                const row = worksheet.getRow(rowIndex + 1);
                storage[rowIndex] = getArray(actualColumnCount).reduce((colStorage: any[], value, colIndex) => {
                    const cell = row.getCell(colIndex + 1);
                    return colStorage.concat(cell.value);
                }, []);
                return storage;
            }, []);
        });
    }

    //noinspection TsLint
    @log(({filename, dest}: { filename: string, dest: string }) => {
        Logger.log(`写入excel: ${filename}`);
        Logger.log(`生成excel: ${dest}`);
    })
    public static async write({filename, decorator, dest}: { filename: string, decorator: (workbook: IWorkbook) => Promise<IWorkbook>, dest: string }): Promise<void> {
        const workbook = await decorator(await Excel.open(filename));
        const destDirectory = path.dirname(dest);
        mkdirp.sync(destDirectory);
        return workbook.xlsx.writeFile(dest);
    }

    private static open(filename: string): Promise<IWorkbook> {
        const workbook = new ExcelJS.Workbook();
        return workbook.xlsx.readFile(filename);
    }
}
