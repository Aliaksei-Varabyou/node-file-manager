import {
  FS_OPERATIONS,
  INVALID_INPUT,
  MP_OPERATIONS,
  NWD_OPERATIONS,
  OPERATION_FAILED,
  OS_OPERATIONS
} from "../constants.js";
import { fsOperation } from "./operations/fs.js";
import { mpOperation } from "./operations/mp.js";
import { nwdOperation } from "./operations/nwd.js";
import { osOperation } from "./operations/os.js";

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
  if (MP_OPERATIONS.includes(operation)) {
    return 'MP';
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
    case 'MP':
      await mpOperation(operation, incomeParts);
      break;
    default:
      operationError();
      break;
  };
};

export const operationError = () => {
  console.error(OPERATION_FAILED);
};

export const inputError = (err) => {
  console.error(INVALID_INPUT);
  if (err) console.error(err);
};
