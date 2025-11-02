import { chdir, cwd } from "node:process";
import { resolve } from "node:path";
import { promises } from "node:fs";

import { inputError, operationError } from "../utils/operations.js";

// Go upper from current directory
// (when you are in the root folder this operation shouldn't change working directory)
const up = () => {
  try {
    chdir(resolve(cwd(), '..'));
  } catch {
    inputError();
  }
};

// Go to dedicated folder from current directory (path_to_directory can be relative or absolute)
const cd = (incomeParts) => {
  try {
    chdir(incomeParts[0]);
  } catch {
    inputError();
  }
} 

// Print in console list of all files and folders in current directory. List should contain:
// list should contain files and folder names (for files - with extension)
// folders and files are sorted in alphabetical order ascending, but list of folders goes first
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
