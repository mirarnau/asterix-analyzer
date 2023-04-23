//import { ipcMainBidirectional } from "./ipcMainCallers";

export async function parseInitIpcMain(msg: string) {
  console.log(`Loaded ${msg} messages!`);
}

export async function parseIpcMainReceiveMessage(msg: string) {
  console.log("Parse msg received");
  const messages = await JSON.parse(msg);
  return messages;
}