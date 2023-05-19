import { workerData, parentPort } from "node:worker_threads";
// import { createWriteStream } from "node:fs";
import { Cat10 } from "../cat10/Cat10";
import { Cat21 } from "../cat21/Cat21";

let messages: (Cat10 | Cat21)[] = [];
let started = false;
parentPort?.on("message", (data) => {
  messages = messages.concat(data);

  if (!started && workerData.messagesLength === messages.length) {
    doStuff();
    parentPort?.close();
  }
});

async function doStuff() {
    const mgs: (Cat10 | Cat21)[] = messages as (Cat10 | Cat21)[];
    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    
    
    const cat10Worksheet = workbook.addWorksheet('Take-off information');

    cat10Worksheet.getRow(1).values = ['Id', 'Time of day', 'WGS84 coordinates', 'Flight level', 'Geometric Height', 'Target address', 'Target identification'];
    cat10Worksheet.getRow(1).font = { bold: true };

    mgs.forEach((value) => {
        value = value as Cat21;
        cat10Worksheet.addRow( (value));
    });

    cat10Worksheet.eachRow(function(row: { eachCell: (arg0: (cell: any, colNumber: any) => void) => void; }) {
        row.eachCell(function(cell) {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        });
    });

    workbook.xlsx.writeFile(workerData.filePath)
    .then(() => {
        console.log('File saved!');
    })
    .catch((err: any) => {
        console.error(err);
    });
}




    

//   const fil = createWriteStream(workerData.filePath);

//   fil.write(
//     "Id,Time of day, WGS84 coordinates, Flight level, Geometric Height, Target address,Target identification\n"
//   );ç