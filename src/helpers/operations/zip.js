import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { createWriteStream, createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

import { checkPathExist } from './fs.js';
import { inputError, operationError } from '../operation.js';

// Compress file (using Brotli algorithm, should be done using Streams API)
export const compress = async(incomeParts) => {

  try {
    const gzip = createBrotliCompress();
    const source = createReadStream(incomeParts[0]);
    const destination = createWriteStream(incomeParts[1]);

    await pipeline(
      source,
      gzip,
      destination
    );
  } catch(err) {
    throw err;
  }
};

// Decompress file (using Brotli algorithm, should be done using Streams API)
export const decompress = async(incomeParts) => {
  try {
    const gunzip = createBrotliDecompress();
    const source = createReadStream(incomeParts[0]);
    const destination = createWriteStream(incomeParts[1]);

    await pipeline(
      source,
      gunzip,
      destination
    );
  } catch(err) {
    throw err;
  }
};

export const zipOperation = async (operation, incomeParts) => {
  const operations = {
    compress: compress,
    decompress: decompress
  };
  try {
    if (await checkPathExist(incomeParts[0])) {
      await operations[operation](incomeParts);
    } else {
      inputError();
    }
  } catch (err) {
    operationError();
    throw err;
  }
};
