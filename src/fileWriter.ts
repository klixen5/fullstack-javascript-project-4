import fs from 'fs/promises'

const writer = (path: string, data: string): Promise<void> => {
  return fs.writeFile(path, data)
}

export default writer
