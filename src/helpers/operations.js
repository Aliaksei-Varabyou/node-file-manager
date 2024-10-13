import { OPERATION_FAILED } from "../constants.js";

export const doOperation = (operation) => {
  switch (operation) {
    case 'exit': 
      console.log('Exit');
      break;
    case 'test':
      console.log('Test');
      break;
    default:
      console.error(OPERATION_FAILED);
  }
}