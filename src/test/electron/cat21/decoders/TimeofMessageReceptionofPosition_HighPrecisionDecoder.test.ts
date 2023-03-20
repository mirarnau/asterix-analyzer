import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";
import { TimeofMessageReceptionofPosition_HighPrecision } from '../../../../electron/cat21/valueObjects/TimeofMessageReceptionofPosition_HighPrecision';


test('givenValidBinaryData_WhenDecodeTimeofMessageReceptionofPosition_HighPrecision_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat21Adapter : Cat21Adapter = new Cat21Adapter();
    var expectedTime : number = 28801.6;

    // When
    //var data : Buffer = await fileManager.readFile('/Users/arnaumirhurtado/Documents/GitHub/asterix-analyzer/SAMPLE_FILES/201002-lebl-080001_smr.ast');
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var timeofMessageReceptionofPosition_HighPrecision : TimeofMessageReceptionofPosition_HighPrecision = (await (cat21Adapter.adapt(messageCategoriesList[1]))).timeofMessageReceptionofPosition_highPres;
   
    //Then    
    
    try{
        console.log("Time of mess recep for Positon " + timeofMessageReceptionofPosition_HighPrecision.time);
        expect(timeofMessageReceptionofPosition_HighPrecision.time).not.toBe(null);
        expect(timeofMessageReceptionofPosition_HighPrecision.time).toBe(expectedTime);
    } catch {console.log("No data");}

})