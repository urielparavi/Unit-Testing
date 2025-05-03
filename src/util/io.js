import path from 'path';
import { promises as fs } from 'fs';

export default function writeData(data, filename) {
  // process.cwd() returns the current working directory of the running process.
  // It's the folder where the code is being executed from, not the full system path.
  const storagePath = path.join(process.cwd(), 'data', filename);
  return fs.writeFile(storagePath, data);
}
