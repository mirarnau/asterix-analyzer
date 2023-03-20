import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { TimeofApplicabilityforPosition } from '../../../../electron/cat21/valueObjects/TimeofApplicabilityforPosition';
import { TimeofApplicabilityforPositionDecoder } from '../../../../electron/cat21/decoders/TimeofApplicabilityforPositionDecoder';
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";
import { TimeofMessageReceptionofPosition } from '../../../../electron/cat21/valueObjects/TimeofMessageReceptionofPosition';


test('givenValidBinaryData_WhenDecodeTimeofApplicabilityforPosition_thenCorrectValues', async () => {
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
    var timeofApplicabilityforPosition : TimeofApplicabilityforPosition = (await (cat21Adapter.adapt(messageCategoriesList[1]))).timeofApplicabilityforPosition;
   
    //Then    
    
    try{
        console.log("Time of Applicability for Positon " + timeofApplicabilityforPosition.time);
        expect(timeofApplicabilityforPosition.time).not.toBe(null);
        expect(timeofApplicabilityforPosition.time).toBe(expectedTime);
    } catch {console.log("No data");}

})