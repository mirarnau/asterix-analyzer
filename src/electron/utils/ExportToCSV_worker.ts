//import { workerData } from "node:worker_threads";
//import { createWriteStream } from "node:fs";
import { Cat10 } from "../cat10/Cat10";
// import { MeasuredPositionPolarCoordinates } from "../cat10/valueObjects/MeasuredPositionPolarCoordinates";
// import { PositionCartesianCoordinates } from "../cat10/valueObjects/PositionCartesianCoordinates";
// import { TargetReportDescriptor } from "../cat10/valueObjects/TargetReportDescriptor";
// import { PositionWG84Coordinates } from "../cat10/valueObjects/PositionWGS84Coordinates";
// import { PositioninWGS84Coordinates } from "../cat21/valueObjects/PositioninWGS84Coordinates";
// import { TimeOfDay } from "../cat10/valueObjects/TimeOfDay";
import { Cat21 } from "../cat21/Cat21";
// import { TrackNumber } from "../cat10/valueObjects/TrackNumber";
// import { TargetStatus } from "../cat21/valueObjects/TargetStatus";
// import { TrackStatus } from "../cat10/valueObjects/TrackStatus";
// import { CalculatedTrackVelocityPolarCoordinates } from "../cat10/valueObjects/CalculatedTrackVelocityPolarCoordinates";
// import { CalculatedTrackVelocityCartesianCoordinates } from "../cat10/valueObjects/CalculatedTrackVelocityCartesianCoordinates";
// import { CalculatedAcceleration } from "../cat10/valueObjects/CalculatedAcceleration";
// import { TargetSizeAndOrientation } from "../cat10/valueObjects/TargetSizeAndOrientation";
import { workerData, parentPort } from "node:worker_threads";
// import { TargetAddress } from "../cat21/valueObjects/TargetAddress";
// import { TimeofMessageReceptionofVelocity } from "../cat21/valueObjects/TimeofMessageReceptionofVelocity";
// import { GeometricHeight } from "../cat21/valueObjects/GeometricHeight";
// import { QualityIndicators } from "../cat21/valueObjects/QualityIndicators";
//import { writeFile, createWriteStream } from "node:fs";
//import * as fs from 'fs';

import { writeCat10Test, writeCat21 } from "./ExcelFunctions";

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
    
    
    const cat10Worksheet = workbook.addWorksheet('Cat10');
    const cat21Worksheet = workbook.addWorksheet('Cat21');

    // Write headers to the first row
    //cat10Worksheet.getRow(1).values = ['Id', 'Class', 'Message Type', 'Data Source Identifier', 'Target Report Descriptor', 'Measured Position in Polar Coordinates', 'Position in WG-84 Coordinates', 'Position in Cartesian Coordinates', 'Measured Height', 'Time of Day', 'Track Number', 'Track Status', 'Calculated Track Velocity in Polar Coordinates', 'Calculated Track Velocity in Cartesian Coordinates', 'Calculated Acceleration', 'Target Address', 'Target Size and Orientation', 'System Status'];
    cat10Worksheet.getRow(1).values = ['Id', 'Class', 'Message Type', 'Data Source Identifier', '', 'Target Report Descriptor', '', '', '', '', 'Measured Position in Polar Coordinates', '', 'Position in WG-84 Coordinates', '', 'Position in Cartesian Coordinates', '', 'Time of Day', 'Track Number', 'Track Status', '', '', '', '', '', 'Track Velocity in Polar Coordinates', '', 'Track Velocity in Cartesian Coordinates', '', 'Calculated Acceleration', '', 'Target Size'];
    cat10Worksheet.mergeCells('D1:E1');
    cat10Worksheet.mergeCells('F1:J1');
    cat10Worksheet.mergeCells('K1:L1');
    cat10Worksheet.mergeCells('M1:N1');
    cat10Worksheet.mergeCells('O1:P1');
    cat10Worksheet.mergeCells('S1:X1');
    cat10Worksheet.mergeCells('Y1:Z1');
    cat10Worksheet.mergeCells('AA1:AB1');
    cat10Worksheet.mergeCells('AC1:AD1');

    cat10Worksheet.mergeCells('A1:A2');
    cat10Worksheet.mergeCells('B1:B2');
    cat10Worksheet.mergeCells('C1:C2');
    cat10Worksheet.mergeCells('Q1:Q2');
    cat10Worksheet.mergeCells('R1:R2');
    cat10Worksheet.mergeCells('AE1:AE2');

    const secondRow = cat10Worksheet.getRow(2);
    secondRow.getCell('D').value = 'SIC';
    secondRow.getCell('E').value = 'SAC';
    secondRow.getCell('F').value = 'TYP';
    secondRow.getCell('G').value = 'DCR';
    secondRow.getCell('H').value = 'CHN';
    secondRow.getCell('I').value = 'GBS';
    secondRow.getCell('J').value = 'CRT';
    secondRow.getCell('K').value = 'Rho';
    secondRow.getCell('L').value = 'Theta';
    secondRow.getCell('M').value = 'Latitude';
    secondRow.getCell('N').value = 'Longitude';
    secondRow.getCell('O').value = 'X';
    secondRow.getCell('P').value = 'Y';
    secondRow.getCell('S').value = 'CNF';
    secondRow.getCell('T').value = 'TRE';
    secondRow.getCell('U').value = 'CST';
    secondRow.getCell('V').value = 'MAH';
    secondRow.getCell('W').value = 'TCC';
    secondRow.getCell('X').value = 'STH';
    secondRow.getCell('Y').value = 'Rho';
    secondRow.getCell('Z').value = 'Theta';
    secondRow.getCell('AA').value = 'X';
    secondRow.getCell('AB').value = 'Y';
    secondRow.getCell('AC').value = 'Ax';
    secondRow.getCell('AD').value = 'Ay';

    cat10Worksheet.getRow(1).font = { bold: true };

    cat21Worksheet.getRow(1).values = ['Id', 'Class', 'Data Source Identifier', '', 'Target Report Descriptor', '','', '', '', '', '', '', '', '', '', '', '', '', '', 'Track Number', 'Position in WGS-84 co-ordinates', '', 'Target Address', 'Time of Message Reception of Velocity', 'Geometric Height', 'Quality Indicators', '', '', '', '', '', '', '', '', 'MOPS Version', 'Mode 3-A Code', 'Flight Level', 'Target Status', '', '', '', 'Barometric Vertical Rate', 'Airborne Ground Vector', '', 'Time of Report Transmission', 'Target Identification', 'Emitter Category', 'Selectied Altitude', 'Aircraft Operational Status', '', '', '', '', '', '', 'Message Amplitude', 'Data Ages', '', '', ''];
    cat21Worksheet.mergeCells('A1:A2');
    cat21Worksheet.mergeCells('B1:B2');
    cat21Worksheet.mergeCells('T1:T2');
    cat21Worksheet.mergeCells('W1:W2');
    cat21Worksheet.mergeCells('X1:X2');
    cat21Worksheet.mergeCells('Y1:Y2');
    cat21Worksheet.mergeCells('AI1:AI2');
    cat21Worksheet.mergeCells('AJ1:AJ2');
    cat21Worksheet.mergeCells('AK1:AK2');
    cat21Worksheet.mergeCells('AP1:AP2');
    cat21Worksheet.mergeCells('AS1:AS2');
    cat21Worksheet.mergeCells('AT1:AT2');
    cat21Worksheet.mergeCells('AU1:AU2');
    cat21Worksheet.mergeCells('AV1:AV2');
    cat21Worksheet.mergeCells('BD1:BD2');

    cat21Worksheet.mergeCells('C1:D1');
    cat21Worksheet.mergeCells('E1:S1');
    cat21Worksheet.mergeCells('U1:V1');
    cat21Worksheet.mergeCells('Z1:AH1');
    cat21Worksheet.mergeCells('AL1:AO1');
    cat21Worksheet.mergeCells('AQ1:AR1');
    cat21Worksheet.mergeCells('AW1:BC1');
    cat21Worksheet.mergeCells('BE1:BH1');

    const secondRow21 = cat21Worksheet.getRow(2);
    secondRow21.getCell('C').value = 'SIC';
    secondRow21.getCell('D').value = 'SAC';
    secondRow21.getCell('E').value = 'ATP';
    secondRow21.getCell('F').value = 'ARC';
    secondRow21.getCell('G').value = 'RC';
    secondRow21.getCell('H').value = 'RAB';
    secondRow21.getCell('I').value = 'DCR';
    secondRow21.getCell('J').value = 'GBS';
    secondRow21.getCell('K').value = 'SIM';
    secondRow21.getCell('L').value = 'TST';
    secondRow21.getCell('M').value = 'SAA';
    secondRow21.getCell('N').value = 'CL';
    secondRow21.getCell('O').value = 'IPC';
    secondRow21.getCell('P').value = 'NOGO';
    secondRow21.getCell('Q').value = 'CPR';
    secondRow21.getCell('R').value = 'LDPJ';
    secondRow21.getCell('S').value = 'RCF';
    secondRow21.getCell('U').value = 'Latitude';
    secondRow21.getCell('V').value = 'Longitude';
    secondRow21.getCell('Z').value = 'NUCr or NACv';
    secondRow21.getCell('AA').value = 'NUCp or NIC';
    secondRow21.getCell('AB').value = 'NICbaro';
    secondRow21.getCell('AC').value = 'SIL';
    secondRow21.getCell('AD').value = 'NACp';        
    secondRow21.getCell('AE').value = 'Second SIL';
    secondRow21.getCell('AF').value = 'SDA';
    secondRow21.getCell('AG').value = 'GVA';
    secondRow21.getCell('AH').value = 'PIC';
    secondRow21.getCell('AL').value = 'ICF';
    secondRow21.getCell('AM').value = 'LNAV';
    secondRow21.getCell('AN').value = 'PS';
    secondRow21.getCell('AO').value = 'SS';
    secondRow21.getCell('AQ').value = 'Ground speed';
    secondRow21.getCell('AR').value = 'Track angle';
    secondRow21.getCell('AW').value = 'RA';
    secondRow21.getCell('AX').value = 'TC';
    secondRow21.getCell('AY').value = 'TS';
    secondRow21.getCell('AZ').value = 'ARV';
    secondRow21.getCell('BA').value = 'CDTI';
    secondRow21.getCell('BB').value = 'TCAS';
    secondRow21.getCell('BC').value = 'SA';
    secondRow21.getCell('BE').value = 'AOS';
    secondRow21.getCell('BF').value = 'TRD';
    secondRow21.getCell('BG').value = 'M3A';
    secondRow21.getCell('BH').value = 'QI';

    
    cat21Worksheet.getRow(1).font = { bold: true };

    // Write values to subsequent rows and cells

    // Write the workbook to a file        
    mgs.forEach((value) => {
    if (value.class === "Cat10") {
        value = value as Cat10;
        cat10Worksheet.addRow(writeCat10Test(value));

    } else {
        value = value as Cat21;
        cat21Worksheet.addRow(writeCat21(value));
        workbook.xlsx.writeFile(workerData.filePath)
    }});
    console.log("all written");


    // Set all text to be centered
    // cat10Worksheet.eachRow(function(row: { eachCell: (arg0: (cell: any, colNumber: any) => void) => void; }) {
    //     row.eachCell(function(cell) {
    //     cell.alignment = { horizontal: 'center', vertical: 'middle' };
    //     });
    // });

    // cat21Worksheet.eachRow(function(row: { eachCell: (arg0: (cell: any, colNumber: any) => void) => void; }) {
    //     row.eachCell(function(cell) {
    //     cell.alignment = { horizontal: 'center', vertical: 'middle' };
    //     });
    // });

    workbook.xlsx.writeFile(workerData.filePath)
    .then(() => {
        console.log('File saved!');
    })
    .catch((err: any) => {
        console.error(err);
    });
}

