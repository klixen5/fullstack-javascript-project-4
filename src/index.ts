import { getFileNameFromUrl } from './utils.js'
import fileWritter from './fileWritter.js'
import fetcher from './fetcher.js'
import path from 'node:path'

const loader = (url: string, dirPath: string): Promise<string> => {
  const fileName = getFileNameFromUrl(url)
  const fullPath = path.join(dirPath, fileName)
  return fetcher(url)
    .then(data => {    
      return fileWritter(fullPath, data)
    })
    .then(() => fullPath)
}

export default loader