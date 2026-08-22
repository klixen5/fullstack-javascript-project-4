import axios from 'axios'
import path from 'node:path'

import writer from './fileWriter.js'

const getFileNameHtml = (url: string): string => {
  const path = new URL(url)
  const pathname = path.pathname === '/' ? '' : path.pathname
  return (path.hostname + pathname).replace(/[^a-zA-Z0-9]/g, '-') + '.html'
}

const fetchHtml = (url: string): Promise<string> => {
  return axios
    .get<string>(url)
    .then(response => response.data)
}

const htmlLoader = (url: string, dirPath: string): Promise<string> => {
  const fileName = getFileNameHtml(url)
  const fullPath = path.join(dirPath, fileName)
  return fetchHtml(url)
    .then(data => writer(fullPath, data))
    .then(() => fullPath)
}


export { getFileNameHtml, fetchHtml }
export default htmlLoader