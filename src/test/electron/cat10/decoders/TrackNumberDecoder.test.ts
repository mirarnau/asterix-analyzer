import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { TrackNumber } from "../../../../electron/cat10/valueObjects/TrackNumber";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";


test('givenValidBinaryData_WhenDecodeTrackNumber_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();
    var expectedValue : number = 1540;


    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr_mlat_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var trackNumber : TrackNumber = (await cat10Adapter.adapt(messageCategoriesList[2])).trackNumber;
   
    //Then
    expect(trackNumber).not.toBe(null);
    expect(trackNumber.value).toBe(expectedValue);
    
})