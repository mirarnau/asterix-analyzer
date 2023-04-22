//import { workerData } from "node:worker_threads";
//import { createWriteStream } from "node:fs";
import { Cat10 } from "../cat10/Cat10";
import { MeasuredPositionPolarCoordinates } from "../cat10/valueObjects/MeasuredPositionPolarCoordinates";
import { PositionCartesianCoordinates } from "../cat10/valueObjects/PositionCartesianCoordinates";
import { TargetReportDescriptor } from "../cat10/valueObjects/TargetReportDescriptor";
import { PositionWG84Coordinates } from "../cat10/valueObjects/PositionWGS84Coordinates";
import { TimeOfDay } from "../cat10/valueObjects/TimeOfDay";
import { Cat21 } from "../cat21/Cat21";
import { TrackNumber } from "../cat10/valueObjects/TrackNumber";
// import { TargetStatus } from "../cat21/valueObjects/TargetStatus";
import { TrackStatus } from "../cat10/valueObjects/TrackStatus";
import { CalculatedTrackVelocityPolarCoordinates } from "../cat10/valueObjects/CalculatedTrackVelocityPolarCoordinates";
import { CalculatedTrackVelocityCartesianCoordinates } from "../cat10/valueObjects/CalculatedTrackVelocityCartesianCoordinates";
import { CalculatedAcceleration } from "../cat10/valueObjects/CalculatedAcceleration";
import { TargetSizeAndOrientation } from "../cat10/valueObjects/TargetSizeAndOrientation";
//import * as fs from 'fs';


export class ExportToCSV {
    constructor (){}
    
    public async doStuff(messages : (Cat10 | Cat21)[] = [], fileName : string) {
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
            // cat10Worksheet.addRow(this.writeCat10(value));}
            cat10Worksheet.addRow(this.writeCat10Test(value));

            console.log("entered cat 10");
        } else {
            value = value as Cat21;
            console.log("entered cat 21");
            cat21Worksheet.addRow(this.writeCat21(value));
        }
        });

        // Set all text to be centered
        cat10Worksheet.eachRow(function(row: { eachCell: (arg0: (cell: any, colNumber: any) => void) => void; }) {
            row.eachCell(function(cell) {
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            });
        });

        cat21Worksheet.eachRow(function(row: { eachCell: (arg0: (cell: any, colNumber: any) => void) => void; }) {
            row.eachCell(function(cell) {
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            });
        });

        workbook.xlsx.writeFile(fileName)
        .then(() => {
            console.log('File saved!');
        })
        .catch((err: any) => {
            console.error(err);
        });
    }

    private writeCat10Test(value : Cat10) {
        const targetReportDescriptor : TargetReportDescriptor = this.getCat10TargetReport(value.targetReportDescriptor);
        const measuredPositionPolarCoordinates = this.getPolarCoordinates(value.measuredPositionPolarCoordinates);
        const positionWGS84Coordinates = this.getWG84Coordinates(value.positionWG84Coordinates);
        const positionCartesianCoordinates = this.getCartesianCoordinates(value.positionCartesianCoordinates);
        const timeofDay = this.getTimeofDay(value.timeOfDay);
        const trackNumber = this.getTrackNumber(value.trackNumber);
        const trackStatus = this.getTrackStatus(value.trackStatus);
        const velPolar = this.getVelocityPolar(value.calculatedTrackVelocityPolarCoordinates);
        const velCart = this.getVelocityCart(value.calculatedTrackVelocityCartesianCoordinates);
        const acceleration = this.getAcceleration(value.calculatedAcceleration);
        const targetSizeAndOrientation = this.getTargetSize(value.targetSizeAndOrientation);

        let res = [value.id, value.class, value.messageType.messageType, value.dataSourceIdentifier.sic, value.dataSourceIdentifier.sac,
            targetReportDescriptor.typ, targetReportDescriptor.dcr, targetReportDescriptor.chn, targetReportDescriptor.gbs, targetReportDescriptor.crt
            , measuredPositionPolarCoordinates[0], measuredPositionPolarCoordinates[1], positionWGS84Coordinates[0], positionWGS84Coordinates[1],
            positionCartesianCoordinates[0], positionCartesianCoordinates[1], timeofDay, trackNumber, trackStatus.cnf, trackStatus.tre, trackStatus.cst,
            trackStatus.mah, trackStatus.tcc, trackStatus.sth, velPolar[0], velPolar[1], velCart[0], velCart[1], acceleration[0], acceleration[1], targetSizeAndOrientation,
            ];
        return res;
    }

    private getCat10TargetReport(tar : TargetReportDescriptor) {
        let typ;
        try {
            typ = tar.typ;
            if (typ == null){
                typ = "No data";
            }
        }   catch { typ = "No data"};

        let dcr;
        try {
            dcr = tar.dcr;
            if (dcr == null){
                dcr = "No data";
            }
        }   catch { dcr = "No data"};

        let chn;
        try {
            chn = tar.chn;
            if (chn == null){
                chn = "No data";
            }
        }   catch { chn = "No data"};

        let gbs;
        try {
            gbs = tar.gbs;
            if (gbs == null){
                gbs = "No data";
            }
        }   catch { gbs = "No data"};

        let crt;
        try {
            crt = tar.crt;
            if (crt == null){
                crt = "No data";
            }
        }   catch { crt = "No data"};

        return new TargetReportDescriptor(typ, dcr, chn, gbs, crt);
    }

    private getWG84Coordinates(coordinates : PositionWG84Coordinates) {
        let lat;
        let lon;
        try {
            lat = coordinates.latitude;
            lon = coordinates.longitude;
        }   catch{ lat = "No data"
                    lon = "No data"};
        return[lat, lon];
    }

    private getPolarCoordinates(coordinates : MeasuredPositionPolarCoordinates) {
        let rho;
        let theta;
        try {
            rho = coordinates.rho;
            theta = coordinates.theta;
        }   catch{ rho = "No data"
                    theta = "No data"};
        return [rho, theta];
    }

    private getCartesianCoordinates(coordinates : PositionCartesianCoordinates) {
        let x;
        let y;
        try {
            x = coordinates.x;
            y = coordinates.y;
        }   catch{ x = "No data"
                    y = "No data"};
        return [x, y];
    }

    private getTimeofDay(time : TimeOfDay){
        let timeofDay;
        try {
            timeofDay = time.timestamp;
        }   catch{ timeofDay = "No data"};
        return timeofDay;
    }
    
    private getTrackNumber(track : TrackNumber){
        let trackn;
        try {
            trackn = track.value;
        }   catch{ trackn = "No data"};
        return trackn;
    }

    private getTrackStatus(status : TrackStatus){
        let cnf;
        let tre;
        let cst;
        let mah;
        let tcc;
        let sth;
        try {
            cnf = status.cnf;
            tre = status.tre;
            cst = status.cst;
            mah = status.mah;
            tcc = status.tcc;
            sth = status.sth;
        }   catch{  cnf = tre = cst = mah = tcc = sth = "No data"};
        return new TrackStatus(cnf, tre, cst, mah, tcc, sth);
    }
    
    private getVelocityPolar(vel : CalculatedTrackVelocityPolarCoordinates){
        let rho;
        let theta;
        try {
            rho = vel.rho;
            theta = vel.theta;
        }   catch { rho = theta = "No data"};
        return [rho, theta];
    }

    private getVelocityCart(vel : CalculatedTrackVelocityCartesianCoordinates){
        let x;
        let y;
        try {
            x = vel.x;
            y = vel.y;
        }   catch { x = y = "No data"};
        return [x, y];
    }

    private getAcceleration(acc : CalculatedAcceleration){
        let ax;
        let ay;
        try {
            ax = acc.ax;
            ay = acc.ay;
        }   catch{  ax = ay = "No data"};
        return [ax, ay];
    }

    private getTargetSize(data : TargetSizeAndOrientation){
        let size;
        try {
            size = data.length;
        }   catch{  size = "No data"};
        return size;
    }

    private writeCat21(value : Cat21) {

        let timeofMessageReceptionofVelocity;
        try {
            timeofMessageReceptionofVelocity = value.timeofMessageReceptionofVelocity.time;
        }   catch {timeofMessageReceptionofVelocity = "No data"};

        let geo;
        try{
            geo = value.geometricHeight.geometricHeight;
        } catch{ geo = "No Data"};

        let mode3A;
        try {
            mode3A = value.mode3A.code;
        }   catch {mode3A = "No data"};

        let flightLevel;
        try {
            flightLevel = value.flightLevel.fligthLevel;
        }   catch {flightLevel = "No data"};
        
        let targetStatusIcf;
        let targetStatusLnav;
        let targetStatusPs;
        let targetStatusSs;
        try {
            targetStatusIcf = value.targetStatus.icf;
            targetStatusLnav = value.targetStatus.lnav;
            targetStatusPs = value.targetStatus.ps;
            targetStatusSs = value.targetStatus.ss;
        } catch {targetStatusIcf = targetStatusLnav = targetStatusPs = targetStatusSs = "No data"};

        let barometricVerticalRate;
        try {
            barometricVerticalRate = value.barometricVerticalRate.value;
        }   catch{barometricVerticalRate = "No data"};

        let ariborneGroundVectorGs;
        let ariborneGroundVectorTa;
        try {
            ariborneGroundVectorGs = value.ariborneGroundVector.ground_speed;
            ariborneGroundVectorTa = value.ariborneGroundVector.track_angle;
        }   catch {ariborneGroundVectorGs = ariborneGroundVectorTa = "No data"};

        let timeofReportTransmission;
        try{
            timeofReportTransmission = value.timeofReportTransmission.time;
        }   catch {timeofReportTransmission = "No data"};

        let targetIdentification;
        try {
            targetIdentification = value.targetIdentification.data.join("");

        }   catch{targetIdentification = "No data"};

        let selectedAltitude;
        try{
            selectedAltitude = value.selectedAltitude.altitude;
        }   catch {selectedAltitude = "No data"};

        let aircraftOperationalStatusRa;
        let aircraftOperationalStatusTc;
        let aircraftOperationalStatusTs;
        let aircraftOperationalStatusArv;
        let aircraftOperationalStatusCdti;
        let aircraftOperationalStatusTcas;
        let aircraftOperationalStatusSa;
        try{
            aircraftOperationalStatusRa = value.aircraftOperationalStatus.ra;
            aircraftOperationalStatusTc = value.aircraftOperationalStatus.tc;
            aircraftOperationalStatusTs = value.aircraftOperationalStatus.ts;
            aircraftOperationalStatusArv = value.aircraftOperationalStatus.arv;
            aircraftOperationalStatusCdti = value.aircraftOperationalStatus.cdti;
            aircraftOperationalStatusTcas = value.aircraftOperationalStatus.tcas;
            aircraftOperationalStatusSa = value.aircraftOperationalStatus.sa;
        }   catch {aircraftOperationalStatusRa = aircraftOperationalStatusTc = aircraftOperationalStatusTs = aircraftOperationalStatusArv = aircraftOperationalStatusCdti = aircraftOperationalStatusTcas = aircraftOperationalStatusSa = "No data"};

        let emitterCategory;
        try {
            emitterCategory = value.emitterCategory.ecat;
        } catch {emitterCategory = "No data"};

        let dataAgesAos;
        let dataAgesTrd;
        let dataAgesM3a;
        let dataAgesQi;
        try{
            dataAgesAos = value.dataAges.aos + 's';
            dataAgesTrd = value.dataAges.trd + 's';
            dataAgesM3a = value.dataAges.m3a + 's';
            dataAgesQi = value.dataAges.qi + 's';
        }   catch { dataAgesAos = dataAgesTrd = dataAgesM3a = dataAgesQi = "No data"};
         

        let res = [value.id, value.class, value.dataSourceIdentifier.sac, value.dataSourceIdentifier.sic, value.targetReportDescriptor.atp, value.targetReportDescriptor.arc, value.targetReportDescriptor.rc,
        value.targetReportDescriptor.rab, value.targetReportDescriptor.dcr, value.targetReportDescriptor.gbs, value.targetReportDescriptor.sim, value.targetReportDescriptor.tst, value.targetReportDescriptor.saa,
        value.targetReportDescriptor.cl, value.targetReportDescriptor.ipc, value.targetReportDescriptor.nogo, value.targetReportDescriptor.cpr, value.targetReportDescriptor.ldpj, value.targetReportDescriptor.rcf,
        value.trackNumber.value, value.positioninWGS84Coordinates.latitude, value.positioninWGS84Coordinates.longitude, value.targetAddress.value, timeofMessageReceptionofVelocity, geo, value.qualityIndicators.nucr_or_nacv, value.qualityIndicators.nucp_or_nic,
        value.qualityIndicators.nicbaro, value.qualityIndicators.sil, value.qualityIndicators.nacp, value.qualityIndicators.second_sil, value.qualityIndicators.sda, value.qualityIndicators.gva, value.qualityIndicators.pic, value.mopsVersion.vn, mode3A, flightLevel,
        targetStatusIcf, targetStatusLnav, targetStatusPs, targetStatusSs, barometricVerticalRate, ariborneGroundVectorGs, ariborneGroundVectorTa, timeofReportTransmission, targetIdentification, emitterCategory,
        selectedAltitude, aircraftOperationalStatusRa, aircraftOperationalStatusTc, aircraftOperationalStatusTs, aircraftOperationalStatusArv, aircraftOperationalStatusCdti, aircraftOperationalStatusTcas, aircraftOperationalStatusSa,
        value.messageAmplitude.messageAmplitude, dataAgesAos, dataAgesTrd, dataAgesM3a, dataAgesQi];
        return res;
    }
   
    }
    
