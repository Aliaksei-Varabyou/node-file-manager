import os from 'node:os';

import { OS_ARCHITECTURE, OS_ARGUMENTS, OS_CPUS, OS_EOL, OS_HOMEDIR, OS_USERNAME } from "../constants.js";
import { logError, logSuccess } from '../utils/messages.js';
import { inputError } from '../utils/operations.js';

// Get EOL (default system End-Of-Line) and print it to console
const eol = () => {
  logSuccess(`Default system End-Of-Line symbol: ${JSON.stringify(os.EOL)}`);
};

// Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz)
// for each of them) and print it to console
const cpus = () => {
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
const homedir = () => {
  logSuccess(`Home directory: ${os.homedir}`);
};

// Get current system user name
// (Do not confuse with the username that is set when the application starts) and print it to console
const username = () => {
  logSuccess(`Current system user name: ${os.userInfo().username}`);
};

// Get CPU architecture for which Node.js binary has compiled and print it to console
const arch = () => {
  logSuccess(`CPU architecture for which Node.js binary has compiled: ${os.arch()}`);
};

export const osWithArg = (arg) => {
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
    return true;
  } catch (err) {
    logError('Error:', err);
    return false;
  }
};

export const osOperation = async (operation, incomeParts) => {
  const operations = {
    os: osWithArg
  };
  if (incomeParts[0]) {
    if (!OS_ARGUMENTS.includes(incomeParts[0])) {
      logError('You can use only:: --EOL | --cpus | --homedir | --username | --architecture');
      inputError();
    } else {
      const ok = operations[operation](incomeParts[0]);
      if (!ok) inputError();
    }
  } else {
    inputError();
  }
};