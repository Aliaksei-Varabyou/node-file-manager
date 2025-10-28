import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { getUserName } from "./utils/cli.js";


const userName = getUserName();
console.log(`Welcome to the File Manager, ${userName}!`);

const rl = createInterface({ input, output });

rl.on('line', line => {
  console.log(`Received: ${line}`);
});
rl.on('close', () => {
  console.log(`\n--------\nThank you for using File Manager, ${userName}, goodbye!\n--------`);
})