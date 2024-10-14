import { createHash } from 'node:crypto';
import { promises as fsPromises } from 'fs';

import { checkPathExist } from './fs.js';
import { inputError, operationError } from '../operation.js';

// Calculate hash for file and print it into console
const hash = async(incomeParts) => {
  try {
    const filePath = incomeParts[0];
    const hashSum = createHash('sha256');

    if (await checkPathExist(filePath)) {
      const fileBuffer = await fsPromises.readFile(filePath);
      hashSum.update(fileBuffer);
      const hex = hashSum.digest('hex');
      console.log(`Hash for file: ${hex}`);
    } else {
      inputError();
    }
  } catch (err) {
    throw err;
  }
};

export const hashOperation = async(operation, incomeParts) => {
  const operations = {
    hash: hash
  };
  try {
    await operations[operation](incomeParts);
  } catch {
    operationError();
  }
};
