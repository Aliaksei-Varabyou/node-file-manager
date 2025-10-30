import { createInterface } from 'node:readline/promises';
import { chdir, stdin as input, stdout as output } from 'node:process';
import { homedir } from 'node:os';

import { getUserName } from "./utils/cli.js";
import { getPrompt, logError, writeByeMessage, writeGreeting } from './utils/messages.js';
import { doOperation, operationError } from './utils/operations.js';


const userName = getUserName();
writeGreeting(userName);
console.log('Directory for test::', process.cwd());
chdir(homedir());

const rl = createInterface({ input, output, prompt: getPrompt() });
rl.prompt();

try {
  rl.on('line', line => {
    const operation = line.trim();
    if (operation === '.exit' || operation === 'exit') {
      rl.close();
    } else {
      doOperation(operation).then(() => {
        // change prompt if working directory was changed
        rl.setPrompt(getPrompt());
        rl.prompt();
      });
    }
  })
  .on('close', () => {
    writeByeMessage(userName);
  })
} catch {
  logError(operationError());
}
