import { Cat10 } from "../cat10/Cat10";
import { Cat21 } from "../cat21/Cat21";
import { sliceMessageBuffer, classifyMessageCat } from "../data/MessageClassifier";
import { openFilePicker, saveFileCsv } from "./FileManager";
import { Worker } from "node:worker_threads";
import { Notification } from "electron";
const JsonSearch = require("search-array").default;

let buffer: Buffer | undefined;
let messages: Buffer[];
let decodedMsg: (Cat10 | Cat21)[];
let msgDelivered = 0;
let msgFiltered: (Cat10 | Cat21)[];

export async function loadFileIpc() {
  //const startTime = performance.now();
  const res = await openFilePicker();
  if (!res) return;

  buffer = res;
  // const endTime = performance.now();

  // console.log(`Call to openFilePicker took ${endTime - startTime} milliseconds`);
  messages = [];
  decodedMsg = [];
  msgDelivered = 0;

  if (!buffer) {
    console.log("No file opened");
    return;
  }

  messages = await sliceMessageBuffer(buffer);
  let L = messages.length > 5000000 ? 300000 : messages.length;
  console.log(`About to process ${L} messages.`);
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
    const FRAGMENTS = 10000;
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

  let oldFilter: Filter = {
    Category: [],
    Instrument: [],
  };
  let oldSearch: string = "";
  const MSG_PER_PAGE = 15;

  export async function filterMess(_event: any, { page, filter, search } : {page: number; filter:Filter; search:string}) {
    if (!msgFiltered) msgFiltered = decodedMsg;
    if (JSON.stringify(oldFilter) === JSON.stringify(filter) && oldSearch === search) {
      return JSON.stringify({
        messages: msgFiltered.slice(page * MSG_PER_PAGE - MSG_PER_PAGE, page * MSG_PER_PAGE),
        totalMessages: msgFiltered.length,
      });
    }
      //filter current filter
    msgFiltered = decodedMsg;
    oldFilter = filter;

    if (filter.Category.length > 0) msgFiltered = msgFiltered.filter((m) => filter.Category.includes(m.class));
    if (filter.Instrument.length > 0) msgFiltered = msgFiltered.filter((m) => filter.Instrument.includes(m.measurementInstrument));
    // if (filter.TrackNumber) msgFiltered = msgFiltered.filter((m) => m.trackNumber.value === filter.TrackNumber);
    if (filter.TargetIdentification) {
      msgFiltered = msgFiltered.filter(
      (m) => m.targetIdentification && JSON.stringify(m.targetIdentification).includes(filter.TargetIdentification!)
      );}
    if (filter.TargetAddress)
      msgFiltered = msgFiltered.filter((m) => m.targetAddress && m.targetAddress.value === filter.TargetAddress);
  
    oldSearch = search;
  
    if (search !== "") {
      const searcher = new JsonSearch(msgFiltered);
  
      msgFiltered = searcher.query(search) as (Cat10 | Cat21)[];
    }
    return JSON.stringify({
      messages: msgFiltered.slice(page * MSG_PER_PAGE - MSG_PER_PAGE, page * MSG_PER_PAGE),
      totalMessages: msgFiltered.length,
    });
    //return await JSON.stringify(msgFiltered);
  }

  export async function filterTakeOff(){
    let takingOffMsg: Cat21[] = [];
    let msgFilteredTO : any = decodedMsg.filter((m) => m.measurementInstrument == "ADS-B");
    // console.log(msgFilteredTO);
    msgFilteredTO.forEach((m: any) => {
      if (m.positioninWGS84Coordinates) {
        if (m.positioninWGS84Coordinates.latitude < 41.282768 && m.positioninWGS84Coordinates.latitude > 41.282015 && m.positioninWGS84Coordinates.longitude < 2.075665 && m.positioninWGS84Coordinates.longitude > 2.073443){
          takingOffMsg.push(m);
        }
      }
    });
    if(takingOffMsg.length > 0){
      const picker = await saveFileCsv();
      if (!picker.filePath) return;
      await runWorkerTO({ takingOffMsg, filePath: picker.filePath });
      console.log(`${picker.filePath} written`);
      new Notification({ title: "ASTERIX Message Decoder", body: "CSV file successfully written" }).show();
    }
  }

  function runWorkerTO(workerData: any){
    return new Promise((resolve, reject) => {
      const worker = new Worker(__dirname + "/exportTakeOff_worker.js", { workerData });

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
    });
  }
  interface Filter {
    Category: string[];
    Instrument: string[];
    TargetAddress?: string;
    TargetIdentification?: string;
  }