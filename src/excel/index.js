"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utils/log/index");
const logs_1 = require("../utils/decorators/logs");
const ExcelJS = require("exceljs");
const index_2 = require("../utils/data/index");
class Excel {
    //noinspection JSUnusedGlobalSymbols
    static read(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const workbook = yield Excel.open(filename);
            const workbooks = {};
            workbook.eachSheet((worksheet) => {
                const { actualColumnCount, actualRowCount, name } = worksheet;
                workbooks[name] = index_2.getArray(actualRowCount).reduce((storage, value, rowIndex) => {
                    const row = worksheet.getRow(rowIndex + 1);
                    storage[rowIndex] = index_2.getArray(actualColumnCount).reduce((colStorage, value, colIndex) => {
                        const cell = row.getCell(colIndex + 1);
                        return colStorage.concat(cell.value);
                    }, []);
                    return storage;
                }, []);
            });
        });
    }
    //noinspection TsLint
    static write({ filename, decorator, dest }) {
        return __awaiter(this, void 0, void 0, function* () {
            const workbook = yield decorator(yield Excel.open(filename));
            return workbook.xlsx.writeFile(dest);
        });
    }
    static open(filename) {
        const workbook = new ExcelJS.Workbook();
        return workbook.xlsx.readFile(filename);
    }
}
__decorate([
    logs_1.default((filename) => {
        index_1.default.log(`读取excel: ${filename}`);
    })
], Excel, "read", null);
__decorate([
    logs_1.default(({ filename, dest }) => {
        index_1.default.log(`写入excel: ${filename}`);
        index_1.default.log(`生成excel: ${dest}`);
    })
], Excel, "write", null);
exports.default = Excel;
//# sourceMappingURL=index.js.map