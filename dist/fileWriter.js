import fs from 'fs/promises';
const writer = (path, data) => {
    return fs.writeFile(path, data);
};
export default writer;
