import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";
import { TimeOfDay } from '../../../../electron/cat10/valueObjects/TimeOfDay';


test('givenValidBinaryData_WhenDecodeTimeOfDay_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();
    var expectedTimestamp : number = 28801.734375;

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr_mlat_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var timeOfDay : TimeOfDay = (await cat10Adapter.adapt(messageList[1])).timeOfDay;
   
    //Then
    expect(timeOfDay).not.toBe(null);
    expect(timeOfDay.timestamp).toBe(expectedTimestamp);

})