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
import { TimeofApplicabilityforVelocityDecoder} from "./decoders/TimeofApplicabilityforVelocitiDecoder";
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
import { GeometricVerticalRate } from "./valueObjects/GeometricVerticalRate";
import { GeometricVerticalRateDecoder } from "./decoders/GeometricVerticalRateDecoder";

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
    timeofMessageReceptionofVelocity_highPres : TimeofMessageReceptionofVelocity_HighPrecision;
    geometricHeight : GeometricHeight;
    qualityIndicators : QualityIndicators;
    mopsVersion : MOPSVersion;
    mode3A : Mode3ACodeOctalRepresentation;
    rollAngle : RollAngle;
    flightLevel : FlightLevel;
    magneticHeading : MagneticHeading;
    targetStatus : TargetStatus;
    barometricVerticalRate : BarometricVerticalRate;
    geometricVerticalRate : GeometricVerticalRate;
    ariborneGroundVector : AirborneGroundVector;
    trackAngleRate : TrackAngleRate;
    timeofReportTransmission : TimeofASTERIXReportTransmission;
    targetIdentification : TargetIdentification;
    emitterCategory : EmitterCategory;
    metInformation : MetInformation;
    selectedAltitude : SelectedAltitude;
    finalStateSelectedAltitude : FinalStateSelectedAltitude;
    trajectoryIntent : TrajectoryIntent;
    serviceManagement : ServiceManagement;
    aircraftOperationalStatus : AircraftOperationalStatus;
    surfaCapabilitiesandCharacteristics: SurfaceCapabilitiesandCharacteristics;
    messageAmplitude : MessageAmplitude;
    modeSMBData : ModeSMBData;
    acasResolutionAdvisoryReport : ACASResolutionAdvisoryReport;
    receiverID : ReceiverID;
    dataAges : DataAges;

    public async setDataSourceIdentifier(item : Buffer) : Promise<void> {
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

    public async setTimeofApplicabilityforPosition(item : Buffer) : Promise<void> {
        var timeofApplicabilityforPositionDecoder : TimeofApplicabilityforPositionDecoder = new TimeofApplicabilityforPositionDecoder();
        var timeofApplicabilityforPosition : TimeofApplicabilityforPosition = await timeofApplicabilityforPositionDecoder.decode(item);
        this.timeofApplicabilityforPosition = timeofApplicabilityforPosition;
    } 

    public async setPositioninWGS84Coordinates(item : Buffer) : Promise<void> {
        var positioninWGS84CoordinatesDecoder : PositioninWGS84CoordinatesDecoder = new PositioninWGS84CoordinatesDecoder();
        var positioninWGS84Coordinates : PositioninWGS84Coordinates = await positioninWGS84CoordinatesDecoder.decode(item);
        this.positioninWGS84Coordinates = positioninWGS84Coordinates;
    }

    public async setHighResPositionPositioninWGS84Coordinates(item : Buffer) : Promise<void> {
        var highResolutionPositioninWGS84CoordinatesDecoder : HighResolutionPositioninWGS84CoordinatesDecoder = new HighResolutionPositioninWGS84CoordinatesDecoder();
        var highResolutionPositioninWGS84Coordinates : HighResolutionPositioninWGS84Coordinates = await highResolutionPositioninWGS84CoordinatesDecoder.decode(item);
        this.highResPositioninWGS84Coordinates = highResolutionPositioninWGS84Coordinates;
    }

    public async setTimeofApplicabilityforVelocity(item : Buffer) : Promise<void> {
        var timeofApplicabilityforVelocityDecoder : TimeofApplicabilityforVelocityDecoder = new TimeofApplicabilityforVelocityDecoder();
        var timeofApplicabilityforVelocity : TimeofApplicabilityforVelocity = await timeofApplicabilityforVelocityDecoder.decode(item);
        this.timeofApplicabilityforVelocity = timeofApplicabilityforVelocity;
    }

    public async setAirSpeed(item : Buffer) : Promise<void> {
        var airSpeedDecoder : AirSpeedDecoder = new AirSpeedDecoder();
        var airSpeed : AirSpeed = await airSpeedDecoder.decode(item);
        this.airSpeed = airSpeed;
    }

    public async setTrueAirSpeed(item : Buffer) : Promise<void> {
        var trueAirSpeedDecoder : TrueAirSpeedDecoder = new TrueAirSpeedDecoder();
        var trueAirSpeed : TrueAirSpeed = await trueAirSpeedDecoder.decode(item);
        this.trueAirSpeed = trueAirSpeed;
    }

    public async setTargetAddress(item : Buffer) : Promise<void> {
        var targetAddressDecoder : TargetAddressDecoder = new TargetAddressDecoder();
        var targetAddress : TargetAddress = await targetAddressDecoder.decode(item);
        this.targetAddress = targetAddress;
    }
    
    public async setTimeofMessageReceptionofPosition(item : Buffer) : Promise<void> {
        var timeofMessageReceptionofPositionDecoder : TimeofMessageReceptionofPositionDecoder = new TimeofMessageReceptionofPositionDecoder();
        var timeofMessageReceptionofPosition : TimeofMessageReceptionofPosition = await timeofMessageReceptionofPositionDecoder.decode(item);
        this.timeofApplicabilityforPosition = timeofMessageReceptionofPosition;
    }

    public async setTimeofMessageReceptionofPositionHighPres(item : Buffer) : Promise<void> {
        var timeofMessageReceptionofPosition_HighPrecisionDecoder : TimeofMessageReceptionofPosition_HighPrecisionDecoder = new TimeofMessageReceptionofPosition_HighPrecisionDecoder();
        var timeofMessageReceptionofPosition_highPres : TimeofMessageReceptionofPosition_HighPrecision = await timeofMessageReceptionofPosition_HighPrecisionDecoder.decode(item);
        this.timeofMessageReceptionofPosition_highPres = timeofMessageReceptionofPosition_highPres;
    }

    public async setTimeofMessageReceptionofVelocity(item : Buffer) : Promise<void> {
        var timeofMessageReceptionofVelocityDecoder : TimeofMessageReceptionofVelocityDecoder = new TimeofMessageReceptionofVelocityDecoder();
        var timeofMessageReceptionofVelocity : TimeofMessageReceptionofVelocity = await timeofMessageReceptionofVelocityDecoder.decode(item);
        this.timeofMessageReceptionofVelocity = timeofMessageReceptionofVelocity;
    }

    public async setTimeofMessageReceptionofVelocity_HighPres(item : Buffer) : Promise<void> {
        var timeofMessageReceptionofVelocity_HighPrecisionDecoder : TimeofMessageReceptionofVelocity_HighPrecisionDecoder = new TimeofMessageReceptionofVelocity_HighPrecisionDecoder();
        var timeofMessageReceptionofVelocity_highPres : TimeofMessageReceptionofVelocity_HighPrecision = await timeofMessageReceptionofVelocity_HighPrecisionDecoder.decode(item);
        this.timeofMessageReceptionofVelocity_highPres = timeofMessageReceptionofVelocity_highPres;
    }

    public async setGeometricHeight(item : Buffer) : Promise<void>{
        var geometricHeightDecoder : GeometricHeihgtDecoder = new GeometricHeihgtDecoder();
        var geometricHeight : GeometricHeight = await geometricHeightDecoder.decode(item);
        this.geometricHeight = geometricHeight;
    }

    public async setQualityIndicators(item : Buffer) : Promise<void> {
        var qualityIndicatorsDecoder : QualityIndicatorsDecoder = new QualityIndicatorsDecoder();
        var qualityIndicators : QualityIndicators = await qualityIndicatorsDecoder.decode(item);
        this.qualityIndicators = qualityIndicators;
    }

    public async setMOPSVersion(item : Buffer) : Promise<void> {
        var mopsVersionDecoder : MOPSVersionDecoder = new MOPSVersionDecoder();
        var mopsVersion : MOPSVersion = await mopsVersionDecoder.decode(item);
        this.mopsVersion = mopsVersion;
    }

    public async setMode3A(item : Buffer) : Promise<void> {
        var mode3ACodeOcalRepresentationDecoder : Mode3ACodeOctalRepresentationDecoder = new Mode3ACodeOctalRepresentationDecoder();
        var mode3A : Mode3ACodeOctalRepresentation = await mode3ACodeOcalRepresentationDecoder.decode(item);
        this.mode3A = mode3A;
    }

    public async setRollAngle(item : Buffer) : Promise<void> {
        var rollAngleDecoder : RollAngleDecoder = new RollAngleDecoder();
        var rollAngle : RollAngle = await rollAngleDecoder.decode(item);
        this.rollAngle = rollAngle;
    }

    public async setFlightLevel(item : Buffer) : Promise<void> {
        var flightLevelDecoder : FlightLevelDecoder = new FlightLevelDecoder();
        var flightLevel : FlightLevel = await flightLevelDecoder.decode(item);
        this.flightLevel = flightLevel;
    }

    public async setMagneticHeading(item : Buffer) : Promise<void> {
        var magneticHeadingDecoder : MagneticHeadingDecoder = new MagneticHeadingDecoder();
        var magneticHeading : MagneticHeading = await magneticHeadingDecoder.decode(item);
        this.magneticHeading = magneticHeading;
    }

    public async setTargetStatus(item : Buffer) : Promise<void> {
        var targetStatusDecoder : TargetStatusDecoder = new TargetStatusDecoder();
        var targetStatus : TargetStatus = await targetStatusDecoder.decode(item);
        this.targetStatus = targetStatus;
    }

    public async setBarometricVerticalRate(item : Buffer) : Promise<void> {
        var barometricVerticalRateDecoder : BarometricVerticalRateDecoder = new BarometricVerticalRateDecoder();
        var barometricVerticalRate : BarometricVerticalRate = await barometricVerticalRateDecoder.decode(item);
        this.barometricVerticalRate = barometricVerticalRate;
    }

    public async setGeometricVerticalRate(item : Buffer) : Promise<void> {
        var geometricVerticalRateDecoder : GeometricVerticalRateDecoder = new GeometricVerticalRateDecoder();
        var geometricVerticalRate : GeometricVerticalRate = await geometricVerticalRateDecoder.decode(item);
        this.geometricVerticalRate = geometricVerticalRate;
    }

    public async setAirborneGroundVector(item : Buffer) : Promise<void> {
        var airborneGroundVectorDecoder : AirborneGroundVectorDecoder = new AirborneGroundVectorDecoder();
        var airborneGroundVector : AirborneGroundVector = await airborneGroundVectorDecoder.decode(item);
        this.ariborneGroundVector = airborneGroundVector;
    }

    public async setTrackAngleRate(item : Buffer) : Promise<void> {
        var trackAngleRateDecoder : TrackAngleRateDecoder = new TrackAngleRateDecoder();
        var trackAngleRate : TrackAngleRate = await trackAngleRateDecoder.deocde(item);
        this.trackAngleRate = trackAngleRate;
    }

    public async setTimeofReportTransmission(item : Buffer) : Promise<void> {
        var timeofReportTransmissionDecoder : TimeofASTERIXReportTransmissionDecoder = new TimeofASTERIXReportTransmissionDecoder();
        var timeofReportTransmission : TimeofASTERIXReportTransmission = await timeofReportTransmissionDecoder.decode(item);
        this.timeofReportTransmission = timeofReportTransmission;
    }
    
    public async setTargetIdentification(item : Buffer) : Promise<void> {
        var targetIdentificationDecoder : TargetIdentificationDecoder = new TargetIdentificationDecoder();
        var targetIdentification : TargetIdentification = await targetIdentificationDecoder.decode(item);
        this.targetIdentification = targetIdentification;
    }

    public async setEmitterCategory(item : Buffer) : Promise<void> {
        var emitterCategoryDecoder : EmitterCategoryDecoder = new EmitterCategoryDecoder();
        var emitterCategory : EmitterCategory = await emitterCategoryDecoder.decode(item);
        this.emitterCategory = emitterCategory;
    }

    public async setMetInformation(item : Buffer, selection: string[]) : Promise<void> {
        var metInformationDecoder : MetInformationDecoder = new MetInformationDecoder();
        var metInformation : MetInformation = await metInformationDecoder.decode(item, selection);
        this.metInformation = metInformation;
    }

    public async setSelectedAltutude(item : Buffer) : Promise<void> {
        var selectedAltitudeDecoder : SelectedAltitudeDecoder = new SelectedAltitudeDecoder();
        var selectedAltitude : SelectedAltitude = await selectedAltitudeDecoder.decode(item);
        this.selectedAltitude = selectedAltitude;
    }

    public async setFinalStateSelectedAltitude(item : Buffer) : Promise<void> {
        var finalStateSelectedAltitudeDecoder : FinalStateSelectedAltitudeDecoder = new FinalStateSelectedAltitudeDecoder();
        var finalStateSelectedAltitude : FinalStateSelectedAltitude = await finalStateSelectedAltitudeDecoder.decode(item);
        this.finalStateSelectedAltitude = finalStateSelectedAltitude;       
    }

    public async setTrajectoryIntent(item : Buffer, tis: boolean, tid: boolean, rep: number) : Promise<void> {
        var trajectoryIntentDeocer : TrajectoryIntentDecoder = new TrajectoryIntentDecoder();
        var trajectoryIntent : TrajectoryIntent = await trajectoryIntentDeocer.decode(item, tis, tid, rep);
        this.trajectoryIntent = trajectoryIntent;
    }

    public async setServiceManagement(item : Buffer) : Promise<void> {
        var serviceManagementDecoder : ServiceManagementDecoder = new ServiceManagementDecoder();
        var serviceManagement : ServiceManagement = await serviceManagementDecoder.decode(item);
        this.serviceManagement = serviceManagement;        
    }

    public async setAircraftOperationalStatus(item : Buffer) : Promise<void> {
        var aircraftOperationalStatusDecoder : AircraftOperationalStatusDecoder = new AircraftOperationalStatusDecoder();
        var aircraftOperationalStatus : AircraftOperationalStatus = await aircraftOperationalStatusDecoder.decode(item);
        this.aircraftOperationalStatus = aircraftOperationalStatus;
    }

    public async setSurfaceCapabilitiesandCharacteristics(item : Buffer) : Promise<void> {
        var surfaceCapabilitiesandCharacteristicsDecoder : SurfaceCapabilitiesandCharacteristicsDecoder = new SurfaceCapabilitiesandCharacteristicsDecoder();
        var surfaCapabilitiesandCharacteristics : SurfaceCapabilitiesandCharacteristics = await surfaceCapabilitiesandCharacteristicsDecoder.deocde(item);
        this.surfaCapabilitiesandCharacteristics = surfaCapabilitiesandCharacteristics;
    }
    
    public async setMessageAmplitude(item : Buffer) : Promise<void> {
        var messageAmplitudeDecoder : MessageAmplitudeDecoder = new MessageAmplitudeDecoder();
        var messageAmplitude : MessageAmplitude = await messageAmplitudeDecoder.decode(item);
        this.messageAmplitude = messageAmplitude;
    }

    public async setModeSMBData(item : Buffer, rep : number) : Promise<void> {
        var modeSMBDataDecoder : ModeSMBDataDecoder = new ModeSMBDataDecoder();
        var modeSMBData : ModeSMBData = await modeSMBDataDecoder.decode(item, rep);
        this.modeSMBData = modeSMBData;
    }

    public async setACASResolutionAdvisoryReport(item : Buffer) : Promise<void> {
        var acasResolutionAdvisoryReportDecoder : ACASResolutionAdvisoryReportDecoder = new ACASResolutionAdvisoryReportDecoder();
        var acasResolutionAdvisoryReport : ACASResolutionAdvisoryReport = await acasResolutionAdvisoryReportDecoder.decode(item);
        this.acasResolutionAdvisoryReport = acasResolutionAdvisoryReport;
    }

    public async setReceiverID(item : Buffer) : Promise<void> {
        var receiverIDDecoder : ReceiverIDDecoder = new ReceiverIDDecoder();
        var receiverID : ReceiverID = await receiverIDDecoder.decode(item);
        this.receiverID = receiverID;
    }

    public async setDataAges(item : Buffer) : Promise<void> {
        var dataAgesDecoder : DataAgesDecoder = new DataAgesDecoder();
        var dataAges : DataAges = await dataAgesDecoder.decode(item);
        this.dataAges = dataAges;
    }


}