import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { TrackNumberDecoder } from '../../../../electron/cat21/decoders/TrackNumberDecoder';
import { TrackNumber } from '../../../../electron/cat21/valueObjects/TrackNumber';
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";

test('givenValidBinaryData_WhenDecodeTrackNumber_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat21Adapter : Cat21Adapter = new Cat21Adapter();
    var expectedTrack : number = 3230;

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var trackNumber : TrackNumber = (await (cat21Adapter.adapt(messageCategoriesList[0]))).trackNumber;

    //Then    
    console.log("Track number: " + trackNumber.value);
    expect(trackNumber).not.toBe(null);
    expect(trackNumber.value).toBe(expectedTrack);

})