import { getUserName, parseArgs } from "./helpers/cli.js";

const username = getUserName(parseArgs());
console.log(`Welcome to the File Manager, ${username}!`);
