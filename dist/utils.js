export const getFileNameFromPath = (url) => {
    const path = new URL(url);
    return (path.hostname + path.pathname).replace(/[^a-zA-Z0-9]/g, '-') + '.html';
};
