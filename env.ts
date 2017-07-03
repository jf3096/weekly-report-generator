import {IGitSettings} from './src/models/git-log/index';

export default {
    gitlog: {
        settings: {
            repo: './',
            number: 20,
            author: `Allen`,
            fields: [`subject`, `authorName`, `authorDateRel`, `committerDate`]
        } as IGitSettings
    }
};
