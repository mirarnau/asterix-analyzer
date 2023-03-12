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
    //var data : Buffer = await fileManager.readFile('/Users/arnaumirhurtado/Documents/GitHub/asterix-analyzer/SAMPLE_FILES/201002-lebl-080001_smr.ast');
    var data : Buffer = await fileManager.readFile('/Users/marca/Documents/5B/Projectes en Gestió del Trànsit Aeri/FitxersProva/201002-lebl-080001_smr.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var listItems = await cat10Adapter.adapt(messageCategoriesList[0]);
    var messageType : MessageType = await messageTypeDecoder.decode(listItems[1]);
   
    //Then
    expect(messageType).not.toBe(null);
    console.log("Message Type: " + messageType.messageType);

})