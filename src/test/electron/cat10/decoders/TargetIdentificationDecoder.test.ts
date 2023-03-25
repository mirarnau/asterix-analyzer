import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";
import { TargetIdentification } from '../../../../electron/cat10/valueObjects/TargetIdentification';


test('givenValidBinaryData_WhenDecodeTargetIdentification_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();
    var expectedTsi : string = "Callsign or registration downlinked from transponder";
    var expectedData : string = "RYR6CE  ";

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr_mlat_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var targetIdentification : TargetIdentification = (await cat10Adapter.adapt(messageList[2])).targetIdentification;
   
    //Then
    expect(targetIdentification).not.toBe(null);
    expect(targetIdentification.sti).toBe(expectedTsi);
    expect(targetIdentification.data).toBe(expectedData);


})