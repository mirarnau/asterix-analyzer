//import { workerData } from "node:worker_threads";
//import { createWriteStream } from "node:fs";
import { Cat10 } from "../cat10/Cat10";
import { Cat21 } from "../cat21/Cat21";
//import * as fs from 'fs';


export class ExportToCSV {
    constructor (){}
    
    public async doStuff(messages : (Cat10 | Cat21)[] = [], fileName : string) {
        const mgs: (Cat10 | Cat21)[] = messages as (Cat10 | Cat21)[];
        // const XLSX = require('xlsx');

        // // Create a new workbook
        // const workbook = XLSX.utils.book_new();

        // // Define the data to be written in separate cells
        // const data = [
        // ["Id", "Class", "Message type", "Data source identifier", "Target report description", "WGS84 coordinates", "Polar coordinates"]];

        
    
        //const fil = fs.createWriteStream(fileName);
        //const csvContent = messages.join(',\n');

        // Write the CSV content to a file
        //fs.writeFileSync(fileName, csvContent, { encoding: 'utf-8' });
    
        // fil.write(
        //     "Id,Class,Message type,Data source identifier,Target report description,WGS84 coordinates,Polar coordinates,Cartesian coordinates,Calculated track velocity polar coordinates,Calculated track velocity cartesian coordinates,Mod 3A code,Flight level,Measured height,Altitude of primary plot,Time of day,Track number,Track status,Calculated acceleration,Target address,Target identification,Mode S MB data,Target size and orientation,Presence,Vehicle fleet identification,Preprogrammed message,Standard deviation of position,System status,Aircraft operational status,Service identification,Service management,Emitter category,Target report descriptor,Time applicability position,Time applicability velocity,Time message reception position,Time message reception position high,Time message reception velocity,Time message reception velocity high,TimeASTERIX report transmission,Quality indicator,Tarjectory intent,WGS84 coordinates high,Message amplitude,Geometric height,Selected altitude,Final state selected altitude,Air speed,True airspeed,Magnetic heading,Barometric vertical rate,Geometric vertical rate,Airborne ground vector,Track angle rate,Target status,MOPS version,Met information,Roll angle,ACAS resolution advisory report,Surface capabilities and characteristics,Receiver ID \n"
        //   );
    
        // console.log("Cat 10 Message not found yet");
        // console.log("Class: " + mgs[0].class);
        // console.log(mgs);

        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Cat21');
        
        const worksheet2 = workbook.addWorksheet('Cat10');

        // Write headers to the first row
        worksheet.getRow(1).values = ['Id', 'Class', 'Data Source Identifier', 'Target Report Descriptor', 'Track Number', 'Service Identification', 'Position in WGS-84 co-ordinates', 'High Resolution Position in WGS-84 co-ordinates', 'Target Address', 'Time of Applicability for Position', 'Time of Applicability for Velocity', 'Air Speed', 'True Air Speed', 'Time of Message Reception of Position', 'Time of Message Reception of Position High Precision', 'Time of Message Reception of Velocity', 'Time of Message Reception of Velocity High Precision', 'Geometric Height', 'Quality Indicators', 'MOPS Version', 'Mode 3-A Code', 'Roll Angle', 'Flight Level', 'Magnetic Heading', 'Target Status', 'Barometric Vertical Rate', 'Geometric Vertical Rate', 'Airborne Ground Vector', 'Track Angle Rate', 'Time of Report Transmission', 'Target Identification', 'Emitter Category', 'Met information', 'Selectied Altitude', 'Final Selected Altitude', 'Trajectory Intent', 'Service Management', 'Aircraft Operational Status', 'Surface Capabilities and Characteristics', 'Message Amplitude', 'Mode SMB Data', 'ACAS Resolution Advisory Report', 'Receiver ID', 'Data Ages'];
        worksheet2.getRow(1).values = ['Id', 'Class'];
        // Write values to subsequent rows and cells

        // Write the workbook to a file
        console.log("Class value = " + mgs[0].class);
               
        mgs.forEach((value) => {
        if (value.class === "Cat10") {
            value = value as Cat10;
            worksheet2.addRow(this.writeCat10(value));
            console.log("entered cat 10");
             //data.push(this.tocsvCat10(value).join('",'));
            //fil.write('"' + this.tocsvCat10(value).join('","') + '" \n');

            //fs.writeFileSync(fileName,'"' + this.tocsvCat10(value).join('","'), { encoding: 'utf-8'});
        } else {
            value = value as Cat21;
            console.log("entered cat 21");
            worksheet.addRow(this.writeCat21(value));
        }
        });

        workbook.xlsx.writeFile(fileName)
        .then(() => {
            console.log('File saved!');
        })
        .catch((err: any) => {
            console.error(err);
        });
    }

    private writeCat10(value : Cat10) {
        let res =[value.id, value.class];
        return res;
    }
    private writeCat21(value : Cat21) {

        let timeofApplicabilityforPosition;
        try{
            timeofApplicabilityforPosition = value.timeofApplicabilityforPosition.time;
        }   catch {timeofApplicabilityforPosition = "No data"};

        let timeofApplicabilityforVelocity;
        try{
            timeofApplicabilityforVelocity = value.timeofApplicabilityforVelocity.time;
        }   catch {timeofApplicabilityforVelocity = "No data"};

        let airSpeed;
        try {
            airSpeed = value.airSpeed.value;
        }   catch {airSpeed = "No data"};

        let trueAirSpeed;
        try {
            trueAirSpeed = value.trueAirSpeed.value;
        }   catch {trueAirSpeed = "No data"};

        let timeofMessageReceptionofPosition;
        try {
            timeofMessageReceptionofPosition = value.timeofMessageReceptionofPosition.time;
        }   catch {timeofMessageReceptionofPosition = "No data"};

        let timeofMessageReceptionofPosition_highPres;
        try {
            timeofMessageReceptionofPosition_highPres = value.timeofMessageReceptionofPosition_highPres.time;
        }   catch {timeofMessageReceptionofPosition_highPres = "No data"};

        let timeofMessageReceptionofVelocity;
        try {
            timeofMessageReceptionofVelocity = value.timeofMessageReceptionofVelocity.time;
        }   catch {timeofMessageReceptionofVelocity = "No data"};

        let timeofMessageReceptionofVelocity_highPres;
        try {
            timeofMessageReceptionofVelocity_highPres = value.timeofMessageReceptionofVelocity_highPres.time;
        }   catch {timeofMessageReceptionofVelocity_highPres = "No data"};

        let geo;
        try{
            geo = value.geometricHeight.geometricHeight;
        } catch{ geo = "No Data"};

        let mode3A;
        try {
            mode3A = value.mode3A.code;
        }   catch {mode3A = "No data"};

        let rollAngle;
        try { 
            rollAngle = value.rollAngle.value;
        } catch {rollAngle = "No data"};

        let flightLevel;
        try {
            flightLevel = value.flightLevel.fligthLevel;
        }   catch {flightLevel = "No data"};
        
        let magneticHeading;
        try {
            magneticHeading = value.magneticHeading.value;
        }   catch {magneticHeading = "No data"};

        let targetStatusIcf;
        let targetStatusLnav;
        let targetStatusPs;
        let targetStatusSs;
        let targetStatus;
        try {
            targetStatusIcf = value.targetStatus.icf;
            targetStatusLnav = value.targetStatus.lnav;
            targetStatusPs = value.targetStatus.ps;
            targetStatusSs = value.targetStatus.ss;
            targetStatus = "ICF: " + targetStatusIcf + " LNAV: " + targetStatusLnav + " PS: " + targetStatusPs + " SS: " + targetStatusSs;
        } catch {targetStatus = "No data"};

        let barometricVerticalRate;
        try {
            barometricVerticalRate = value.barometricVerticalRate.value;
        }   catch{barometricVerticalRate = "No data"};

        let geometricVerticalRate;
        try {
            geometricVerticalRate = value.geometricVerticalRate.value;
        }   catch {geometricVerticalRate = "No data"};

        let ariborneGroundVectorGs;
        let ariborneGroundVectorTa;
        let ariborneGroundVector;
        try {
            ariborneGroundVectorGs = value.ariborneGroundVector.ground_speed;
            ariborneGroundVectorTa = value.ariborneGroundVector.track_angle;
            ariborneGroundVector = "GS: " + ariborneGroundVectorGs + " TA: " + ariborneGroundVectorTa;
        }   catch {ariborneGroundVector = "No data"};

        let trackAngleRate;
        try {
            trackAngleRate = value.trackAngleRate.tar;
        }   catch {trackAngleRate = "No data"};

        let timeofReportTransmission;
        try{
            timeofReportTransmission = value.timeofReportTransmission.time;
        }   catch {timeofReportTransmission = "No data"};

        let metInformation = "No data";

        let targetIdentification;
        try {
            targetIdentification = value.targetIdentification.data;
        }   catch{targetIdentification = "No data"};

        let selectedAltitude;
        try{
            selectedAltitude = value.selectedAltitude.altitude;
        }   catch {selectedAltitude = "No data"};

        let finalStateSelectedAltitude;
        try{
            finalStateSelectedAltitude = value.finalStateSelectedAltitude.altitude;
        } catch {finalStateSelectedAltitude = "No data"};

        let trajectoryIntent = "No data";

        let serviceManagement;
        try{
            serviceManagement = value.serviceManagement.rp;
        }   catch{ serviceManagement = "No data"};

        let aircraftOperationalStatusRa;
        let aircraftOperationalStatusTc;
        let aircraftOperationalStatusTs;
        let aircraftOperationalStatusArv;
        let aircraftOperationalStatusCdti;
        let aircraftOperationalStatusTcas;
        let aircraftOperationalStatusSa;
        let aircraftOperationalStatus;
        try{
            aircraftOperationalStatusRa = value.aircraftOperationalStatus.ra;
            aircraftOperationalStatusTc = value.aircraftOperationalStatus.tc;
            aircraftOperationalStatusTs = value.aircraftOperationalStatus.ts;
            aircraftOperationalStatusArv = value.aircraftOperationalStatus.arv;
            aircraftOperationalStatusCdti = value.aircraftOperationalStatus.cdti;
            aircraftOperationalStatusTcas = value.aircraftOperationalStatus.tcas;
            aircraftOperationalStatusSa = value.aircraftOperationalStatus.sa;
            aircraftOperationalStatus = "RA: " + aircraftOperationalStatusRa + " TC: " + aircraftOperationalStatusTc + " TS: " + aircraftOperationalStatusTs
            + " ARV: " + aircraftOperationalStatusArv + " CDTI: " + aircraftOperationalStatusCdti + " TCAS: " + aircraftOperationalStatusTcas + " SA: " + aircraftOperationalStatusSa;
        }   catch {aircraftOperationalStatus = "No data"};

        let surfaCapabilitiesandCharacteristics;
        let surfaCapabilitiesandCharacteristicsPoa;
        let surfaCapabilitiesandCharacteristicsCdtis;
        let surfaCapabilitiesandCharacteristicsB2;
        let surfaCapabilitiesandCharacteristicsRas;
        let surfaCapabilitiesandCharacteristicsIdent;
        let surfaCapabilitiesandCharacteristicsLw;
        try{
            surfaCapabilitiesandCharacteristicsPoa = value.surfaCapabilitiesandCharacteristics.poa;
            surfaCapabilitiesandCharacteristicsCdtis = value.surfaCapabilitiesandCharacteristics.cdtis;
            surfaCapabilitiesandCharacteristicsB2 = value.surfaCapabilitiesandCharacteristics.b2_low;
            surfaCapabilitiesandCharacteristicsRas = value.surfaCapabilitiesandCharacteristics.ras;
            surfaCapabilitiesandCharacteristicsIdent = value.surfaCapabilitiesandCharacteristics.ident;
            surfaCapabilitiesandCharacteristicsLw = value.surfaCapabilitiesandCharacteristics.LW;
            surfaCapabilitiesandCharacteristics = "POA: " + surfaCapabilitiesandCharacteristicsPoa + " CDTIS: " + surfaCapabilitiesandCharacteristicsCdtis
            + " B2_low: " + surfaCapabilitiesandCharacteristicsB2 + " RAS: " + surfaCapabilitiesandCharacteristicsRas + " Ident: " + surfaCapabilitiesandCharacteristicsIdent
            + " LW: " + surfaCapabilitiesandCharacteristicsLw;
        }   catch{surfaCapabilitiesandCharacteristics = "No data"};

        let modeSMBData = "No data";

        let acasResolutionAdvisoryReport = "No data";        

        let emitterCategory;
        try {
            emitterCategory = value.emitterCategory.ecat;
        } catch {emitterCategory = "No data"};
         

        let res = [value.id, value.class, "SAC: " + value.dataSourceIdentifier.sac + " SIC: " + value.dataSourceIdentifier.sic, " ATP : " + value.targetReportDescriptor.atp + " ARC: " + value.targetReportDescriptor.arc + value.trackNumber.value + " RC" + value.targetReportDescriptor.rc
        + " RAB: " + value.targetReportDescriptor.rab + " DCR: " + value.targetReportDescriptor.dcr + " GBS: " + value.targetReportDescriptor.gbs + " SIM: " + value.targetReportDescriptor.sim + " TST: " + value.targetReportDescriptor.tst + " SAA: " + value.targetReportDescriptor.saa
        + " CL: " + value.targetReportDescriptor.cl + " IPC: " + value.targetReportDescriptor.ipc + " NOGO: " + value.targetReportDescriptor.nogo + " CPR: " + value.targetReportDescriptor.cpr + " LDPJ: " + value.targetReportDescriptor.ldpj + " RCF: " + value.targetReportDescriptor.rcf,
        value.trackNumber.value, value.serviceIdentification.serviceIdentification, "Latitude: " + value.positioninWGS84Coordinates.latitude + " Longitude: " + value.positioninWGS84Coordinates.longitude, "Latitude: " + value.highResPositioninWGS84Coordinates.latitude + " Longitude: " + value.highResPositioninWGS84Coordinates.longitude,
        value.targetAddress.value, timeofApplicabilityforPosition, timeofApplicabilityforVelocity, airSpeed, trueAirSpeed, timeofMessageReceptionofPosition,
        timeofMessageReceptionofPosition_highPres, timeofMessageReceptionofVelocity, timeofMessageReceptionofVelocity_highPres, geo, "NUCr or NACv: " + value.qualityIndicators.nucr_or_nacv + " NUCp or NIC: " + value.qualityIndicators.nucp_or_nic
        + " NICbaro: " + value.qualityIndicators.nicbaro + " SIL: " + value.qualityIndicators.sil + " NACp: " + value.qualityIndicators.nacp + " SILs : " + value.qualityIndicators.second_sil 
        + " SDA: " + value.qualityIndicators.sda + " GVA: " + value.qualityIndicators.gva + " PIC: " + value.qualityIndicators.pic, value.mopsVersion.vn, mode3A, rollAngle, flightLevel,
        magneticHeading, targetStatus, barometricVerticalRate, geometricVerticalRate, ariborneGroundVector, trackAngleRate, timeofReportTransmission, targetIdentification, emitterCategory,
        metInformation, selectedAltitude, finalStateSelectedAltitude, trajectoryIntent, serviceManagement, aircraftOperationalStatus, surfaCapabilitiesandCharacteristics,
        value.messageAmplitude.messageAmplitude, modeSMBData, acasResolutionAdvisoryReport, value.receiverID.id,
        "AOS: " + value.dataAges.aos + " TRD: " + value.dataAges.trd + " M3A: " + value.dataAges.m3a + " QI: " + value.dataAges.qi];
        return res;
    }
   
    }
    
