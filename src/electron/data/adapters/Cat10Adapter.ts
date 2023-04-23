import { Cat10 } from "../../cat10/Cat10";
import { AsyncScheduler } from "../../utils/AsyncScheduler";
import { Operator } from "../../utils/Operator";


export async function adapt(message : Buffer, id : number) : Promise<Cat10>{

    message = Buffer.from(message);
    let operator : Operator = new Operator();
    let schduler : AsyncScheduler = new AsyncScheduler();
    let cat10 : Cat10;
    cat10 = new Cat10(id);
    const fspec = BigInt("0x" + message.subarray(3, 7).toString("hex"))
        .toString(2)
        .padStart(4 * 8, "0")
        .split("");

    let count = 7;
    let found = false;
    let offset = fspec.filter((value, index) => {
        if (index == count && !found) {
            if (value != "1") {
                found = true;
            } else {
                count += 8;
            }
            return true;
        }
        return;
        }).length + 3;


    var dataSourceIdentifier = message.subarray(offset, offset + 2)
    schduler.addOperation(cat10.setDataSourceIdentifier(dataSourceIdentifier));
    offset += 2;
    
    var messageType = message.subarray(offset, offset + 1)
    schduler.addOperation(cat10.setMessageType(messageType));
    offset += 1;

    if (messageType[0] != 0x001){
        var timeOfDay = message.subarray(offset, offset + 3);
        schduler.addOperation(cat10.setTimeOfDay(timeOfDay));
        if (offset === 9) {
            var systemStatus = message.subarray(offset + 3, offset + 4);
            schduler.addOperation(cat10.setsystemStatus(systemStatus));
        }
    }
    else{
        let variableOffset = operator.getVariableItemOffset(message.subarray(offset, offset + 3), 3)
        var targetReportDescriptor = message.subarray(offset, offset + variableOffset);
        schduler.addOperation(cat10.setTargetReportDescriptor(targetReportDescriptor));
        offset += variableOffset;

        var timeDay = message.subarray(offset, offset + 3);
        schduler.addOperation(cat10.setTimeOfDay(timeDay));
        offset += 3;

        if (fspec[4] === "1") {
            var positionWgs84Coordinates = message.subarray(offset, offset + 8);
            schduler.addOperation(cat10.setPositionWG84Coordinates(positionWgs84Coordinates));
            offset += 8;
        }
        if (fspec[5] === "1") {
            var measuredPositionPolarCoordinates = message.subarray(offset, offset + 4);
            schduler.addOperation(cat10.setMeasuredPositionPolarCoordinates(measuredPositionPolarCoordinates));
            offset += 4;
        }
        if (fspec[6] === "1") {
            var positionCartesianCoordinates = message.subarray(offset, offset + 4);
            schduler.addOperation(cat10.setPositionCartesianCoordinates(positionCartesianCoordinates));
            offset += 4;
        }
        if (fspec[7] === "1") {
            if (fspec[8] === "1") {
                var calculatedTrackVelocityPolarCoordinates = message.subarray(offset, offset + 4);
                schduler.addOperation(cat10.setCalculatedTrackVelocityPolarCoordinates(calculatedTrackVelocityPolarCoordinates));
                offset += 4;
            }
            if (fspec[9] === "1") {
                var calculatedTrackVelocityCartesianCoordinates = message.subarray(offset, offset + 4);
                schduler.addOperation(cat10.setCalculatedTrackVelocityCartesianCoordinates(calculatedTrackVelocityCartesianCoordinates));
                offset += 4;
            }
            if (fspec[10] === "1") {
                var trackNumber = message.subarray(offset, offset + 2);
                schduler.addOperation(cat10.setTrackNumber(trackNumber));
                offset += 2;
            }
            if (fspec[11] === "1") {
                let variableOffset = operator.getVariableItemOffset(message.subarray(offset, offset + 3), 3);
                var trackStatus = message.subarray(offset, offset + variableOffset);
                schduler.addOperation(cat10.setTrackStatus(trackStatus));
                offset += variableOffset;
              }
            if (fspec[12] === "1") {
                var mode3ACodeOctalRepresentation = message.subarray(offset, offset + 2);
                schduler.addOperation(cat10.setMode3ACodeOctalRepresentation(mode3ACodeOctalRepresentation));
                offset += 2;
            }
            if (fspec[13] === "1") {
                var targetAddress = message.subarray(offset, offset + 3);
                schduler.addOperation(cat10.setTargetAddress(targetAddress));
                offset += 3; 
            }
            if (fspec[14] === "1") {
                var targetIdentification = message.subarray(offset, offset + 7);
                schduler.addOperation(cat10.setTargetIdentification(targetIdentification));
                offset += 7;
            }
            if (fspec[15] === "1") {
                if (fspec[16] === "1") {
                    const length = parseInt("0x" + message.subarray(offset, offset + 1).toString("hex"));
                    var modeSMBDData = message.subarray(offset, offset + 1 + 8 * length)
                    schduler.addOperation(cat10.setModeSMBData(modeSMBDData, length));
                    offset += 1 + 8 * length;
                  }
                if (fspec[17] === "1") {
                    var vehicleFleetIdentification = message.subarray(offset, offset + 1);
                    schduler.addOperation(cat10.setVehicleFleetIdentification(vehicleFleetIdentification));

                    offset += 1;
                }
                if (fspec[18] === "1") {
                    var flightLevelBinary = message.subarray(offset, offset + 2);
                    schduler.addOperation(cat10.setFlightLevelBinary(flightLevelBinary));
                    offset += 2;
                }
                if (fspec[19] === "1") {
                    var measuredHeight = message.subarray(offset, offset + 2);
                    schduler.addOperation(cat10.setMeasuredHeight(measuredHeight));
                    offset += 2;
                  }
                if (fspec[20] === "1") {
                    let variableOffset = operator.getVariableItemOffset(message.subarray(offset, offset + 3), 3);
                    var targetSizeAndOrientation = message.subarray(offset, offset + variableOffset);
                    schduler.addOperation(cat10.setTargetSizeAndOrientation(targetSizeAndOrientation));
                    offset += variableOffset; 
                }
                if (fspec[22] === "1") {
                    var preProgrammedMessage = message.subarray(offset, offset + 1)
                    schduler.addOperation(cat10.setPreProgrammedMessage(preProgrammedMessage));
                    offset += 1;
                }
                if (fspec[23] === "1") {
                    if (fspec[24] === "1") {
                        var standardDeviationOfPosition = message.subarray(offset, offset + 4);
                        schduler.addOperation(cat10.setStandardDeviationOfPosition(standardDeviationOfPosition));
                        offset += 4;
                    }
                    if (fspec[25] === "1") {
                        const len = parseInt("0x" + message.subarray(offset, offset + 1).toString("hex"));
                        var presence = message.subarray(offset + 1, offset + 1 + 2 * len);
                        schduler.addOperation(cat10.setPresence(presence, len));
                        offset += 1 + 2 * len;
                    }
                    if (fspec[26] === "1") {
                        var amplitudeOfPrimaryPlot = message.subarray(offset, offset + 1);
                        schduler.addOperation(cat10.setAmplitudeOfPrimaryPlot(amplitudeOfPrimaryPlot));
                        offset += 1;
                    }
                    if (fspec[27] === "1") {
                        var calculatedAcceleration = message.subarray(offset, offset + 2);
                        schduler.addOperation(cat10.setCalculatedAcceleration(calculatedAcceleration));
                    }
                }
            }


        }
    }
    await schduler.execute();
    return cat10;
}


export class Cat10Adapter {

}