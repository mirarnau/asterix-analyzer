import { workerData } from "node:worker_threads";
// import { createWriteStream } from "node:fs";
import { Cat21 } from "../cat21/Cat21";
import { createWriteStream } from "node:fs";

let mess: (Cat21)[] = workerData.takingOffMsg;
console.log(mess);
doStuff()
// let started = false;
// parentPort?.on("message", (data) => {
//   messages = messages.concat(data);

//   if (!started && workerData.messagesLength === messages.length) {
//     doStuff();
//     parentPort?.close();
//   }
// });

async function doStuff() {
    const fil = createWriteStream(workerData.filePath);

    fil.write(
        "Id, Time of Applicability for Postition, WGS84 coordinates, Flight level, Geometric Height, Target address, Target identification \n"
    );
    await mess.forEach((value) => {
          value = value as Cat21;
          fil.write('"' + writeTO(value).join('","') + '" \n');
      });
    
      fil.end();
      fil.close();
}
function writeTO(msg: Cat21) {
    let csv: string[];
    csv = Array(7).fill(" ");
    csv[0] = msg.id.toString();

    if (msg.timeofApplicabilityforPosition) csv[1] = new Date(msg.timeofApplicabilityforPosition.time * 1000).toISOString().substring(11, 23);
    
    if (msg.positioninWGS84Coordinates){
        csv[2] = "Latitude: " + msg.positioninWGS84Coordinates.latitude + " Longitude: " + msg.positioninWGS84Coordinates.longitude;
    }

    if (msg.flightLevel) csv[3] = msg.flightLevel.fligthLevel;

    if (msg.geometricHeight) csv[4] = msg.geometricHeight.geometricHeight;

    if (msg.targetAddress) csv[5] = msg.targetAddress.value.substring(2);

    if (msg.targetIdentification) csv[6] = msg.targetIdentification.data;

    return csv;
}

