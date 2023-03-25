import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";
import { CalculatedAcceleration } from '../../../../electron/cat10/valueObjects/CalculatedAcceleration';


test('givenValidBinaryData_WhenDecodeCalculatedAcceleration_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();
    var expectedAx : number = -1.75;
    var expectedAy : number = 0;

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr_mlat_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var calculatedAcceleration : CalculatedAcceleration = (await cat10Adapter.adapt(messageList[4])).calculatedAcceleration;
   
    //Then
    expect(calculatedAcceleration).not.toBe(null);
    expect(calculatedAcceleration.ax).toBe(expectedAx);
    expect(calculatedAcceleration.ay).toBe(expectedAy);

})