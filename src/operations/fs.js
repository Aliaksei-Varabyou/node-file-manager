import { access } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream, promises } from 'node:fs';
import { Writable } from 'node:stream';
import { join } from 'node:path';

import { inputError } from '../utils/operations.js';
import { cwd } from 'node:process';
import { logError, logSuccess } from '../utils/messages.js';

export const pathExists = async (path) => {
  try {
    await access(path);
    return true;
  } catch(err) {
    if ((err.code === 'ENOENT')) {
      return false;
    } else {
      throw err;
    }
  }
}

// Read file and print it's content in console (should be done using Readable stream)
const cat = async (income) => {
  const filePath = income[0];
  if (await pathExists(filePath)) {
    const readStream = createReadStream(filePath, 'utf-8');
    await pipeline(
      readStream,
      new Writable({
        write(chunk, _, callback) {
          console.log(chunk.toString());
          callback();
        }
      })
    );
    return true;
  } else {
    logError('File not Exists');
    return false
  }
}

// Create empty file in current working directory
const add = async (input) => {
  try {
    const filePath = join(cwd(), input[0]);
    if (await pathExists(filePath)) {
      logError(`File ${input[0]} already exist`);
      return false;
    }
    await promises.writeFile(filePath, '');
    logSuccess(`File ${input[0]} created successfully in the folder ${cwd()}`);
    return true;
  } catch(err) {
    logError('Error:', err);
    return false;
  }
}

// Create new directory in current working directory:
const mkdir = async(input) => {
  try {
    const filePath = join(cwd(), input[0]);
    if (await pathExists(filePath)) {
      logError(`Directory ${input[0]} already exist`);
      return false;
    }
    await promises.mkdir(filePath);
    logSuccess(`Directory ${input[0]} created successfully in the folder ${cwd()}`);
    return true;
  } catch(err) {
    logError('Error:', err);
    return false;
  }
}

// Rename file (content should remain unchanged)
const rn = async (input) => {
  try {
    const renamedFilePath = input[0];
    const newFilePath = input[1];
    if (!(await pathExists(renamedFilePath))) {
      logError(`File ${input[0]} don't exist`);
      return false;
    };
    if (await pathExists(newFilePath)) {
      logError(`File ${input[1]} already exist`);
      return false;
    };
    await promises.rename(renamedFilePath, newFilePath);
    logSuccess(`File ${renamedFilePath} renamed to ${newFilePath}`);
    return true;
  } catch(err) {
    logError('Error:', err);
    return false;
  }
}

// Copy file (should be done using Readable and Writable streams)
const cp = async (input) => {
  const source = input[0];
  const destination = input[1];
  try {
    if (!(await pathExists(source))) {
      logError(`File ${input[0]} don't exist`);
      return false;
    };
    if (await pathExists(destination)) {
      logError(`File ${input[1]} already exist`);
      return false;
    };

    const readStream = createReadStream(source);
    const writeStream = createWriteStream(destination);

    readStream.pipe(writeStream);

    readStream.on('error', (err) => {
      logError('Error reading file');
      return false
    });
    writeStream.on('error', (err) => {
      logError('Error writing file');
      return false;
    });

    logSuccess(`File ${source} copied to the new file ${destination}`);
    return true;
  } catch(err) {
    logError('Error:', err);
    return false;
  }
}

// Delete file
const rm = async (input) => {
  try {
    const filePath = join(cwd(), input[0]);
    if (!(await pathExists(filePath))) {
      logError(`${input[0]} don't exist`);
      return false;
    }
    await promises.rm(filePath, {recursive: true});
    logSuccess(`${input[0]} was deleted`);
    return true;
  } catch(err) {
    logError('Error:', err);
    return false;
  }
}

// Move file (same as copy but initial file is deleted,
// copying part should be done using Readable and Writable streams)
const mv = async (input) => {
  try {
    if (await cp(input)) {
      if (await rm(input)){
        return true;
      }
    }
    return false;
  } catch(err) {
    logError('Error:', err);
    return false;
  }
}

const FS_FUNCTIONS = { cat, add, mkdir, rn, cp, mv, rm };
const WITH_2_ARGUMENTS = ['rn', 'cp', 'mv'];

export const fsOperation = async (operation, incomeParts) => {
  if (!incomeParts[0]) return inputError();
  if (WITH_2_ARGUMENTS.includes(operation) && !incomeParts[1]) {
    logError('You need second argument!');
    return inputError();
  }
  const ok = await FS_FUNCTIONS[operation](incomeParts);
  if (!ok) inputError();
};
