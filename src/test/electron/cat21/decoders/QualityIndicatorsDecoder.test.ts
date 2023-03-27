import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { QualityIndicators } from '../../../../electron/cat21/valueObjects/qualityIndicators';
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";


test('givenValidBinaryData_WhenQualityIndicators_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var cat21Adapter : Cat21Adapter = new Cat21Adapter();
    var expectedAddress : string = "405a47";

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var qualityIndicators : QualityIndicators = (await (cat21Adapter.adapt(messageCategoriesList[0]))).qualityIndicators;
   
    //Then    
    
    console.log("Quality Indicators " + qualityIndicators);
    expect(qualityIndicators.nucr_or_nacv).not.toBe(null);
    console.log("NUCr or NACv: " + qualityIndicators.nucr_or_nacv);
    console.log("NUCp or NIC " + qualityIndicators.nucp_or_nic);
    console.log("NICbaro: " + qualityIndicators.nicbaro);
    console.log("SIL: " + qualityIndicators.sil);
    console.log("NACp " + qualityIndicators.nacp);
    console.log("SecondSIL: " + qualityIndicators.second_sil);
    console.log("SDA: " + qualityIndicators.sda);
    console.log("GVA: " + qualityIndicators.gva);
    console.log("PIC: " + qualityIndicators.pic);









    //expect(qualityIndicators.value).toBe(expectedAddress);

})