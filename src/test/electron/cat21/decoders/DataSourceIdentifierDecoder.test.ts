import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { DataSourceIdentifierDecoder } from "../../../../electron/cat21/decoders/DataSourceIdentifierDecoder";
import { DataSourceIdentifier } from "../../../../electron/cat21/valueObjects/DataSourceIdentifier";
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";


test('givenValidBinaryData_WhenDecodeDataSourceIdentifier_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var dataSourceIdentifierDecoder : DataSourceIdentifierDecoder = new DataSourceIdentifierDecoder();
    var cat10Adapter : Cat21Adapter = new Cat21Adapter();
    var expectedSac : string = "20";
    var expectedSic : string = "-37";

    // When
    //var data : Buffer = await fileManager.readFile('/Users/arnaumirhurtado/Documents/GitHub/asterix-analyzer/SAMPLE_FILES/201002-lebl-080001_smr.ast');
    var data : Buffer = await fileManager.readFile('/Users/marca/Documents/5B/Projectes en Gestió del Trànsit Aeri/FitxersProva/201002-lebl-080001_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var listItems = await cat10Adapter.adapt(messageCategoriesList[0]);
    var dataSourceIdentifier : DataSourceIdentifier = await dataSourceIdentifierDecoder.decode(listItems[0]);
   
    //Then
    expect(dataSourceIdentifier).not.toBe(null);
    expect(dataSourceIdentifier.sac).toBe(expectedSac);
    expect(dataSourceIdentifier.sic).toBe(expectedSic);
    console.log("SAC: " + dataSourceIdentifier.sac);
    console.log("SIC: " + dataSourceIdentifier.sic);

})