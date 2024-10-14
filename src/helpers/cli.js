import { USER } from "../constants.js";

export const parseArgs = () => {
  return process.argv.slice(2).reduce((acc, arg) => {
    const splitItem = arg.split('=');
    if (splitItem.length === 2) {
      const key = splitItem[0].replace('--', '');
      const value = splitItem[1];
      acc[key] = value;
    } else {
      acc[arg] = undefined;
    }
    return acc;
  }, {});
};

export const getUserName = (args) => {
  if (args[USER] === undefined) {
    return 'Guest'
  }
  return args[USER];
};
