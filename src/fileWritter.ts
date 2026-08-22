import fs from 'fs/promises'

export default (path: string, data: string): Promise<void> => {
  return fs.writeFile(path, data)
}