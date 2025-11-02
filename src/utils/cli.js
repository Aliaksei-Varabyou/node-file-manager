import { USER } from "../constants.js";

const parseArgs = () => {
  const args = [];
  process.argv.slice(2)
  .filter(arg => arg.startsWith('--'))
  .forEach(arg => {
    const argData = arg.split('=');
    args[argData[0].slice(2)] = argData[1];
  });
  return args;
}

export const getUserName = () => {
  const args = parseArgs();
  if (args[USER] === undefined) {
    return 'Guest'
  }
  return args[USER];
};
