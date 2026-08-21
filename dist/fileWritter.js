import fs from 'fs/promises';
export default (path, data) => {
    return fs.writeFile(path, data).then(() => path);
};
