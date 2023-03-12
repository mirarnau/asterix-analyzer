import {expect, test} from '@jest/globals';
import { TargetReportDescriptor } from '../../../../electron/cat21/valueObjects/TargetReportDescriptor';
import { TargetReportDescriptorMockGenerator } from "../../mocks_cat21/TargetReportDescriptorMockGenerator";

test('givenValidValues_WhenCreateDataSourceIdentifier_thenNotNull', () => {
    // Given

    // When
    const targetReportDescriptor : TargetReportDescriptor = new TargetReportDescriptorMockGenerator().validTargetReportDescriptor();

    //Then
    expect(targetReportDescriptor.atp).not.toBe(null);
    expect(targetReportDescriptor.arc).not.toBe(null);
    expect(targetReportDescriptor.rc).not.toBe(null);
    expect(targetReportDescriptor.rab).not.toBe(null);

})