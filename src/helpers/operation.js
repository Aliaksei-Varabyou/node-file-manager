import {
  FS_OPERATIONS,
  HASH_OPERATIONS,
  INVALID_INPUT,
  NWD_OPERATIONS,
  OPERATION_FAILED,
  OS_OPERATIONS,
  ZIP_OPERATIONS
} from "../constants.js";
import { fsOperation } from "./operations/fs.js";
import { hashOperation } from "./operations/hash.js";
import { nwdOperation } from "./operations/nwd.js";
import { osOperation } from "./operations/os.js";
import { zipOperation } from "./operations/zip.js";

const getOperationType = (operation) => {
  if (NWD_OPERATIONS.includes(operation)) {
    return 'NWD';
  }
  if (FS_OPERATIONS.includes(operation)) {
    return 'FS';
  }
  if (OS_OPERATIONS.includes(operation)) {
    return 'OS';
  }
  if (HASH_OPERATIONS.includes(operation)) {
    return 'HASH';
  }
  if (ZIP_OPERATIONS.includes(operation)) {
    return 'ZIP';
  }
  return null;
}

export const doOperation = async (income) => {
  const incomeParts = income.split(' ').filter(item => item !== '');
  const operation = incomeParts.shift();
  switch (getOperationType(operation)) {
    case 'NWD':
      await nwdOperation(operation, incomeParts);
      break;
    case 'FS':
      await fsOperation(operation, incomeParts);
      break;
    case 'OS':
      await osOperation(operation, incomeParts);
      break;
    case 'HASH':
      await hashOperation(operation, incomeParts);
      break;
    case 'ZIP':
      await zipOperation(operation, incomeParts);
      break;
    default:
      operationError();
      break;
  };
};

export const operationError = () => {
  console.error(OPERATION_FAILED);
};

export const inputError = () => {
  console.error(INVALID_INPUT);
};
