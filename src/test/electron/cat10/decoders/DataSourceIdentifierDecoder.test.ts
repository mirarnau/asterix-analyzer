import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { DataSourceIdentifierDecoder } from "../../../../electron/cat10/decoders/DataSourceIdentifierDecoder";
import { DataSourceIdentifier } from "../../../../electron/cat10/valueObjects/DataSourceIdentifier";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";


test('givenValidBinaryData_WhenDecodeDataSourceIdentifier_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var dataSourceIdentifierDecoder : DataSourceIdentifierDecoder = new DataSourceIdentifierDecoder();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();
    var expectedSac : string = "0";
    var expectedSic : string = "7";

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var listItems = await cat10Adapter.adapt(messageCategoriesList[0]);
    var dataSourceIdentifier : DataSourceIdentifier = await dataSourceIdentifierDecoder.decode(listItems[0]);
   
    //Then
    expect(dataSourceIdentifier).not.toBe(null);
    expect(dataSourceIdentifier.sac).toBe(expectedSac);
    expect(dataSourceIdentifier.sic).toBe(expectedSic);
    console.log(listItems);
    console.log("SAC: " + dataSourceIdentifier.sac);
    console.log("SIC: " + dataSourceIdentifier.sic);

})