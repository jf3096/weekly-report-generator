import env from '../env';
import * as path from 'path';
import {IWorkbook} from '../src/excel/index';
import {loopUpObject} from '../src/utils/data/index';

type UpdateAsExpectedType = (workbook: IWorkbook) => IWorkbook;

const {target, updateAsExpected: reflectionUpdateAsExpected} = env.excel.reflection;
const workingDirectory = process.cwd();
//noinspection TsLint
const updateAsExpected: UpdateAsExpectedType = loopUpObject(require(path.resolve(workingDirectory, target)), reflectionUpdateAsExpected);
export default updateAsExpected;
