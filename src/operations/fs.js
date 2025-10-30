import { logSuccess } from "../utils/messages.js";

const cat = () => {}

const add = () => {}

const rn = () => {}

const cp = () => {}

const mv = () => {}

const rm = () => {}

export const FS_FUNCTIONS = { cat, add, rn, cp, mv, rm };

export const fsOperation = (operation) => {
  logSuccess('FS::', operation);
};
