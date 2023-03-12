import {expect, test} from '@jest/globals';
import { TargetReportDescriptor } from '../../../../electron/cat10/valueObjects/TargetReportDescriptor';
import { TargetReportDescriptorMockGenerator } from "../../mocks/TargetReportDescriptorMockGenerator";

test('givenValidValues_WhenCreateDataSourceIdentifier_thenNotNull', () => {
    // Given

    // When
    const targetReportDescriptor : TargetReportDescriptor = new TargetReportDescriptorMockGenerator().validTargetReportDescriptor();

    //Then
    expect(targetReportDescriptor.typ).not.toBe(null);
    expect(targetReportDescriptor.dcr).not.toBe(null);
    expect(targetReportDescriptor.chn).not.toBe(null);
    expect(targetReportDescriptor.gbs).not.toBe(null);
    expect(targetReportDescriptor.crt).not.toBe(null);
    expect(targetReportDescriptor.sim).not.toBe(null);

})