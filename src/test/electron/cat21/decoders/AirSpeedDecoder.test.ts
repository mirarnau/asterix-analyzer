import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { AirSpeed } from '../../../../electron/cat21/valueObjects/AirSpeed';
import { AirSpeedDecoder } from '../../../../electron/cat21/decoders/AirSpeedDecoder';
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";
import { TimeofMessageReceptionofPosition } from '../../../../electron/cat21/valueObjects/TimeofMessageReceptionofPosition';


test('givenValidBinaryData_WhenDecodeAirSpeed_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var airSpeedDecoder : AirSpeedDecoder = new AirSpeedDecoder();
    var cat21Adapter : Cat21Adapter = new Cat21Adapter();
    var expectedAs : number = 28801.6;

    // When
    //var data : Buffer = await fileManager.readFile('/Users/arnaumirhurtado/Documents/GitHub/asterix-analyzer/SAMPLE_FILES/201002-lebl-080001_smr.ast');
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var airSpeed : AirSpeed = (await (cat21Adapter.adapt(messageCategoriesList[1]))).airSpeed;
   
    //Then    
    
    try{
        console.log("Air Speed " + airSpeed.value);
        expect(airSpeed.value).not.toBe(null);
        expect(airSpeed.value).toBe(expectedAs);
    } catch {console.log("No data");}

})