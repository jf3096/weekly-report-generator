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
const logs_1 = require("./utils/decorators/logs");
const env_1 = require("../env");
const index_1 = require("./excel/index");
const path = require("path");
const index_2 = require("../concrete-cases/index");
const open = require("open");
const index_3 = require("./utils/log/index");
function getAbsFileFromWorkingDirectory(relativePath) {
    return path.resolve(process.cwd(), relativePath);
}
class Workflow {
    static start() {
        return __awaiter(this, void 0, void 0, function* () {
            const { source, dest, shouldOpenAfterDest } = env_1.default.excel;
            yield index_1.default.write({
                filename: getAbsFileFromWorkingDirectory(source),
                decorator: (workbook) => __awaiter(this, void 0, void 0, function* () {
                    return index_2.default(workbook);
                }),
                dest: getAbsFileFromWorkingDirectory(dest)
            });
            if (shouldOpenAfterDest) {
                yield Workflow.openDestFile(getAbsFileFromWorkingDirectory(dest));
            }
        });
    }
    static openDestFile(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            open(filename);
        });
    }
}
__decorate([
    logs_1.default(`开始执行...`)
], Workflow, "start", null);
__decorate([
    logs_1.default((filename) => {
        index_3.default.log(`打开指定文件: ${filename}`);
    })
], Workflow, "openDestFile", null);
exports.default = Workflow;
//# sourceMappingURL=index.js.map