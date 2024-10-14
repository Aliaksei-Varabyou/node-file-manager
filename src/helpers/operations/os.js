import os from 'node:os';

import { OS_ARCHITECTURE, OS_ARGUMENTS, OS_CPUS, OS_EOL, OS_HOMEDIR, OS_USERNAME } from "../../constants.js";
import { inputError, operationError } from "../operation.js";

// Get EOL (default system End-Of-Line) and print it to console
const eol = () => {
  console.log(`Default system End-Of-Line symbol: ${JSON.stringify(os.EOL)}`);
};

// Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz)
// for each of them) and print it to console
const cpus = async () => {
  const cpus = os.cpus();
  console.log('Overall amount of CPUS:', cpus.length);
  const data = [];
  cpus.forEach((cpu) => {
    data.push({
      Model: cpu.model,
      Rate: `${cpu.speed / 1000} GHz`
    });
  });
  console.table(data);
};

// Get home directory and print it to console
const homedir = async () => {
  console.log(`Home directory: ${os.homedir}`);
};

// Get current system user name
// (Do not confuse with the username that is set when the application starts) and print it to console
const username = async () => {
  console.log(`Current system user name: ${os.userInfo().username}`);
};

// Get CPU architecture for which Node.js binary has compiled and print it to console
const arch = async () => {
  console.log(`CPU architecture for which Node.js binary has compiled: ${os.arch()}`);
};

const osWithArg = async (arg) => {
  try {
    switch (arg) {
      case OS_EOL:
        eol();
        break;
      case OS_CPUS:
        cpus();
        break;
      case OS_HOMEDIR:
        homedir();
        break;
      case OS_USERNAME:
        username();
        break;
      case OS_ARCHITECTURE:
        arch();
        break;
      default:
        inputError();
    }
  } catch (err) {
    throw err;
  }
};

export const osOperation = async (operation, incomeParts) => {
  const operations = {
    os: osWithArg
  };
  try {
    if (incomeParts[0] && OS_ARGUMENTS.includes(incomeParts[0])) {
      await operations[operation](incomeParts[0]);
    } else {
      inputError();
    }
  } catch (err) {
    operationError();
    throw err;
  }
};
