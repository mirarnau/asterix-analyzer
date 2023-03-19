import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { TrackNumberDecoder } from "../../../../electron/cat10/decoders/TrackNumberDecoder";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";
import { TrackNumber } from '../../../../electron/cat10/valueObjects/TrackNumber';


test('givenValidBinaryData_WhenDecodeMeasuredPositionPolarCoordinates_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var trackNumberDecoder : TrackNumberDecoder = new TrackNumberDecoder();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messagesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var listItems = await cat10Adapter.adapt(messagesList[0]);
    var trackNumber : TrackNumber = await trackNumberDecoder.decode(listItems[1]);
   
    //Then
    expect(trackNumber).not.toBe(null);
    console.log(trackNumber.value);

})