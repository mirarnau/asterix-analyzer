// import { time } from "node:console";
import { Cat10 } from "../cat10/Cat10";
import { CalculatedAcceleration } from "../cat10/valueObjects/CalculatedAcceleration";
import { CalculatedTrackVelocityCartesianCoordinates } from "../cat10/valueObjects/CalculatedTrackVelocityCartesianCoordinates";
import { CalculatedTrackVelocityPolarCoordinates } from "../cat10/valueObjects/CalculatedTrackVelocityPolarCoordinates";
import { MeasuredPositionPolarCoordinates } from "../cat10/valueObjects/MeasuredPositionPolarCoordinates";
import { PositionCartesianCoordinates } from "../cat10/valueObjects/PositionCartesianCoordinates";
import { PositionWG84Coordinates } from "../cat10/valueObjects/PositionWGS84Coordinates";
// import { TargetAddress } from "../cat10/valueObjects/TargetAddress";
import { TargetReportDescriptor } from "../cat10/valueObjects/TargetReportDescriptor";
import { TargetSizeAndOrientation } from "../cat10/valueObjects/TargetSizeAndOrientation";
import { TimeOfDay } from "../cat10/valueObjects/TimeOfDay";
import { TrackNumber } from "../cat10/valueObjects/TrackNumber";
import { TrackStatus } from "../cat10/valueObjects/TrackStatus";
import { Cat21 } from "../cat21/Cat21";
// import { GeometricHeight } from "../cat21/valueObjects/GeometricHeight";
// import { PositioninWGS84Coordinates } from "../cat21/valueObjects/PositioninWGS84Coordinates";
// import { QualityIndicators } from "../cat21/valueObjects/QualityIndicators";
// import { TimeofMessageReceptionofVelocity } from "../cat21/valueObjects/TimeofMessageReceptionofVelocity";

export function writeCat10Test(value : Cat10) {
    const targetReportDescriptor : TargetReportDescriptor = getCat10TargetReport(value.targetReportDescriptor);
    const measuredPositionPolarCoordinates = getPolarCoordinates(value.measuredPositionPolarCoordinates);
    const positionWGS84Coordinates = getWG84Coordinates(value.positionWG84Coordinates);
    const positionCartesianCoordinates = getCartesianCoordinates(value.positionCartesianCoordinates);
    const timeofDay = getTimeofDay(value.timeOfDay);
    const trackNumber = getTrackNumber(value.trackNumber);
    const trackStatus = getTrackStatus(value.trackStatus);
    const velPolar = getVelocityPolar(value.calculatedTrackVelocityPolarCoordinates);
    const velCart = getVelocityCart(value.calculatedTrackVelocityCartesianCoordinates);
    const acceleration = getAcceleration(value.calculatedAcceleration);
    const targetSizeAndOrientation = getTargetSize(value.targetSizeAndOrientation);

    let res = [value.id, value.class, value.messageType.messageType, value.dataSourceIdentifier.sic, value.dataSourceIdentifier.sac,
        targetReportDescriptor.typ, targetReportDescriptor.dcr, targetReportDescriptor.chn, targetReportDescriptor.gbs, targetReportDescriptor.crt
        , measuredPositionPolarCoordinates[0], measuredPositionPolarCoordinates[1], positionWGS84Coordinates[0], positionWGS84Coordinates[1],
        positionCartesianCoordinates[0], positionCartesianCoordinates[1], timeofDay, trackNumber, trackStatus.cnf, trackStatus.tre, trackStatus.cst,
        trackStatus.mah, trackStatus.tcc, trackStatus.sth, velPolar[0], velPolar[1], velCart[0], velCart[1], acceleration[0], acceleration[1], targetSizeAndOrientation,
        ];
    return res;
}

function getCat10TargetReport(tar : TargetReportDescriptor) {
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

function getWG84Coordinates(coordinates : PositionWG84Coordinates) {
    let lat;
    let lon;
    try {
        lat = coordinates.latitude;
        lon = coordinates.longitude;
    }   catch{ lat = "No data"
                lon = "No data"};
    return[lat, lon];
}

function getPolarCoordinates(coordinates : MeasuredPositionPolarCoordinates) {
    let rho;
    let theta;
    try {
        rho = coordinates.rho;
        theta = coordinates.theta;
    }   catch{ rho = "No data"
                theta = "No data"};
    return [rho, theta];
}

function getCartesianCoordinates(coordinates : PositionCartesianCoordinates) {
    let x;
    let y;
    try {
        x = coordinates.x;
        y = coordinates.y;
    }   catch{ x = "No data"
                y = "No data"};
    return [x, y];
}

function getTimeofDay(time : TimeOfDay){
    let timeofDay;
    try {
        timeofDay = time.timestamp;
    }   catch{ timeofDay = "No data"};
    return timeofDay;
}

function getTrackNumber(track : TrackNumber){
    let trackn;
    try {
        trackn = track.value;
    }   catch{ trackn = "No data"};
    return trackn;
}

function getTrackStatus(status : TrackStatus){
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

function getVelocityPolar(vel : CalculatedTrackVelocityPolarCoordinates){
    let rho;
    let theta;
    try {
        rho = vel.rho;
        theta = vel.theta;
    }   catch { rho = theta = "No data"};
    return [rho, theta];
}

function getVelocityCart(vel : CalculatedTrackVelocityCartesianCoordinates){
    let x;
    let y;
    try {
        x = vel.x;
        y = vel.y;
    }   catch { x = y = "No data"};
    return [x, y];
}

function getAcceleration(acc : CalculatedAcceleration){
    let ax;
    let ay;
    try {
        ax = acc.ax;
        ay = acc.ay;
    }   catch{  ax = ay = "No data"};
    return [ax, ay];
}

function getTargetSize(data : TargetSizeAndOrientation){
    let size;
    try {
        size = data.length;
    }   catch{  size = "No data"};
    return size;
}

    
    

    // let mode3A;
    // try {
    //     mode3A = value.mode3A.code;
    // }   catch {mode3A = "No data"};

    // let flightLevel;
    // try {
    //     flightLevel = value.flightLevel.fligthLevel;
    // }   catch {flightLevel = "No data"};
    
    // let targetStatusIcf;
    // let targetStatusLnav;
    // let targetStatusPs;
    // let targetStatusSs;
    // try {
    //     targetStatusIcf = value.targetStatus.icf;
    //     targetStatusLnav = value.targetStatus.lnav;
    //     targetStatusPs = value.targetStatus.ps;
    //     targetStatusSs = value.targetStatus.ss;
    // } catch {targetStatusIcf = targetStatusLnav = targetStatusPs = targetStatusSs = "No data"};

    // let barometricVerticalRate;
    // try {
    //     barometricVerticalRate = value.barometricVerticalRate.value;
    // }   catch{barometricVerticalRate = "No data"};

    // let ariborneGroundVectorGs;
    // let ariborneGroundVectorTa;
    // try {
    //     ariborneGroundVectorGs = value.ariborneGroundVector.ground_speed;
    //     ariborneGroundVectorTa = value.ariborneGroundVector.track_angle;
    // }   catch {ariborneGroundVectorGs = ariborneGroundVectorTa = "No data"};

    // let timeofReportTransmission;
    // try{
    //     timeofReportTransmission = value.timeofReportTransmission.time;
    // }   catch {timeofReportTransmission = "No data"};

    // let targetIdentification;
    // try {
    //     targetIdentification = value.targetIdentification.data.join("");

    // }   catch{targetIdentification = "No data"};

    // let selectedAltitude;
    // try{
    //     selectedAltitude = value.selectedAltitude.altitude;
    // }   catch {selectedAltitude = "No data"};

    // let aircraftOperationalStatusRa;
    // let aircraftOperationalStatusTc;
    // let aircraftOperationalStatusTs;
    // let aircraftOperationalStatusArv;
    // let aircraftOperationalStatusCdti;
    // let aircraftOperationalStatusTcas;
    // let aircraftOperationalStatusSa;
    // try{
    //     aircraftOperationalStatusRa = value.aircraftOperationalStatus.ra;
    //     aircraftOperationalStatusTc = value.aircraftOperationalStatus.tc;
    //     aircraftOperationalStatusTs = value.aircraftOperationalStatus.ts;
    //     aircraftOperationalStatusArv = value.aircraftOperationalStatus.arv;
    //     aircraftOperationalStatusCdti = value.aircraftOperationalStatus.cdti;
    //     aircraftOperationalStatusTcas = value.aircraftOperationalStatus.tcas;
    //     aircraftOperationalStatusSa = value.aircraftOperationalStatus.sa;
    // }   catch {aircraftOperationalStatusRa = aircraftOperationalStatusTc = aircraftOperationalStatusTs = aircraftOperationalStatusArv = aircraftOperationalStatusCdti = aircraftOperationalStatusTcas = aircraftOperationalStatusSa = "No data"};

    // let emitterCategory;
    // try {
    //     emitterCategory = value.emitterCategory.ecat;
    // } catch {emitterCategory = "No data"};

    // let dataAgesAos;
    // let dataAgesTrd;
    // let dataAgesM3a;
    // let dataAgesQi;
    // try{
    //     dataAgesAos = value.dataAges.aos + 's';
    //     dataAgesTrd = value.dataAges.trd + 's';
    //     dataAgesM3a = value.dataAges.m3a + 's';
    //     dataAgesQi = value.dataAges.qi + 's';
    // }   catch { dataAgesAos = dataAgesTrd = dataAgesM3a = dataAgesQi = "No data"};
        
export function writeCat21(value : Cat21) {
    // const positioninWG84Coordinates = getPositioninWGSCoordinates21(value.positioninWGS84Coordinates);
    // const targetAddress = getTargetAddress21(value.targetAddress);
    // const time = getTimeReceptionVelocity(value.timeofMessageReceptionofVelocity);
    // const geo = getGeometricHeight(value.geometricHeight);
    // const qInd = getQualityIndicators(value.qualityIndicators);
    //let res =[];
    let res = [];
    res = Array(33).fill(" ");
    res[0] = value.id.toString();
    res[1] = value.class;
    if(value.dataSourceIdentifier){
        res[2] = value.dataSourceIdentifier.sic;
        res[3] = value.dataSourceIdentifier.sac;
    }
    if(value.targetReportDescriptor){
        if(value.targetReportDescriptor.rcf){
            res[4] = value.targetReportDescriptor.atp;
            res[5] = value.targetReportDescriptor.arc;
            res[6] = value.targetReportDescriptor.rc;
            res[7] = value.targetReportDescriptor.rab;
            res[8] = value.targetReportDescriptor.dcr;
            res[9] = value.targetReportDescriptor.gbs;
            res[10] = value.targetReportDescriptor.sim;
            res[11] = value.targetReportDescriptor.tst;
            res[12] = value.targetReportDescriptor.saa;
            res[13] = value.targetReportDescriptor.cl;
            res[14] = value.targetReportDescriptor.ipc;
            res[15] = value.targetReportDescriptor.nogo;
            res[16] = value.targetReportDescriptor.cpr;
            res[17] = value.targetReportDescriptor.ldpj;
            res[18] = value.targetReportDescriptor.rcf;
        } else if(value.targetReportDescriptor.saa){
            res[4] = value.targetReportDescriptor.atp;
            res[5] = value.targetReportDescriptor.arc;
            res[6] = value.targetReportDescriptor.rc;
            res[7] = value.targetReportDescriptor.rab;
            res[8] = value.targetReportDescriptor.dcr;
            res[9] = value.targetReportDescriptor.gbs;
            res[10] = value.targetReportDescriptor.sim;
            res[11] = value.targetReportDescriptor.tst;
            res[12] = value.targetReportDescriptor.saa;
            res[13] = value.targetReportDescriptor.cl;
            res[14] = "-";
            res[15] = "-";
            res[16] = "-";
            res[17] = "-";
            res[18] = "-";
            }
        else{
            res[4] = value.targetReportDescriptor.atp;
            res[5] = value.targetReportDescriptor.arc;
            res[6] = value.targetReportDescriptor.rc;
            res[7] = value.targetReportDescriptor.rab;
            res[8] = "-";
            res[9] = "-";
            res[10] = "-";
            res[11] = "-";
            res[12] = "-";
            res[13] = "-";
            res[14] = "-";
            res[15] = "-";
            res[16] = "-";
            res[17] = "-";
            res[18] = "-";
        }
    }
    res[19] = value.trackNumber?.value ?? "-";
    
    if(value.trackNumber){res[19] = value.trackNumber.value.toString()};
    if(value.positioninWGS84Coordinates){
        res[20] = value.positioninWGS84Coordinates.latitude.toString();
        res[21] = value.positioninWGS84Coordinates.longitude.toString();
    } else{
        res[20] = res[21] = "-";
    }
    res[22] = value.targetAddress?.value ?? "-";
    res[23] = value.timeofApplicabilityforPosition?.time.toString() ?? "-";
    res[24] = value.geometricHeight?.geometricHeight ?? "-";

    if(value.qualityIndicators){
        if(value.qualityIndicators.pic){
            res[25] = value.qualityIndicators.nucr_or_nacv;
            res[26] = value.qualityIndicators.nucp_or_nic;
            res[27] = value.qualityIndicators.nicbaro;
            res[28] = value.qualityIndicators.sil;
            res[29] = value.qualityIndicators.nacp;
            res[30] = value.qualityIndicators.second_sil;
            res[31] = value.qualityIndicators.gva;
            res[32] = value.qualityIndicators.pic;
        } else if(value.qualityIndicators.gva){
            res[25] = value.qualityIndicators.nucr_or_nacv;
            res[26] = value.qualityIndicators.nucp_or_nic;
            res[27] = value.qualityIndicators.nicbaro;
            res[28] = value.qualityIndicators.sil;
            res[29] = value.qualityIndicators.nacp;
            res[30] = value.qualityIndicators.second_sil;
            res[31] = value.qualityIndicators.gva;
            res[32] = "-";
        } else if(value.qualityIndicators.sil){
            res[25] = value.qualityIndicators.nucr_or_nacv;
            res[26] = value.qualityIndicators.nucp_or_nic;
            res[27] = value.qualityIndicators.nicbaro;
            res[28] = value.qualityIndicators.sil;
            res[29] = value.qualityIndicators.nacp;
            res[30] = "-";
            res[31] = "-";
            res[32] = "-";
        } else{
            res[25] = value.qualityIndicators.nucr_or_nacv;
            res[26] = value.qualityIndicators.nucp_or_nic;
            res[27] = "-";
            res[28] = "-";
            res[29] = "-";
            res[30] = "-";
            res[31] = "-";
            res[32] = "-";
        }
    }



    // let res = [value.id, value.class, value.dataSourceIdentifier.sac, value.dataSourceIdentifier.sic, value.targetReportDescriptor.atp, value.targetReportDescriptor.arc, value.targetReportDescriptor.rc,
    // value.targetReportDescriptor.rab, value.targetReportDescriptor.dcr, value.targetReportDescriptor.gbs, value.targetReportDescriptor.sim, value.targetReportDescriptor.tst, value.targetReportDescriptor.saa,
    // value.targetReportDescriptor.cl, value.targetReportDescriptor.ipc, value.targetReportDescriptor.nogo, value.targetReportDescriptor.cpr, value.targetReportDescriptor.ldpj, value.targetReportDescriptor.rcf,
    // value.trackNumber.value, positioninWG84Coordinates[0], positioninWG84Coordinates[1], targetAddress.value, time, geo.geometricHeight, qInd.nucr_or_nacv, qInd.nucp_or_nic, qInd.nicbaro, qInd.sil,
    // qInd.nacp, qInd.second_sil, qInd.sda, qInd.gva, qInd.pic];
    return res;
}
 
// function getPositioninWGSCoordinates21(value: PositioninWGS84Coordinates) {

//     let latitude;
//     let longitude;
//     try {
//         latitude = value.latitude;
//         longitude = value.longitude;
//     }   catch {latitude = longitude = "No data"};
//     return [latitude, longitude];
// }

// function getTargetAddress21(value: TargetAddress){
//     let targetAddress;
//     try {
//         targetAddress = value.value;
//     }   catch {targetAddress = "No data"};
//     return new TargetAddress(targetAddress);
// }

// function getTimeReceptionVelocity(value: TimeofMessageReceptionofVelocity){
//     let time;
//     try {
//         time = value.time;
//     } catch {time = "No data"};
//     return time;
// }

// function getGeometricHeight(value: GeometricHeight){
//     let geo;
//     try{
//         geo = value.geometricHeight;
//     } catch{ geo = "No Data"};
//     return new GeometricHeight(geo);
// }

// function getQualityIndicators(value: QualityIndicators){
//     let nucr_or_nacv;
//     let nucp_or_nic;
//     let nicbaro;
//     let sil;
//     let nacp;
//     let second_sil;
//     let sda;
//     let gva;
//     let pic;
//     try {
//         nucr_or_nacv = value.nucr_or_nacv;
//     }   catch {nucr_or_nacv = "No data"};
//     try {
//         nucp_or_nic = value.nucp_or_nic;
//     }   catch {nucp_or_nic = "No data"};
//     try {
//         nicbaro = value.nicbaro;
//     }   catch {nicbaro = "No data"};
//     try {
//         sil = value.sil;
//     }   catch {sil = "No data"};
//     try {
//         nacp = value.nacp;
//     }   catch {nacp = "No data"};
//     try {
//         second_sil = value.second_sil;
//     }   catch {second_sil = "No data"};
//     try {
//         sda = value.sda;
//     }   catch {sda = "No data"};
//     try {
//         gva = value.gva;
//     }   catch {gva = "No data"};
//     try {
//         pic = value.pic;
//     }   catch {pic = "No data"};
//     return new QualityIndicators(nucr_or_nacv, nucp_or_nic, nicbaro, sil, nacp, second_sil, sda, gva, pic);
// }
// //  value.mopsVersion.vn, mode3A, flightLevel,
// //     targetStatusIcf, targetStatusLnav, targetStatusPs, targetStatusSs, barometricVerticalRate, ariborneGroundVectorGs, ariborneGroundVectorTa, timeofReportTransmission, targetIdentification, emitterCategory,
// //     selectedAltitude, aircraftOperationalStatusRa, aircraftOperationalStatusTc, aircraftOperationalStatusTs, aircraftOperationalStatusArv, aircraftOperationalStatusCdti, aircraftOperationalStatusTcas, aircraftOperationalStatusSa,
// //     value.messageAmplitude.messageAmplitude, dataAgesAos, dataAgesTrd, dataAgesM3a, dataAgesQi