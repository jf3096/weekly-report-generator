# weekly-report-generator (WARNING: 代码最后整理中, 暂勿使用)

## 简介
由于每周的日常都需要写一份工作报告, 为了尽可能减少这种日常工作所占用的时间以及尝试tslint所带来的开发体验, 
所以开发了一个根据<b>每周git提交的注释生成局部周报的工具</b>.

## 环境
Node 6+

## 安装
```shell
npm i weekly-report-generator --save-dev #使用npm安装
```

```shell
yarn add weekly-report-generator -D #使用yarn安装
```

## 基本使用
请在项目根目录或者工作区中创建配置文件: env.js
使用js作为配置文件的好处在于能够更动态的适配各种需求, 只需要最后的时候export default一个完整的配置对象即可

参考如下: 

```javascript
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
        dest: `dist/【工作周报】广州产品组XXX（${generateBusinessDateRangeString()}）.xlsx`,
        shouldOpenAfterDest: true
    }
}
```

### LICENSE
MIT