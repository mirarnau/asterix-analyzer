import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { ServiceIdentificationDecoder } from "../../../../electron/cat21/decoders/ServiceIdentificationDecoder";
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";

test('givenValidBinaryData_WhenDecodeServiceIdentification_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var serviceIdentificationDecoder : ServiceIdentificationDecoder = new ServiceIdentificationDecoder();
    var cat21Adapter : Cat21Adapter = new Cat21Adapter();
    var expectedServiceIdentification : string = "1";

    // When
    //var data : Buffer = await fileManager.readFile('/Users/arnaumirhurtado/Documents/GitHub/asterix-analyzer/SAMPLE_FILES/201002-lebl-080001_smr.ast');
    var data : Buffer = await fileManager.readFile('/Users/marca/Documents/5B/Projectes en Gestió del Trànsit Aeri/FitxersProva/201002-lebl-080001_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var listItems = await cat21Adapter.adapt(messageCategoriesList[0]);
    var serviceIdentification = await serviceIdentificationDecoder.decode(listItems[3]);
   
    //Then        
    console.log(listItems);
    console.log(serviceIdentification);
    expect(serviceIdentification).not.toBe(null);
    expect(serviceIdentification).toBe(expectedServiceIdentification);

})

