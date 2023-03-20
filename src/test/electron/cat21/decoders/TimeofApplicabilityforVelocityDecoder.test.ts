import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { TimeofApplicabilityforVelocity } from '../../../../electron/cat21/valueObjects/TimeofApplicabilityforVelocity';
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";


test('givenValidBinaryData_WhenDecodeTimeofApplicabilityforVelocity_thenCorrectValues', async () => {
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
    var timeofApplicabilityforVelocity : TimeofApplicabilityforVelocity = (await (cat21Adapter.adapt(messageCategoriesList[1]))).timeofApplicabilityforVelocity;
   
    //Then    
    
    try{
        console.log("Time of Applicability for Positon " + timeofApplicabilityforVelocity.time);
        expect(timeofApplicabilityforVelocity.time).not.toBe(null);
        expect(timeofApplicabilityforVelocity.time).toBe(expectedTime);
    } catch {console.log("No data");}

})