import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, chdir, cwd } from 'node:process';
import { homedir } from 'node:os';

import { getUserName, parseArgs } from "./helpers/cli.js";
import { doOperation } from './helpers/operation.js';

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

// prompt operations until exit
try {
  rl.on('line', line => {
    const income = line.trim();
    if (income === '.exit' || income === 'exit') {
      rl.close();
    } else {
      doOperation(income).then(() => {;
        // change prompt if working directory was changed
        rl.setPrompt(`You are currently in ${cwd()}\nEnter command: `);
        rl.prompt();
      });
    }
  }).on('close', () => {
    // finishing block
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  });
} catch (err) {
  throw err;
}
