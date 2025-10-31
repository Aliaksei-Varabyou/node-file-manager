import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { createWriteStream, createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

import { pathExists } from './fs.js';
import { inputError } from '../utils/operations.js';
import { logError, logSuccess } from '../utils/messages.js';

// Compress file (using Brotli algorithm, should be done using Streams API)
export const compress = async(input) => {
  try {
    const gzip = createBrotliCompress();
    const source = createReadStream(input[0]);
    const destination = createWriteStream(input[1]);

    await pipeline(
      source,
      gzip,
      destination
    );
    logSuccess(`File ${input[0]} was compressed to ${input[1]}`);
    return true;
  } catch(err) {
    logError('Error:', err);
    return false;
  }
};

// Decompress file (using Brotli algorithm, should be done using Streams API)
export const decompress = async(input) => {
  try {
    const gunzip = createBrotliDecompress();
    const source = createReadStream(input[0]);
    const destination = createWriteStream(input[1]);

    await pipeline(
      source,
      gunzip,
      destination
    );
    logSuccess(`File ${input[0]} was decompressed to ${input[1]}`);
    return true;
  } catch(err) {
    logError('Error:', err);
    return false;
  }
};

export const zipOperation = async (operation, incomeParts) => {
  const operations = {
    compress: compress,
    decompress: decompress
  };
  if (!incomeParts[0] || !incomeParts[1]) return inputError();
  if (!(await pathExists(incomeParts[0]))) {
    logError(`File ${incomeParts[0]} don't exist`);
  } else {
    const ok = await operations[operation](incomeParts);
    if (!ok) inputError();
  }
};
