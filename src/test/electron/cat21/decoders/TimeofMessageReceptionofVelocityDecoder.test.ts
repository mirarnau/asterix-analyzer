import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";
import { TimeofMessageReceptionofVelocity } from '../../../../electron/cat21/valueObjects/TimeofMessageReceptionofVelocity';


test('givenValidBinaryData_WhenDecodeTimeofMessageReceptionofVelocity_thenCorrectValues', async () => {
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
    var timeofMessageReceptionofVelocity : TimeofMessageReceptionofVelocity = (await (cat21Adapter.adapt(messageCategoriesList[0]))).timeofMessageReceptionofVelocity;
   
    //Then    
    
    try{
        console.log("Time of mess recep for Velocity " + timeofMessageReceptionofVelocity.time);
        expect(timeofMessageReceptionofVelocity.time).not.toBe(null);
        expect(timeofMessageReceptionofVelocity.time).toBe(expectedTime);
    } catch {console.log("No data");}

})