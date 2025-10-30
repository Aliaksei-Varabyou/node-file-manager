import { logSuccess } from "../utils/messages.js";

const hash = () => {}
const compress = () => {}
const decompress = () => {}

export const MP_FUNCTIONS = { hash, compress, decompress };

export const mpOperation = (operation) => {
  logSuccess('MP::', operation);
};
