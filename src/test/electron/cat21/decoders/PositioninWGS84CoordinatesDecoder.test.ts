import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { PositioninWGS84Coordinates } from '../../../../electron/cat21/valueObjects/PositioninWGS84Coordinates';
import { PositioninWGS84CoordinatesDecoder } from '../../../../electron/cat21/decoders/PositioninWGS84CoordinatesDecoder';
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";

test('givenValidBinaryData_WhenDecodeWGS84_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat21Adapter : Cat21Adapter = new Cat21Adapter();
    var expectedLatitude : number = 39.58571434020996;
    var expectedLongitude : number = 1.844930648803711;

    // When
    //var data : Buffer = await fileManager.readFile('/Users/arnaumirhurtado/Documents/GitHub/asterix-analyzer/SAMPLE_FILES/201002-lebl-080001_smr.ast');
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var positioninWGS84Coordinates : PositioninWGS84Coordinates = (await (cat21Adapter.adapt(messageCategoriesList[0]))).positioninWGS84Coordinates;

    //Then    
    console.log("Latitude: " + positioninWGS84Coordinates.latitude);
    console.log("Longitude: " + positioninWGS84Coordinates.longitude);
    expect(positioninWGS84Coordinates.latitude).not.toBe(null);
    expect(positioninWGS84Coordinates.longitude).not.toBe(null);
    expect(positioninWGS84Coordinates.latitude).toBe(expectedLatitude);
    expect(positioninWGS84Coordinates.longitude).toBe(expectedLongitude);

})