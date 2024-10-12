import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { getUserName, parseArgs } from "./helpers/cli.js";

// Greeting Block
const args = parseArgs();
const username = getUserName(args);
console.log(`Welcome to the File Manager, ${username}!`);

const rl = readline.createInterface({
  input, output, prompt: `enter command: `
});

rl.prompt();

rl.on('line', line => {
  const command = line.trim();
  if (command === '.exit' || command === 'exit') {
    rl.close();
  } else {
    console.log('New command - ', command);
    rl.prompt();
  }
}).on('close', () => {
  console.log('Goodbye,', username);
});
