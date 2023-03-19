import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { FlightLevelBinary } from "../../../../electron/cat10/valueObjects/FlightLevelBinary";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";


test('givenValidBinaryData_WhenDecodeFlightLevelBinary_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();
    var expectedV : string = "Code validated";
    var expectedG : string = "Default";
    var expectedFlightLevel : string = "NaNFL";


    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr_mlat_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var flightLevelBinary : FlightLevelBinary = (await cat10Adapter.adapt(messageCategoriesList[2])).flightLevelBinary;
   
    //Then
    expect(flightLevelBinary).not.toBe(null);
    expect(flightLevelBinary.v).toBe(expectedV);
    expect(flightLevelBinary.g).toBe(expectedG);
    expect(flightLevelBinary.flightLevel).toBe(expectedFlightLevel);
    
})