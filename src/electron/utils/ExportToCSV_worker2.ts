import { Cat10 } from "../cat10/Cat10";
import { Cat21 } from "../cat21/Cat21";
import { workerData, parentPort } from "node:worker_threads";
import { writeCat21 } from "./ExcelFunctions";

let messages: (Cat10 | Cat21)[] = [];
let started = false;
parentPort?.on("message", (data: ConcatArray<Cat10 | Cat21>) => {
  messages = messages.concat(data);
  if (!started && workerData.messagesLength === messages.length) {
    doStuff();
    parentPort?.close();
  }
});

async function  doStuff() {
    const mgs: (Cat10 | Cat21)[] = messages as (Cat10 | Cat21)[];

    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    
    const cat211Worksheet = workbook.addWorksheet('Cat21(1)');

    cat211Worksheet.getRow(1).values = ['Id', 'Class', 'Data Source Identifier', '', 'Target Report Descriptor', '','', '', '', '', '', '', '', '', '', '', '', '', '', 'Track Number', 'Position in WGS-84 co-ordinates', '', 'Target Address', 'Time of Message Reception of Velocity', 'Geometric Height', 'Quality Indicators', '', '', '', '', '', '', '', '', 'MOPS Version', 'Mode 3-A Code', 'Flight Level', 'Target Status', '', '', '', 'Barometric Vertical Rate', 'Airborne Ground Vector', '', 'Time of Report Transmission', 'Target Identification', 'Emitter Category', 'Selectied Altitude', 'Aircraft Operational Status', '', '', '', '', '', '', 'Message Amplitude', 'Data Ages', '', '', ''];
    cat211Worksheet.mergeCells('A1:A2');
    cat211Worksheet.mergeCells('B1:B2');
    cat211Worksheet.mergeCells('T1:T2');
    cat211Worksheet.mergeCells('W1:W2');
    cat211Worksheet.mergeCells('X1:X2');
    cat211Worksheet.mergeCells('Y1:Y2');
    cat211Worksheet.mergeCells('AI1:AI2');
    cat211Worksheet.mergeCells('AJ1:AJ2');
    cat211Worksheet.mergeCells('AK1:AK2');
    cat211Worksheet.mergeCells('AP1:AP2');
    cat211Worksheet.mergeCells('AS1:AS2');
    cat211Worksheet.mergeCells('AT1:AT2');
    cat211Worksheet.mergeCells('AU1:AU2');
    cat211Worksheet.mergeCells('AV1:AV2');
    cat211Worksheet.mergeCells('BD1:BD2');

    cat211Worksheet.mergeCells('C1:D1');
    cat211Worksheet.mergeCells('E1:S1');
    cat211Worksheet.mergeCells('U1:V1');
    cat211Worksheet.mergeCells('Z1:AH1');
    cat211Worksheet.mergeCells('AL1:AO1');
    cat211Worksheet.mergeCells('AQ1:AR1');
    cat211Worksheet.mergeCells('AW1:BC1');
    cat211Worksheet.mergeCells('BE1:BH1');

    const secondRow211 = cat211Worksheet.getRow(2);
    secondRow211.getCell('C').value = 'SIC';
    secondRow211.getCell('D').value = 'SAC';
    secondRow211.getCell('E').value = 'ATP';
    secondRow211.getCell('F').value = 'ARC';
    secondRow211.getCell('G').value = 'RC';
    secondRow211.getCell('H').value = 'RAB';
    secondRow211.getCell('I').value = 'DCR';
    secondRow211.getCell('J').value = 'GBS';
    secondRow211.getCell('K').value = 'SIM';
    secondRow211.getCell('L').value = 'TST';
    secondRow211.getCell('M').value = 'SAA';
    secondRow211.getCell('N').value = 'CL';
    secondRow211.getCell('O').value = 'IPC';
    secondRow211.getCell('P').value = 'NOGO';
    secondRow211.getCell('Q').value = 'CPR';
    secondRow211.getCell('R').value = 'LDPJ';
    secondRow211.getCell('S').value = 'RCF';
    secondRow211.getCell('U').value = 'Latitude';
    secondRow211.getCell('V').value = 'Longitude';
    secondRow211.getCell('Z').value = 'NUCr or NACv';
    secondRow211.getCell('AA').value = 'NUCp or NIC';
    secondRow211.getCell('AB').value = 'NICbaro';
    secondRow211.getCell('AC').value = 'SIL';
    secondRow211.getCell('AD').value = 'NACp';        
    secondRow211.getCell('AE').value = 'Second SIL';
    secondRow211.getCell('AF').value = 'SDA';
    secondRow211.getCell('AG').value = 'GVA';
    secondRow211.getCell('AH').value = 'PIC';
    secondRow211.getCell('AL').value = 'ICF';
    secondRow211.getCell('AM').value = 'LNAV';
    secondRow211.getCell('AN').value = 'PS';
    secondRow211.getCell('AO').value = 'SS';
    secondRow211.getCell('AQ').value = 'Ground speed';
    secondRow211.getCell('AR').value = 'Track angle';
    secondRow211.getCell('AW').value = 'RA';
    secondRow211.getCell('AX').value = 'TC';
    secondRow211.getCell('AY').value = 'TS';
    secondRow211.getCell('AZ').value = 'ARV';
    secondRow211.getCell('BA').value = 'CDTI';
    secondRow211.getCell('BB').value = 'TCAS';
    secondRow211.getCell('BC').value = 'SA';
    secondRow211.getCell('BE').value = 'AOS';
    secondRow211.getCell('BF').value = 'TRD';
    secondRow211.getCell('BG').value = 'M3A';
    secondRow211.getCell('BH').value = 'QI';

    
    cat211Worksheet.getRow(1).font = { bold: true };
    mgs.forEach((value) => {
        value = value as Cat21;
        cat211Worksheet.addRow(writeCat21(value));
        });

}