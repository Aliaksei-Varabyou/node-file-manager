import { chdir, cwd } from 'node:process';
import { resolve } from 'node:path';
import { promises as fsPromises } from 'node:fs';

import { inputError, operationError } from '../operation.js';

const up = () => {
  try {
    const currDirectory = cwd();
    const upDirectory = resolve(currDirectory, '..');
    chdir(upDirectory);
  } catch (err) {
    inputError();
  }
};

const cd = (incomeParts) => {
  try {
    chdir(incomeParts[0]);
  } catch (err) {
    inputError();
  }
};

const ls = async () => {
  try {
    const currDirectory = cwd();
    const files = await fsPromises.readdir(currDirectory, { withFileTypes: true });
    
    const fileInfo = await Promise.all(files.map(file => {
      return {
        Name: file.name,
        Type: file.isDirectory() ? 'directory' : 'file'
      };
    }));

    const sortedFileInfo = fileInfo.sort((a, b) => {
      if( a.Type > b.Type) return 1;
      if( a.Type < b.Type) return -1;
      if( a.Name > b.Name) return 1;
      if( a.Name < b.Name) return -1;
      return 0;
    });
  
    console.table(sortedFileInfo);
  } catch (err) {
    inputError(err);
  }
};

export const nwdOperation = async(operation, incomeParts) => {
  const operations = {
    up: up,
    cd: cd,
    ls: ls
  };
  try {
    await operations[operation](incomeParts);
  } catch {
    operationError();
  }
};
