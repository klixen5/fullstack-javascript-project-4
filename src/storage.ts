import fsp from 'node:fs/promises';

function saveFile(filepath: string, content: string): Promise<void> {
  return fsp.writeFile(filepath, content);
}

export default saveFile;