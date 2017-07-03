import Workflow from './src/index';
import Logger from './src/utils/log/index';

(async () => {
    try {
        await Workflow.start();
    } catch (e) {
        Logger.error(e);
    }
})();
