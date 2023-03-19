import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { MessageTypeDecoder } from "../../../../electron/cat10/decoders/MessageTypeDecoder";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";
import { MessageType } from '../../../../electron/cat10/valueObjects/MessageType';


test('givenValidBinaryData_WhenDecodeMessageType_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var messageTypeDecoder : MessageTypeDecoder = new MessageTypeDecoder();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var messageType : MessageType = (await cat10Adapter.adapt(messageCategoriesList[0])).messageType;
   
    //Then
    expect(messageType).not.toBe(null);
    console.log("Message Type: " + messageType.messageType);

})