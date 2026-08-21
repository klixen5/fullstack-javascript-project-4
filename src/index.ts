import { getFileNameFromPath } from './utils.js'
import fileWritter from './fileWritter.js'
import fetcher from './fetcher.js'

export default (url: string, path: string) => {
  const fileName = getFileNameFromPath(url)
  return fetcher(url)
    .then(data => fileWritter(fileName, data))
}