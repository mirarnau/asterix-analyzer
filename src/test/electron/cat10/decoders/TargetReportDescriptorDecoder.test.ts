import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { TargetReportDescriptorDecoder } from "../../../../electron/cat10/decoders/TargetReportDescriptorDecoder";
import { Cat10Adapter } from "../../../../electron/data/adapters/Cat10Adapter";
import { TargetReportDescriptor } from '../../../../electron/cat10/valueObjects/TargetReportDescriptor';


test('givenValidBinaryData_WhenDecodeTargetReportDescriptor_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var targetReportDescriptorDecoder : TargetReportDescriptorDecoder = new TargetReportDescriptorDecoder();
    var cat10Adapter : Cat10Adapter = new Cat10Adapter();
    var expectedTyp : string = "PSR";
    var expectedDcr : string = "No differential correction (ADS-B)";
    var expectedChn : string = "Chain 1";
    var expectedGbs : string = "Transponder Ground bit not set";
    var expectedCrt : string = "No Corrupted reply in multilateration";

    // When
    var data : Buffer = await fileManager.readFile('FILES/201002-lebl-080001_smr.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messagesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var targetReportDescriptor : TargetReportDescriptor = (await cat10Adapter.adapt(messagesList[0])).targetReportDescriptor;
   
    //Then
    expect(targetReportDescriptor).not.toBe(null);
    expect(targetReportDescriptor.typ).toBe(expectedTyp);
    expect(targetReportDescriptor.dcr).toBe(expectedDcr);
    expect(targetReportDescriptor.chn).toBe(expectedChn);
    expect(targetReportDescriptor.gbs).toBe(expectedGbs);
    expect(targetReportDescriptor.crt).toBe(expectedCrt);

})