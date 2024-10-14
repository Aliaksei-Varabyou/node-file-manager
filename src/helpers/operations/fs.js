import { promises as fsPromises, createReadStream, createWriteStream } from 'node:fs';
import { cwd } from 'node:process';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Writable } from 'node:stream';

import { inputError, operationError } from "../operation.js";
import { WITH_2_ARGUMENTS } from '../../constants.js';

export const checkPathExist = async (filePath) => {
  try {
    await fsPromises.access(filePath);
    return true;
  } catch (err) {
    if ((err.code === 'ENOENT')) {
      return false;
    } else {
      throw err;
    }
  }
};

// Read file and print it's content in console (should be done using Readable stream)
const cat = async (incomeParts) => {
  try {
    const filePath = incomeParts[0];
    if (await checkPathExist(filePath)) {
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
    } else {
      inputError();
    }
  } catch (err) {
    throw err;
  }
};

// Create empty file in current working directory
const add = async (incomeParts) => {
  try {
    const filePath = join(cwd(), incomeParts[0]);
    await fsPromises.writeFile(filePath, '');
  } catch(err) {
    throw err;
  }
};

// Rename file (content should remain unchanged)
const rn = async (incomeParts) => {
  try {
    const renamedFilePath = incomeParts[0];
    const newFilePath = incomeParts[1];
    const renamedExists = await checkPathExist(renamedFilePath);
    const newExists = await checkPathExist(newFilePath);
    if (renamedExists && !newExists) {
      fsPromises.rename(renamedFilePath, newFilePath);
    } else {
      inputError();
    }
  } catch(err) {
    throw err;
  }
};

// Copy file (should be done using Readable and Writable streams)
const cp = async (incomeParts) => {
  const source = incomeParts[0];
  const destination = incomeParts[1];
  try {
    const sourceExist = await checkPathExist(source);
    const destinationExist = await checkPathExist(destination);

    if (sourceExist && !destinationExist) {
      const readStream = createReadStream(source);
      const writeStream = createWriteStream(destination);

      readStream.pipe(writeStream);

      readStream.on('error', (err) => {
        console.error('Error reading file');
      });
      writeStream.on('error', (err) => {
        console.error('Error writing file');
      });
      return true;
    } else {
      inputError();
      return false;
    }
  } catch(err) {
    throw err;
  }
};

// Delete file
const rm = async (incomeParts) => {
  try {
    const filePath = join(cwd(), incomeParts[0]);
    if (await checkPathExist(filePath)) {
      await fsPromises.rm(filePath);
    } else {
      inputError();
    }
  } catch(err) {
    throw err;
  }
};

// Move file (same as copy but initial file is deleted,
// copying part should be done using Readable and Writable streams)
const mv = async (incomeParts) => {
  try {
    if (await checkPathExist(incomeParts[0])) {
      if (await cp(incomeParts)) {
        await rm(incomeParts);
      }
    } else {
      inputError();
    }
  } catch(err) {
    throw err;
  }
};

export const fsOperation = async (operation, incomeParts) => {
  const operations = {
    cat: cat,
    add: add,
    rn: rn,
    cp: cp,
    mv: mv,
    rm: rm
  };
  try {
    if (!incomeParts[0]) {
      return inputError();
    }
    if (WITH_2_ARGUMENTS.includes(operation) && !incomeParts[1]) {
      return inputError();
    }
    await operations[operation](incomeParts);
  } catch (err) {
    operationError();
    throw err;
  }
};
