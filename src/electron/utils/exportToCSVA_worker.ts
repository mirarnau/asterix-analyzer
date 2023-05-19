import { workerData, parentPort } from "node:worker_threads";
import { createWriteStream } from "node:fs";
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

  const fil = createWriteStream(workerData.filePath);

  fil.write(
    "Id,Class,Message type,Data source identifier,Target report description,WGS84 coordinates,Polar coordinates,Cartesian coordinates,Calculated track velocity polar coordinates,Calculated track velocity cartesian coordinates,WGS84 coordinates high,Flight level,Measured height,Geometric height,Time of day,Track number,Track status,Aircraft operational status,Target address,Target identification,Mode S MB data,Target size and orientation,Presence,Vehicle fleet identification,Preprogrammed message,Standard deviation of position,System status,Calculated acceleration,Service identification,Service management,Quality indicator,Target report descriptor,Time applicability position,Time applicability velocity,Time message reception position,Time message reception position high,Time message reception velocity,Time message reception velocity high,TimeASTERIX report transmission,Emitter category,Tarjectory intent,Mod 3A code,Message amplitude,Altitude of primary plot,Selected altitude,Final state selected altitude,Air speed,True airspeed,Magnetic heading,Barometric vertical rate,Geometric vertical rate,Airborne ground vector,Track angle rate,Target status,MOPS version,Met information,Roll angle,ACAS resolution advisory report,Surface capabilities and characteristics,Receiver ID \n"
  );

  await mgs.forEach((value,idx) => {
    if (value.class === "Cat10") {
      value = value as Cat10;
      if(idx%10000==0){
        console.log(idx);
      }
      fil.write('"' + tocsvCat10(value).join('","') + '" \n');
    } else {
      value = value as Cat21;
      if(idx%10000==0){
        console.log(idx);
      }
      fil.write('"' + tocsvCat21(value).join('","') + '" \n');
    }
  });

  fil.end();
  fil.close();

  //   writeFile(workerData.filePath, csvContent, (err) => {
  //     if (err) console.error(err);
  //   });
}

function tocsvCat10(msg: Cat10) {
  let csv: string[];
  csv = Array(60).fill(" ");
  csv[0] = msg.id.toString();
  csv[1] = "Cat10";

  csv[2] = msg.messageType.messageType;
  csv[3] = "SAC: " + msg.dataSourceIdentifier.sac + " SIC: " + msg.dataSourceIdentifier.sic;

  if (msg.targetReportDescriptor) {
    if (msg.targetReportDescriptor.tot) {
      csv[4] =
        "TYP: " +
        msg.targetReportDescriptor.typ +
        " DCR: " +
        msg.targetReportDescriptor.dcr +
        " CHN: " +
        msg.targetReportDescriptor.chn +
        " GBS: " +
        msg.targetReportDescriptor.gbs +
        " CRT:" +
        msg.targetReportDescriptor.crt +
        " SIM: " +
        msg.targetReportDescriptor.sim +
        " TST: " +
        msg.targetReportDescriptor.tst +
        " RAB: " +
        msg.targetReportDescriptor.rab +
        " LOP: " +
        msg.targetReportDescriptor.lop +
        " TOT: " +
        msg.targetReportDescriptor.tot;
    } else {
      csv[4] =
        "TYP: " +
        msg.targetReportDescriptor.typ +
        " DCR: " +
        msg.targetReportDescriptor.dcr +
        " CHN: " +
        msg.targetReportDescriptor.chn +
        " GBS: " +
        msg.targetReportDescriptor.gbs +
        " CRT:" +
        msg.targetReportDescriptor.crt;
    }
  }
  if (msg.positionWG84Coordinates)
    csv[5] = "Latitude: " + msg.positionWG84Coordinates.latitude + " Longitude: " + msg.positionWG84Coordinates.longitude;

  if (msg.measuredPositionPolarCoordinates) csv[6] = "r: " + msg.measuredPositionPolarCoordinates.rho + " theta: " + msg.measuredPositionPolarCoordinates.theta;

  if (msg.positionCartesianCoordinates) csv[7] = "x: " + msg.positionCartesianCoordinates.x + " y: " + msg.positionCartesianCoordinates.y;

  if (msg.calculatedTrackVelocityPolarCoordinates)
    csv[8] =
      "Ground speed " +
      msg.calculatedTrackVelocityPolarCoordinates.ground_speed +
      " Track angle: " +
      msg.calculatedTrackVelocityPolarCoordinates.track_angle;

  if (msg.calculatedTrackVelocityCartesianCoordinates)
    csv[9] =
      "x: " +
      msg.calculatedTrackVelocityCartesianCoordinates.x +
      " y: " +
      msg.calculatedTrackVelocityCartesianCoordinates.y;

  if (msg.mode3ACodeOctalRepresentation)
    csv[41] =
      "V: " +
      msg.mode3ACodeOctalRepresentation.v +
      " G: " +
      msg.mode3ACodeOctalRepresentation.g +
      " L: " +
      msg.mode3ACodeOctalRepresentation.l +
      " Mode: " +
      msg.mode3ACodeOctalRepresentation.mode;

  if (msg.flightLevelBinary)
    csv[11] =
      "V: " + msg.flightLevelBinary.v + " G: " + msg.flightLevelBinary.g + " FlightLevel: " + msg.flightLevelBinary.flightLevel;

  if (msg.measuredHeight) csv[12] = msg.measuredHeight.height.toString();

  if (msg.amplitudeOfPrimaryPlot) csv[43] = msg.amplitudeOfPrimaryPlot.value.toString();

  if (msg.timeOfDay) csv[14] = new Date(msg.timeOfDay.timestamp * 1000).toISOString().substring(11, 23);

  if (msg.trackNumber) csv[15] = msg.trackNumber.value.toString();

  if (msg.trackStatus) {
    if (msg.trackStatus.gho) {
      csv[16] =
        "CNF: " +
        msg.trackStatus.cnf +
        " TRE: " +
        msg.trackStatus.tre +
        " CST: " +
        msg.trackStatus.cst +
        " MAH: " +
        msg.trackStatus.mah +
        " TCC: " +
        msg.trackStatus.tcc +
        " STH: " +
        msg.trackStatus.sth +
        " TOM: " +
        msg.trackStatus.tom +
        " DOU: " +
        msg.trackStatus.dou +
        " MRS: " +
        msg.trackStatus.mrs +
        " GHO: " +
        msg.trackStatus.gho;
    } else if (msg.trackStatus.dou) {
      csv[16] =
        "CNF: " +
        msg.trackStatus.cnf +
        " TRE: " +
        msg.trackStatus.tre +
        " CST: " +
        msg.trackStatus.cst +
        " MAH: " +
        msg.trackStatus.mah +
        " TCC: " +
        msg.trackStatus.tcc +
        " STH: " +
        msg.trackStatus.sth +
        " TOM: " +
        msg.trackStatus.tom +
        " DOU: " +
        msg.trackStatus.dou +
        " MRS: " +
        msg.trackStatus.mrs;
    } else {
      csv[16] =
        "CNF: " +
        msg.trackStatus.cnf +
        " TRE: " +
        msg.trackStatus.tre +
        " CST: " +
        msg.trackStatus.cst +
        " MAH: " +
        msg.trackStatus.mah +
        " TCC: " +
        msg.trackStatus.tcc +
        " STH: " +
        msg.trackStatus.sth;
    }
  }

  if (msg.calculatedAcceleration) csv[27] = "Ax: " + msg.calculatedAcceleration.ax+ " Ay: " + msg.calculatedAcceleration.ay;
    
  if (msg.targetAddress) csv[18] = msg.targetAddress.value.substring(2);

  if (msg.targetIdentification) csv[19] = msg.targetIdentification.data;

  if (msg.modeSMBData) csv[20] = msg.modeSMBData.data.join(" / ");

  if (msg.targetSizeAndOrientation) {
    if (msg.targetSizeAndOrientation.width) {
      csv[21] =
        "Length: " +
        msg.targetSizeAndOrientation.length +
        " Orientation: " +
        msg.targetSizeAndOrientation.orientation +
        " Width: " +
        msg.targetSizeAndOrientation.width;
    } else if (msg.targetSizeAndOrientation.orientation) {
      csv[21] =
        "Length: " +
        msg.targetSizeAndOrientation.length +
        "Orientation: " +
        msg.targetSizeAndOrientation.orientation;
    } else {
      csv[21] = "Lenght: " + msg.targetSizeAndOrientation.length;
    }
  }

  if (msg.presence) {
    msg.presence.forEach((v: { DRHO: string; DTHETA: string; }) => {
      csv[22] = csv[22] + "/ " + "DRHO: " + v.DRHO + " DTHETA: " + v.DTHETA;
    });
  }

  if (msg.vehicleFleetIdentification) csv[23] = msg.vehicleFleetIdentification.value;

  if (msg.preProgrammedMessage)
    csv[24] = "TRB: " + msg.preProgrammedMessage.trb + " MSG: " + msg.preProgrammedMessage.message;

  if (msg.standardDeviationOfPosition)
    csv[25] =
      "X_component: " +
      msg.standardDeviationOfPosition.xComponent +
      " Y_component: " +
      msg.standardDeviationOfPosition.yComponent +
      " Covariance: " +
      msg.standardDeviationOfPosition.covariance;

  if (msg.systemStatus)
    csv[26] =
      "NOGO: " +
      msg.systemStatus.nogo +
      " OVL: " +
      msg.systemStatus.ovl +
      " TSV: " +
      msg.systemStatus.tsv +
      " DIV: " +
      msg.systemStatus.div +
      " TTF: " +
      msg.systemStatus.ttf;

  return csv;
}

function tocsvCat21(msg: Cat21) {
  let csv: string[];
  csv = Array(60).fill(" ");
  csv[0] = msg.id.toString();
  csv[1] = "Cat21";

  if (msg.aircraftOperationalStatus)
    csv[17] =
      "RA: " +
      msg.aircraftOperationalStatus.ra +
      " TC: " +
      msg.aircraftOperationalStatus.tc +
      " TS: " +
      msg.aircraftOperationalStatus.ts +
      " ARV: " +
      msg.aircraftOperationalStatus.arv +
      " CDTI:" +
      msg.aircraftOperationalStatus.cdti +
      " TCAS: " +
      msg.aircraftOperationalStatus.tcas +
      " SA: " +
      msg.aircraftOperationalStatus.sa;

  if (msg.serviceIdentification) csv[28] = msg.serviceIdentification.serviceIdentification;

  if (msg.serviceManagement) csv[29] = msg.serviceManagement.rp;

  if (msg.emitterCategory) csv[39] = msg.emitterCategory.ecat;

  if (msg.targetReportDescriptor) {
    if (msg.targetReportDescriptor.rcf) {
      csv[31] =
        "ATP: " +
        msg.targetReportDescriptor.atp +
        " ARC: " +
        msg.targetReportDescriptor.arc +
        " RC: " +
        msg.targetReportDescriptor.rc +
        " RAB: " +
        msg.targetReportDescriptor.rab +
        " DCR: " +
        msg.targetReportDescriptor.dcr +
        " GBS: " +
        msg.targetReportDescriptor.gbs +
        " SIM: " +
        msg.targetReportDescriptor.sim +
        " TST: " +
        msg.targetReportDescriptor.tst +
        " SAA: " +
        msg.targetReportDescriptor.saa +
        " CL: " +
        msg.targetReportDescriptor.cl +
        " IPC: " +
        msg.targetReportDescriptor.ipc +
        " NOGO: " +
        msg.targetReportDescriptor.nogo +
        " CPR: " +
        msg.targetReportDescriptor.cpr +
        " LDPJ: " +
        msg.targetReportDescriptor.ldpj +
        " RCF: " +
        msg.targetReportDescriptor.rcf;
    } else if (msg.targetReportDescriptor.saa) {
      csv[31] =
        "ATP: " +
        msg.targetReportDescriptor.atp +
        " ARC: " +
        msg.targetReportDescriptor.arc +
        " RC: " +
        msg.targetReportDescriptor.rc +
        " RAB: " +
        msg.targetReportDescriptor.rab +
        " DCR: " +
        msg.targetReportDescriptor.dcr +
        " GBS: " +
        msg.targetReportDescriptor.gbs +
        " SIM: " +
        msg.targetReportDescriptor.sim +
        " TST: " +
        msg.targetReportDescriptor.tst +
        " SAA: " +
        msg.targetReportDescriptor.saa +
        " CL: " +
        msg.targetReportDescriptor.cl;
    } else {
      csv[31] =
        "ATP: " +
        msg.targetReportDescriptor.atp +
        " ARC: " +
        msg.targetReportDescriptor.arc +
        " RC: " +
        msg.targetReportDescriptor.rc +
        " RAB: " +
        msg.targetReportDescriptor.rab;
    }
  }

  if (msg.mode3A) csv[41] = msg.mode3A.code;

  if (msg.timeofApplicabilityforPosition) csv[32] = new Date(msg.timeofApplicabilityforPosition.time * 1000).toISOString().substring(11, 23);

  if (msg.timeofApplicabilityforVelocity) csv[33] = new Date(msg.timeofApplicabilityforVelocity.time * 1000).toISOString().substring(11, 23);

  if (msg.timeofMessageReceptionofPosition) csv[34] = new Date(msg.timeofMessageReceptionofPosition.time * 1000).toISOString().substring(11, 23);

  if (msg.timeofMessageReceptionofPosition_highPres) csv[35] = new Date(msg.timeofMessageReceptionofPosition_highPres.time * 1000).toISOString().substring(11, 23);

  if (msg.timeofMessageReceptionofVelocity) csv[36] = new Date(msg.timeofMessageReceptionofVelocity.time * 1000).toISOString().substring(11, 23);

  if (msg.timeofMessageReceptionofVelocity_highPres) csv[37] = new Date(msg.timeofMessageReceptionofVelocity_highPres.time * 1000).toISOString().substring(11, 23);

  if (msg.timeofReportTransmission) csv[38] = new Date(msg.timeofReportTransmission.time * 1000).toISOString().substring(11, 23);

  if (msg.targetAddress) csv[18] = msg.targetAddress.value.substring(2);

  if (msg.qualityIndicators) {
    if (msg.qualityIndicators.pic) {
      csv[30] =
        "NUCr_or_NACv: " +
        msg.qualityIndicators.nucr_or_nacv +
        " NUCp_or_NIC: " +
        msg.qualityIndicators.nucp_or_nic +
        " NICBARO: " +
        msg.qualityIndicators.nicbaro +
        " SIL: " +
        msg.qualityIndicators.sil +
        " NACP: " +
        msg.qualityIndicators.nacp +
        " SILsupplement: " +
        msg.qualityIndicators.second_sil +
        " GVA: " +
        msg.qualityIndicators.gva +
        " PIC: " +
        msg.qualityIndicators.pic;
    } else if (msg.qualityIndicators.gva) {
      csv[30] =
        "NUCr_or_NACv: " +
        msg.qualityIndicators.nucr_or_nacv +
        " NUCp_or_NIC: " +
        msg.qualityIndicators.nucp_or_nic +
        " NICBARO: " +
        msg.qualityIndicators.nicbaro +
        " SIL: " +
        msg.qualityIndicators.sil +
        " NACP: " +
        msg.qualityIndicators.nacp +
        " SILsupplement: " +
        msg.qualityIndicators.second_sil +
        " GVA: " +
        msg.qualityIndicators.gva;
    } else if (msg.qualityIndicators.sil) {
      csv[30] =
        "NUCr_or_NACv: " +
        msg.qualityIndicators.nucr_or_nacv +
        " NUCp_or_NIC: " +
        msg.qualityIndicators.nucp_or_nic +
        " NICBARO: " +
        msg.qualityIndicators.nicbaro +
        " SIL: " +
        msg.qualityIndicators.sil +
        " NACP: " +
        msg.qualityIndicators.nacp;
    } else {
      csv[30] =
        "NUCr_or_NACv: " + msg.qualityIndicators.nucr_or_nacv + " NUCp_or_NIC: " + msg.qualityIndicators.nucp_or_nic;
    }
  }

  if (msg.trajectoryIntent) {
    csv[40] =
      "TIS: " +
      msg.trajectoryIntent.tis +
      " NAV: " +
      msg.trajectoryIntent.nav +
      " NVB: " +
      msg.trajectoryIntent.nvb +
      " TID: " +
      msg.trajectoryIntent.tid;
  }

  if (msg.positioninWGS84Coordinates)
    csv[5] = "Latitude: " + msg.positioninWGS84Coordinates.latitude + " Longitude: " + msg.positioninWGS84Coordinates.longitude;

  if (msg.highResPositioninWGS84Coordinates)
    csv[10] =
      "Latitude: " + msg.highResPositioninWGS84Coordinates.latitude + " Longitude: " + msg.highResPositioninWGS84Coordinates.longitude;

  if (msg.messageAmplitude) csv[42] = msg.messageAmplitude.messageAmplitude;

  if (msg.geometricHeight) csv[13] = msg.geometricHeight.geometricHeight;

  if (msg.flightLevel) csv[11] = msg.flightLevel.fligthLevel;

  if (msg.selectedAltitude)
    csv[44] =
      "SAS: " +
      msg.selectedAltitude.sas +
      " Source: " +
      msg.selectedAltitude.source +
      " Altitude: " +
      msg.selectedAltitude.altitude;

  if (msg.finalStateSelectedAltitude)
    csv[45] =
      "MV: " +
      msg.finalStateSelectedAltitude.mv +
      " AH: " +
      msg.finalStateSelectedAltitude.ah +
      " AM: " +
      msg.finalStateSelectedAltitude.am +
      " Altitude: " +
      msg.finalStateSelectedAltitude.altitude;

  if (msg.airSpeed) csv[46] = msg.airSpeed.value.toString();

  if (msg.trueAirSpeed) csv[47] = msg.trueAirSpeed.value;

  if (msg.magneticHeading) csv[48] = msg.magneticHeading.value;

  if (msg.barometricVerticalRate) csv[49] = msg.barometricVerticalRate.value;

  if (msg.geometricVerticalRate) csv[50] = msg.geometricVerticalRate.value;

  if (msg.ariborneGroundVector)
    csv[51] =
      "GroundSpeed: " +
      msg.ariborneGroundVector.ground_speed +
      " TrackAngle: " +
      msg.ariborneGroundVector.track_angle;

  if (msg.trackNumber) csv[15] = msg.trackNumber.value.toString();

  if (msg.trackAngleRate) csv[52] = msg.trackAngleRate.tar.toString();

  if (msg.targetIdentification) csv[19] = msg.targetIdentification.data.toString();

  if (msg.targetStatus)
    csv[53] =
      "ICF: " +
      msg.targetStatus.icf +
      " LNAV: " +
      msg.targetStatus.lnav +
      " PS: " +
      msg.targetStatus.ps +
      " SS: " +
      msg.targetStatus.ss;

  if (msg.mopsVersion)
    csv[54] = "VNS: " + msg.mopsVersion.vns + " VN: " + msg.mopsVersion.vn + " LTT: " + msg.mopsVersion.ltt;

  if (msg.metInformation)
    csv[55] =
      "WS: " +
      msg.metInformation.ws +
      " WD: " +
      msg.metInformation.wd +
      " TMP: " +
      msg.metInformation.tmp +
      " TRB: " +
      msg.metInformation.trb;

  if (msg.rollAngle) csv[56] = msg.rollAngle.value;

  if (msg.modeSMBData) csv[20] = msg.modeSMBData.data;

  if (msg.acasResolutionAdvisoryReport) {
    csv[57] =
      "TYP: " +
      msg.acasResolutionAdvisoryReport.typ +
      " STYP: " +
      msg.acasResolutionAdvisoryReport.styp +
      " ARA: " +
      msg.acasResolutionAdvisoryReport.ara +
      " RAC: " +
      msg.acasResolutionAdvisoryReport.rac +
      " RAT: " +
      msg.acasResolutionAdvisoryReport.rat +
      " MTE: " +
      msg.acasResolutionAdvisoryReport.mte +
      " TTI: " +
      msg.acasResolutionAdvisoryReport.tti +
      " TID: " +
      msg.acasResolutionAdvisoryReport.tid;
  }

  if (msg.surfaCapabilitiesandCharacteristics) {
    if (msg.surfaCapabilitiesandCharacteristics.LW) {
      csv[58] =
        "POA: " +
        msg.surfaCapabilitiesandCharacteristics.poa +
        " CDTI: " +
        msg.surfaCapabilitiesandCharacteristics.cdtis +
        " B2low: " +
        msg.surfaCapabilitiesandCharacteristics.b2_low +
        " RAS: " +
        msg.surfaCapabilitiesandCharacteristics.ras +
        " IDENT: " +
        msg.surfaCapabilitiesandCharacteristics.ident +
        " LW: " +
        msg.surfaCapabilitiesandCharacteristics.LW;
    } else {
      csv[58] =
        "POA: " +
        msg.surfaCapabilitiesandCharacteristics.poa +
        " CDTI: " +
        msg.surfaCapabilitiesandCharacteristics.cdtis +
        " B2low: " +
        msg.surfaCapabilitiesandCharacteristics.b2_low +
        " RAS: " +
        msg.surfaCapabilitiesandCharacteristics.ras +
        " IDENT: " +
        msg.surfaCapabilitiesandCharacteristics.ident;
    }
  }

  if (msg.receiverID) csv[59] = msg.receiverID.id.substring(2);

  return csv;
}