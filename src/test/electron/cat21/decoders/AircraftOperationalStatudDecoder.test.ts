import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { AircraftOperationalStatusDecoder } from "../../../../electron/cat21/decoders/AircraftOperationalStatusDecoder";
import { AircraftOperationalStatus } from "../../../../electron/cat21/valueObjects/AircraftOperationalStatus";
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";

test('givenValidBinaryData_WhenDecodeAircraftOPerationalStatus_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var aircraftOperationalStatusDecoder : AircraftOperationalStatusDecoder = new AircraftOperationalStatusDecoder();
    var cat21Adapter : Cat21Adapter = new Cat21Adapter();

    // When
    var data : Buffer = await fileManager.readFile('/Users/marca/Documents/5B/Projectes en Gestió del Trànsit Aeri/FitxersProva/201002-lebl-080001_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var listItems = await cat21Adapter.adapt(messageCategoriesList[0]);
    var aircraftOperationalStatus : AircraftOperationalStatus = await aircraftOperationalStatusDecoder.decode(listItems[0]);

    // Then
    expect(aircraftOperationalStatus).not.toBe(null);
    console.log("Aircraft operational status: " + aircraftOperationalStatus.ra + " " + aircraftOperationalStatus.tc + " " + aircraftOperationalStatus.ts + " " + aircraftOperationalStatus.arv + " " + aircraftOperationalStatus.cdti + " " + aircraftOperationalStatus.tcas + " " + aircraftOperationalStatus.sa);
})