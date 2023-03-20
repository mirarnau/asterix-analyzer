import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { HighResolutionPositioninWGS84Coordinates } from '../../../../electron/cat21/valueObjects/HighResolutionPositioninWGS84Coordinates';
import { HighResolutionPositioninWGS84CoordinatesDecoder } from '../../../../electron/cat21/decoders/HighResolutionPositioninWGS84CoordinatesDecoder';
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";

test('givenValidBinaryData_WhenDecodeHighResWGS84_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var highResolutionPositioninWGS84CoordinatesDecoder : HighResolutionPositioninWGS84CoordinatesDecoder = new HighResolutionPositioninWGS84CoordinatesDecoder();
    var cat21Adapter : Cat21Adapter = new Cat21Adapter();
    var expectedLatitude : number = 39.585708640515804;
    var expectedLongitude : number = 1.8449269607663155;

    // When
    //var data : Buffer = await fileManager.readFile('/Users/arnaumirhurtado/Documents/GitHub/asterix-analyzer/SAMPLE_FILES/201002-lebl-080001_smr.ast');
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var highResolutionPositioninWGS84Coordinates : HighResolutionPositioninWGS84Coordinates = (await (cat21Adapter.adapt(messageCategoriesList[0]))).highResPositioninWGS84Coordinates;

    //Then    
    console.log("Latitude: " + highResolutionPositioninWGS84Coordinates.latitude);
    console.log("Longitude: " + highResolutionPositioninWGS84Coordinates.longitude);
    expect(highResolutionPositioninWGS84Coordinates.latitude).not.toBe(null);
    expect(highResolutionPositioninWGS84Coordinates.longitude).not.toBe(null);
    expect(highResolutionPositioninWGS84Coordinates.latitude).toBe(expectedLatitude);
    expect(highResolutionPositioninWGS84Coordinates.longitude).toBe(expectedLongitude);

})