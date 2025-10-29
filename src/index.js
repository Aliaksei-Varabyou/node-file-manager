import { createInterface } from 'node:readline/promises';
import { chdir, cwd, stdin as input, stdout as output } from 'node:process';
import { getUserName } from "./utils/cli.js";
import { logError, setColor, writeMessage } from './utils/messages.js';
import { homedir } from 'node:os';
import { doOperation } from './utils/operations.js';


const userName = getUserName();
writeMessage(`Welcome to the File Manager, ${userName}!`, 'green');
chdir(homedir());

const rl = createInterface({ input, output, 
  prompt: `${setColor(`You are currently in <<${cwd()}>>`, 36)}\n${setColor('Enter command', 33)} > `
});

rl.prompt();
try {
  rl.on('line', line => {
    const operation = line.trim();
    if (operation === '.exit' || operation === 'exit') {
      rl.close();
    } else {
      doOperation(operation).then(() => {
        rl.prompt();
      });
    }
  })
  .on('close', () => {
    writeMessage(`Thank you for using File Manager, ${userName}, goodbye!`, 'green');
  })
} catch {
  logError('Something wrong!');
}
