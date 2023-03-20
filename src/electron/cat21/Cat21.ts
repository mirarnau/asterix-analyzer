import { ACASResolutionAdvisoryReport } from "./valueObjects/ACASResolutionAdvisoryReport";
import { ACASResolutionAdvisoryReportDecoder } from "./decoders/ACASResolutionAdvisoryReportDecoder";
import { AirborneGroundVector } from "./valueObjects/AirborneGroundVector";
import { AirborneGroundVectorDecoder } from "./decoders/AirborneGroundVectorDecoder";
import { AircraftOperationalStatus } from "./valueObjects/AircraftOperationalStatus";
import { AircraftOperationalStatusDecoder } from "./decoders/AircraftOperationalStatusDecoder";
import { AirSpeed } from "./valueObjects/AirSpeed";
import { AirSpeedDecoder } from "./decoders/AirSpeedDecoder";
import { BarometricVerticalRate } from "./valueObjects/BarometricVerticalRate";
import { BarometricVerticalRateDecoder } from "./decoders/BarometricVerticalRateDecoder";
import { DataAges } from "./valueObjects/DataAges";
import { DataAgesDecoder } from "./decoders/DataAgesDecoder";
import { DataSourceIdentifier } from "./valueObjects/DataSourceIdentifier";
import { DataSourceIdentifierDecoder} from "./decoders/DataSourceIdentifierDecoder";
import { EmitterCategory } from "./valueObjects/EmitterCategory";
import { EmitterCategoryDecoder } from "./decoders/EmitterCategoryDecoder";
import { FinalStateSelectedAltitude } from "./valueObjects/FinalStateSelectedAltitude";
import { FinalStateSelectedAltitudeDecoder } from "./decoders/FinalStateSelectedAltitudeDecoder";
import { FlightLevel } from "./valueObjects/FlightLevel";
import { FlightLevelDecoder } from "./decoders/FlightLevelDecoder";
import { GeometricHeight } from "./valueObjects/GeometricHeight";
import { GeometricHeihgtDecoder } from "./decoders/GeometricHeightDecoder";
import { HighResolutionPositioninWGS84Coordinates } from "./valueObjects/HighResolutionPositioninWGS84Coordinates";
import { HighResolutionPositioninWGS84CoordinatesDecoder } from "./decoders/HighResolutionPositioninWGS84CoordinatesDecoder";
import { MagneticHeading } from "./valueObjects/MagneticHeading";
import { MagneticHeadingDecoder } from "./decoders/MagneticHeadingDecoder";
import { MessageAmplitude } from "./valueObjects/MessageAmplitude";
import { MessageAmplitudeDecoder } from "./decoders/MessageAmplitudeDecoder";
import { MetInformation } from "./valueObjects/MetInformation";
import { MetInformationDecoder } from "./decoders/MetInformationDecoder";
import { Mode3ACodeOctalRepresentation } from "./valueObjects/Mode3ACodeOctalRepresentation";
import { Mode3ACodeOctalRepresentationDecoder } from "./decoders/Mode3ACodeOcalRepresentationDecoder";
import { ModeSMBData } from "./valueObjects/ModeSMBData";
import { ModeSMBDataDecoder } from "./decoders/ModeSMBDataDecoder";
import { MOPSVersion } from "./valueObjects/MOPSVersion";
import { MOPSVersionDecoder } from "./decoders/MOPSVersionDecoder";
import { PositioninWGS84Coordinates } from "./valueObjects/PositioninWGS84Coordinates";
import { PositioninWGS84CoordinatesDecoder } from "./decoders/PositioninWGS84CoordinatesDecoder";
import { QualityIndicators } from "./valueObjects/QualityIndicators";
import { QualityIndicatorsDecoder } from "./decoders/QualityIndicatorDecoder";
import { ReceiverID } from "./valueObjects/ReceiverID";
import { ReceiverIDDecoder } from "./decoders/ReceiverIDDecoder";
import { RollAngle } from "./valueObjects/RollAngle";
import { RollAngleDecoder } from "./decoders/RollAngleDecoder";
import { SelectedAltitude } from "./valueObjects/SelectedAltitude";
import { SelectedAltitudeDecoder } from "./decoders/SelectedAltitudeDecoder";
import { ServiceIdentification } from "./valueObjects/ServiceIdentification";
import { ServiceIdentificationDecoder } from "./decoders/ServiceIdentificationDecoder";
import { ServiceManagement } from "./valueObjects/ServiceManagement";
import { ServiceManagementDecoder } from "./decoders/ServiceManagementDecoder";
import { SurfaceCapabilitiesandCharacteristics } from "./valueObjects/SurfaceCapabilitiesandCharacteristics";
import { SurfaceCapabilitiesandCharacteristicsDecoder } from "./decoders/SurfaceCapabilitiesandCharacteristicsDecoder";
import { TargetAddress } from "./valueObjects/TargetAddress";
import { TargetAddressDecoder } from "./decoders/TargetAddressDecoder";
import { TargetIdentification } from "./valueObjects/TargetIdentification";
import { TargetIdentificationDecoder } from "./decoders/TargetIdentificationDecoder";
import { TargetReportDescriptor } from "./valueObjects/TargetReportDescriptor";
import { TargetReportDescriptorDecoder } from "./decoders/TargetReportDescriptorDecoder";
import { TargetStatus } from "./valueObjects/TargetStatus";
import { TargetStatusDecoder } from "./decoders/TargetStatusDecoder";
import { TimeofApplicabilityforPosition } from "./valueObjects/TimeofApplicabilityforPosition";
import { TimeofApplicabilityforPositionDecoder } from "./decoders/TimeofApplicabilityforPositionDecoder";
import { TimeofApplicabilityforVelocity } from "./valueObjects/TimeofApplicabilityforVelocity";
import { TimeofApplicabilityforVelocityDecoder } from "./decoders/TimeofApplicabilityforVelocitiDecoder";
import { TimeofASTERIXReportTransmission } from "./valueObjects/TimeofASTERIXReportTransmission";
import { TimeofASTERIXReportTransmissionDecoder } from "./decoders/TimeofASTERIXReportTransmissionDecoder";
import { TimeofMessageReceptionofPosition } from "./valueObjects/TimeofMessageReceptionofPosition";
import { TimeofMessageReceptionofPositionDecoder } from "./decoders/TimeofMessageReceptionofPositionDecoder";
import { TimeofMessageReceptionofVelocity_HighPrecision } from "./valueObjects/TimeofMessageReceptionofVelocity_HighPrecision";
import { TimeofMessageReceptionofVelocity_HighPrecisionDecoder } from "./decoders/TimeofMessageReceptionofVelocity_HighPrecisionDecoder";
import { TimeofMessageReceptionofVelocity } from "./valueObjects/TimeofMessageReceptionofVelocity";
import { TimeofMessageReceptionofVelocityDecoder } from "./decoders/TimeofMessageReceptionofVelocityDecoder";
import { TimeofMessageReceptionofPosition_HighPrecision } from "./valueObjects/TimeofMessageReceptionofPosition_HighPrecision";
import { TimeofMessageReceptionofPosition_HighPrecisionDecoder } from "./decoders/TimeofMessageReceptionofPosition_HighPrecisionDecoder";
import { TrackAngleRate } from "./valueObjects/TrackAngleRate";
import { TrackAngleRateDecoder } from "./decoders/TrackAngleRateDecoder";
import { TrackNumber } from "./valueObjects/TrackNumber";
import { TrackNumberDecoder } from "./decoders/TrackNumberDecoder";
import { TrajectoryIntent } from "./valueObjects/TrajcetoryIntent";
import { TrajectoryIntentDecoder } from "./decoders/TrajectoryIntentDecoder";
import { TrueAirSpeed } from "./valueObjects/TrueAirSpeed";
import { TrueAirSpeedDecoder } from "./decoders/TrueAirSpeedDecoder";

export class Cat21 {

    dataSourceIdentifier : DataSourceIdentifier;
    targetReportDescriptor : TargetReportDescriptor;
    trackNumber : TrackNumber;
    serviceIdentification : ServiceIdentification;
    timeofApplicabilityforPosition : TimeofApplicabilityforPosition;
    positioninWGS84Coordinates : PositioninWGS84Coordinates;
    highResPositioninWGS84Coordinates : HighResolutionPositioninWGS84Coordinates;
    timeofApplicabilityforVelocity : TimeofApplicabilityforVelocity;
    airSpeed : AirSpeed;
    trueAirSpeed : TrueAirSpeed;
    targetAddress : TargetAddress;
    timeofMessageReceptionofPosition : TimeofMessageReceptionofPosition;
    timeofMessageReceptionofPosition_highPres : TimeofMessageReceptionofPosition_HighPrecision;
    timeofMessageReceptionofVelocity : TimeofMessageReceptionofVelocity;


    public async setDataSourceIDentifier(item : Buffer) : Promise<void> {
        var dataSourceIdentifierDecoder : DataSourceIdentifierDecoder = new DataSourceIdentifierDecoder();
        var dataSourceIdentifier : DataSourceIdentifier = await dataSourceIdentifierDecoder.decode(item);
        this.dataSourceIdentifier = dataSourceIdentifier;
    }

    public async setTargetReporDesriptor(item : Buffer) : Promise<void> {
        var targetReportDescriptorDecoder : TargetReportDescriptorDecoder = new TargetReportDescriptorDecoder();
        var targetReportDescriptor : TargetReportDescriptor = await targetReportDescriptorDecoder.decode(item);
        this.targetReportDescriptor = targetReportDescriptor;
    }

    public async setTrackNumber(item : Buffer) : Promise<void> {
        var trackNumberDecoder : TrackNumberDecoder = new TrackNumberDecoder();
        var trackNumber : TrackNumber = await trackNumberDecoder.decode(item);
        this.trackNumber = trackNumber;
    }

    public async setServiceIdentification(item : Buffer) : Promise<void> {
        var serviceIdentificationDecoder : ServiceIdentificationDecoder = new ServiceIdentificationDecoder();
        var serviceIdentification : ServiceIdentification = await serviceIdentificationDecoder.decode(item);
        this.serviceIdentification = serviceIdentification;
    }


    




}