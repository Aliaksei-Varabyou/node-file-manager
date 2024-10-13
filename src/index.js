import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, chdir, cwd } from 'node:process';
import { homedir } from 'node:os';

import { getUserName, parseArgs } from "./helpers/cli.js";
import { doOperation } from './helpers/operations.js';

// Greeting Block
const args = parseArgs();
const username = getUserName(args);
console.log(`Welcome to the File Manager, ${username}!`);

// Go to the home dir
chdir(homedir());

// creating stream
const rl = readline.createInterface({
  input, output, prompt: `You are currently in ${cwd()}\nEnter command: `
});
rl.prompt();

try {
  rl.on('line', line => {
    const operation = line.trim();
    if (operation === '.exit' || operation === 'exit') {
      rl.close();
    } else {
      doOperation(operation);
      rl.prompt();
    }
  }).on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });
} catch (err) {
  console.error(err);
}
