import { Cat10 } from "../cat10/Cat10";
import { Cat21 } from "../cat21/Cat21";
import { sliceMessageBuffer, classifyMessageCat } from "../data/MessageClassifier";
import { openFilePicker, saveFileCsv } from "./FileManager";
import { Worker } from "node:worker_threads";
import { saveFileCsv } from "./FileManager";

import { Notification } from "electron";

let buffer: Buffer | undefined;
let messages: Buffer[];
let decodedMsg: (Cat10 | Cat21)[];
let msgDelivered = 0;

export async function loadFileIpc() {
    //const startTime = performance.now();     
    const res = await openFilePicker();
    if (!res) return;
    // const endTime = performance.now();

    buffer = res;

    console.log("Buffer length: " + buffer.length);
  
    // console.log(`Call to openFilePicker took ${endTime - startTime} milliseconds`);
    messages = [];
    decodedMsg = [];
    msgDelivered = 0;
  
    if (!buffer) {
        console.log("No file opened");
        return;
    }

    messages = sliceMessageBuffer(buffer);
    messages = messages.slice(0, 100);
    let L = messages.length > 5000000 ? 300000 : messages.length;
    return L;
}

export async function getMessagesIpc(_event: any, messageQuantity: number) {
    const startTime = performance.now();
    console.log("Start decoding");
    decodedMsg = await classifyMessageCat(messages, messageQuantity, 0);
    const endTime = performance.now();
    console.log(`Call to decodeMessages took ${endTime - startTime} milliseconds`);
    const msgToSend = decodedMsg.slice(msgDelivered, msgDelivered + messageQuantity);
  
    return await JSON.stringify(msgToSend);
}


export async function getMessagesIpcWorker(_event: any, _messageQuantity: number) {
    const startTime = performance.now();
    // const slice1 = messages.slice(0, 250000);
    // const slice2 = messages.slice(250000, messages.length);
    const result = (await runWorker({ messages })) as (Cat10 | Cat21)[];
    //const result2 = (await runWorker({ messages: slice2 })) as (Cat10 | Cat21)[];
    const endTime = performance.now();
    console.log(`Call to decodeMessages took ${endTime - startTime} milliseconds`);
    decodedMsg = result; //.concat(result2);
  
    return [];
}

function runWorker(workerData: any) {
    console.log(workerData.messages.length);
    return new Promise((resolve, reject) => {
      const worker = new Worker(__dirname + "/worker.js", { workerData });
      let result: (Cat10 | Cat21)[] = [];
      worker.on("message", (val: any) => {
        result = result.concat(val);
      });
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0) {
          console.log(new Error("Exit worker with code: " + code));
        } else {
          resolve(result);
        }
      });
    });
  }
  
  export function getMessagesIpcSlices() {
    const FRAGMENTS = 100;
    const ret = JSON.stringify(decodedMsg.slice(msgDelivered, msgDelivered + FRAGMENTS));
    msgDelivered += FRAGMENTS;
    if (msgDelivered > decodedMsg.length) msgDelivered = 0;
    return ret;
  }

  export async function writeCsvFile() {
    const picker = await saveFileCsv();
    if (!picker.filePath) return;
    await runWorkercsv({ messagesLength: decodedMsg.length, filePath: picker.filePath });
    console.log(`${picker.filePath} written`);
    new Notification({ title: "ASTERIX Message Decoder", body: "CSV file successfully written" }).show();
  }
  function runWorkercsv(workerData: any) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__dirname + "/exportToCSVA_worker.js", { workerData });

      let result: any;
      worker.on("message", (val: any) => {
        result = val;
      });
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0) {
          console.log(new Error("Exit worker with code: " + code));
        } else {
          resolve(result);
        }
      });
      if (decodedMsg.length > 300000) {
        worker.postMessage(decodedMsg.slice(0, 300000));
        worker.postMessage(decodedMsg.slice(300000, decodedMsg.length));
      } else {
        worker.postMessage(decodedMsg);
      }
    });
}
  