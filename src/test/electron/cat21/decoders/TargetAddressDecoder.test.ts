import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { TargetAddress } from '../../../../electron/cat21/valueObjects/TargetAddress';
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";


test('givenValidBinaryData_WhenDecodeTargetAddress_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat21Adapter : Cat21Adapter = new Cat21Adapter();
    var expectedAddress : string = "405a47";

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var targetAddress : TargetAddress = (await (cat21Adapter.adapt(messageCategoriesList[0]))).targetAddress;
   
    //Then    
    
    console.log("Target Address " + targetAddress.value);
    expect(targetAddress.value).not.toBe(null);
    expect(targetAddress.value).toBe(expectedAddress);

})