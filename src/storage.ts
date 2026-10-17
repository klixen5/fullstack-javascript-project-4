import fsp from 'node:fs/promises';

function saveFile(filepath: string, content: string): Promise<void> {
  return fsp.writeFile(filepath, content);
}

function saveImage(filepath: string, buffers: Buffer): Promise<void> {
  return fsp.writeFile(filepath, buffers);
}

export default saveFile;