import { promises as fsPromises } from 'fs';

import { inputError, operationError } from "../operation.js";

export const checkPathExist = async (filePath) => {
  try {
    await fsPromises.access(filePath);
  } catch (err) {
    if ((err.code = 'ENOENT')) {
      inputError();
    } else {
      throw err;
    }
  }
};

export const cat = async (incomeParts) => {
  try {
    const filePath = incomeParts[0];
    await checkPathExist(filePath);
    const content = await fsPromises.readFile(filePath, 'utf-8');
    console.log(content);
  } catch (err) {
    throw err;
  }
};

export const add = async (incomeParts) => {}

export const rn = async (incomeParts) => {}

export const cp = async (incomeParts) => {}

export const mv = async (incomeParts) => {}

export const rm = async (incomeParts) => {}

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
    await operations[operation](incomeParts);
  } catch (err) {
    operationError();
    throw err;
  }
};
