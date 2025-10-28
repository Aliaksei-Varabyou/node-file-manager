import { createInterface } from 'node:readline/promises';
import { chdir, cwd, stdin as input, stdout as output } from 'node:process';
import { getUserName } from "./utils/cli.js";
import { setColor, writeMessage } from './utils/messages.js';
import { homedir } from 'node:os';


const userName = getUserName();
writeMessage(`Welcome to the File Manager, ${userName}!`, 'green');
chdir(homedir());

const rl = createInterface({ input, output, 
  prompt: `${setColor(`You are currently in <<${cwd()}>>`, 36)}\n${setColor('Enter command', 33)} > `
});

rl.prompt();

rl.on('line', line => {
  console.log(`Received: ${line}`);
  rl.prompt();
});

rl.on('close', () => {
  writeMessage(`Thank you for using File Manager, ${userName}, goodbye!`, 'green');
})
