import { chdir, cwd } from "node:process";
import { resolve } from "node:path";
import { promises } from "node:fs";

import { inputError, operationError } from "../utils/operations.js";

const up = () => {
  try {
    chdir(resolve(cwd(), '..'));
  } catch {
    inputError();
  }
};

const cd = (incomeParts) => {
  try {
    chdir(incomeParts[0]);
  } catch {
    inputError();
  }
} 

const ls = async () => {
  try {
    const files = await promises.readdir(cwd(), { withFileTypes: true });
    
    const fileInfo = await Promise.all(files.map(file => {
      return {
        name: file.name,
        type: file.isDirectory() ? 'directory' : 'file'
      };
    }));

    const sortedFileInfo = fileInfo.sort((a, b) => {
      if( a.type > b.type) return 1;
      if( a.type < b.type) return -1;
      if( a.name > b.name) return 1;
      if( a.name < b.name) return -1;
      return 0;
    });
  
    console.table(sortedFileInfo);
  } catch {
    inputError();
  }
}

const NWD_FUNCTIONS = { up, cd, ls };

export const nwdOperation = async (operation, incomeParts) => {
  try {
    await NWD_FUNCTIONS[operation](incomeParts);
  } catch {
    operationError();
  }
};
