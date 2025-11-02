import { createHash } from 'node:crypto';
import { promises } from 'fs';

import { logError, logSuccess } from '../utils/messages.js';
import { inputError } from '../utils/operations.js';
import { pathExists } from './fs.js';

// Calculate hash for file and print it into console
const hash = async(input) => {
  try {
    const filePath = input[0];
    const hashSum = createHash('sha256');

    if (!(await pathExists(filePath))) {
      logError(`File ${input[0]} don't exist`);
      return false;
    }
    const fileBuffer = await promises.readFile(filePath);
    hashSum.update(fileBuffer);
    const hex = hashSum.digest('hex');
    logSuccess(`Hash for file: ${hex}`);
    return true;
  } catch (err) {
    logError('Error:', err);
    return false;
  }
};

export const hashOperation = async(operation, incomeParts) => {
  if (!incomeParts[0]) return inputError();
  const operations = {
    hash: hash
  };
  const ok = await operations[operation](incomeParts);
  if (!ok) inputError();
};