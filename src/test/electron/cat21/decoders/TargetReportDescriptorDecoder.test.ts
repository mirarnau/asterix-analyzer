import {expect, test} from '@jest/globals';
import { FileManager } from "../../../../electron/utils/FileManager";
import { MessageClassifier } from "../../../../electron/data/MessageClassifier";
import { TargetReportDescriptorDecoder } from "../../../../electron/cat21/decoders/TargetReportDescriptorDecoder";
import { TargetReportDescriptor } from "../../../../electron/cat21/valueObjects/TargetReportDescriptor";
import { Cat21Adapter } from "../../../../electron/data/adapters/Cat21Adapter";

test('givenValidBinaryData_WhenDecodeTargetReportDescriptor_thenCorrectValues', async () => {
    // Given
    var fileManager : FileManager = new FileManager();
    var messageClassifier : MessageClassifier = new MessageClassifier();
    var targetReportDescriptorDecoder : TargetReportDescriptorDecoder = new TargetReportDescriptorDecoder();
    var cat21Adapter : Cat21Adapter = new Cat21Adapter();
    var expectedAtp : string = "24-Bit ICAO address";
    var expectedArc : string = "25 ft";
    var expectedRc : string = "Default";
    var expectedRab : string = "Report from target transponder";
    var expectedDcr : string = "No differential correction (ADS-B)";
    var expectedGbs : string = "Ground Bit not set";
    var expectedSim : string = "Actual target report";
    var expectedTst : string  = "Default";
    var expectedSaa : string = "Equipment capable to provide Selected Altitude";
    var expectedCl : string = "Report valid";
    var expectedIpc : string = "Default";
    var expectedNogo : string = "NOGO-bit not set";
    var expectedCpr : string = "CPR Validation correct";
    var expectedLdpj : string = "LDPJ not detected";
    var expectedRcf : string = "Default";

    // When
    //var data : Buffer = await fileManager.readFile('/Users/arnaumirhurtado/Documents/GitHub/asterix-analyzer/SAMPLE_FILES/201002-lebl-080001_smr.ast');
    var data : Buffer = await fileManager.readFile('/Users/marca/Documents/5B/Projectes en Gestió del Trànsit Aeri/FitxersProva/201002-lebl-080001_adsb.ast');

    var slicedData : Buffer[] = await messageClassifier.sliceMessageBuffer(data);
    var messageCategoriesList : Buffer[] = await messageClassifier.classifyMessage(slicedData, slicedData.length);
    var listItems = await cat21Adapter.adapt(messageCategoriesList[0]);
    var targetReportDescriptor : TargetReportDescriptor = await targetReportDescriptorDecoder.decode(listItems[1]);
   
    //Then    
    //console.log("SAC: " + dataSourceIdentifier.sac);
    //console.log("SIC: " + dataSourceIdentifier.sic);
    console.log(listItems);
    expect(targetReportDescriptor).not.toBe(null);
    expect(targetReportDescriptor.atp).toBe(expectedAtp);
    expect(targetReportDescriptor.arc).toBe(expectedArc);
    expect(targetReportDescriptor.rc).toBe(expectedRc);
    expect(targetReportDescriptor.rab).toBe(expectedRab);
    expect(targetReportDescriptor.dcr).toBe(expectedDcr);
    console.log(targetReportDescriptor.dcr);
    expect(targetReportDescriptor.gbs).toBe(expectedGbs);
    expect(targetReportDescriptor.sim).toBe(expectedSim);
    expect(targetReportDescriptor.tst).toBe(expectedTst);
    expect(targetReportDescriptor.saa).toBe(expectedSaa);
    expect(targetReportDescriptor.cl).toBe(expectedCl);
    expect(targetReportDescriptor.ipc).toBe(expectedIpc);
    expect(targetReportDescriptor.nogo).toBe(expectedNogo);
    expect(targetReportDescriptor.cpr).toBe(expectedCpr);
    expect(targetReportDescriptor.ldpj).toBe(expectedLdpj);
    expect(targetReportDescriptor.rcf).toBe(expectedRcf);            

})
