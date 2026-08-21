import { getFileNameFromPath } from './utils.js';
import fileWritter from './fileWritter.js';
import fetcher from './fetcher.js';
export default (url, path) => {
    const fileName = getFileNameFromPath(url);
    return fetcher(url)
        .then(data => fileWritter(fileName, data));
};
