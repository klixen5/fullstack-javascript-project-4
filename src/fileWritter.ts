import fs from 'fs/promises'

export default (path: string, data: string) => {
  return fs.writeFile(path, data).then(() => path)
}