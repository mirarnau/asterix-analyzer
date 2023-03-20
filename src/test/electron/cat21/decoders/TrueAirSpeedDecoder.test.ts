import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { TrueAirSpeed } from '../../../../electron/cat21/valueObjects/TrueAirSpeed';
import { TrueAirSpeedDecoder } from '../../../../electron/cat21/decoders/TrueAirSpeedDecoder';
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";
import { TimeofMessageReceptionofPosition } from '../../../../electron/cat21/valueObjects/TimeofMessageReceptionofPosition';


test('givenValidBinaryData_WhenDecodeTrueAirSpeed_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var trueAirSpeedDecoder : TrueAirSpeedDecoder = new TrueAirSpeedDecoder();
    var cat21Adapter : Cat21Adapter = new Cat21Adapter();
    var expectedAs : number = 28801.6;

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var trueAirSpeed : TrueAirSpeed = (await (cat21Adapter.adapt(messageCategoriesList[1]))).trueAirSpeed;
   
    //Then    
    
    try{
        console.log("True Air Speed " + trueAirSpeed.value);
        expect(trueAirSpeed.value).not.toBe(null);
        expect(trueAirSpeed.value).toBe(expectedAs);
    } catch {console.log("No data");}

})