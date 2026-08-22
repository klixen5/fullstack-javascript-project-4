import axios from 'axios';
import path from 'node:path';
import writer from './fileWriter.js';
const getFileNameHtml = (url) => {
    const path = new URL(url);
    const pathname = path.pathname === '/' ? '' : path.pathname;
    return (path.hostname + pathname).replace(/[^a-zA-Z0-9]/g, '-') + '.html';
};
const fetchHtml = (url) => {
    return axios
        .get(url)
        .then(response => response.data);
};
const htmlLoader = (url, dirPath) => {
    const fileName = getFileNameHtml(url);
    const fullPath = path.join(dirPath, fileName);
    return fetchHtml(url)
        .then(data => writer(fullPath, data))
        .then(() => fullPath);
};
export { getFileNameHtml, fetchHtml };
export default htmlLoader;
