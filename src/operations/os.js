import { logSuccess } from "../utils/messages.js";

const os = () => {}

export const OS_FUNCTIONS = { os };

export const osOperation = (operation, incomeParts) => {
  logSuccess('OS::', operation, incomeParts);
};
