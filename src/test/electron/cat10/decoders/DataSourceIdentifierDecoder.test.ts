import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { DataSourceIdentifier } from "../../../../electron/cat10/valueObjects/DataSourceIdentifier";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";


test('givenValidBinaryData_WhenDecodeDataSourceIdentifier_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();
    var expectedSac : string = "0";
    var expectedSic : string = "7";

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var dataSourceIdentifier : DataSourceIdentifier = (await cat10Adapter.adapt(messageCategoriesList[0])).dataSourceIdentifier;
   
    //Then
    expect(dataSourceIdentifier).not.toBe(null);
    expect(dataSourceIdentifier.sac).toBe(expectedSac);
    expect(dataSourceIdentifier.sic).toBe(expectedSic);

})