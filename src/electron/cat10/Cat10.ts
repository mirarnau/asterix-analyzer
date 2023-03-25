import { AmplitudeOfPrimaryPlotDecoder } from "./decoders/AmplitudeOfPrimaryPlotDecoder";
import { CalculatedAccelerationDecoder } from "./decoders/CalculatedAccelerationDecoder";
import { CalculatedTrackVelocityCartesianCoordinatesDecoder } from "./decoders/CalculatedTrackVelocityCartesianCoordinatesDecoder";
import { CalculatedTrackVelocityPolarCoordinatesDecoder } from "./decoders/CalculatedTrackVelocityPolarCoordinatesDecoder";
import { DataSourceIdentifierDecoder } from "./decoders/DataSourceIdentifierDecoder";
import { FlightLevelBinaryDecoder } from "./decoders/FlightLevelBinaryDecoder";
import { MeasuredHeightDecoder } from "./decoders/MeasuredHeightDecoder";
import { MeasuredPositionPolarCoordinatesDecoder } from "./decoders/MeasuredPositionPolarCoordinatesDecoder";
import { MessageTypeDecoder } from "./decoders/MessageTypeDecoder";
import { Mode3ACodeOctalRepresentationDecoder } from "./decoders/Mode3ACodeOctalRepresentationDecoder";
import { ModeSMBDataDecoder } from "./decoders/ModeSMBDataDecoder";
import { PositionCartesianCoordinatesDecoder } from "./decoders/PositionCartesianCoordinatesDecoder";
import { PositionWG84CoordinatesDecoder } from "./decoders/PositionWGS84CoordinatesDecoder";
import { PreProgrammedMessageDecoder } from "./decoders/PreProgrammedMessageDecoder";
import { PresenceDecoder } from "./decoders/PresenceDecoder";
import { StandardDeviationOfPositionDecoder } from "./decoders/StandardDeviationOfPositionDecoder";
import { SystemStatusDecoder } from "./decoders/SystemStatusDecoder";
import { TargetAddressDecoder } from "./decoders/TargetAddressDecoder";
import { TargetIdentificationDecoder } from "./decoders/TargetIdentificationDecoder";
import { TargetReportDescriptorDecoder } from "./decoders/TargetReportDescriptorDecoder";
import { TargetSizeAndOrientationDecoder } from "./decoders/TargetSizeAndOrientationDecoder";
import { TimeOfDayDecoder } from "./decoders/TimeOfDayDecoder";
import { TrackNumberDecoder } from "./decoders/TrackNumberDecoder";
import { TrackStatusDecoder } from "./decoders/TrackStatusDecoder";
import { VehicleFleetIdentificationDecoder } from "./decoders/VehicleFleetIdentificationDecoder";
import { AmplitudeOfPrimaryPlot } from "./valueObjects/AmplitudeOfPrimaryPlot";
import { CalculatedAcceleration } from "./valueObjects/CalculatedAcceleration";
import { CalculatedTrackVelocityCartesianCoordinates } from "./valueObjects/CalculatedTrackVelocityCartesianCoordinates";
import { CalculatedTrackVelocityPolarCoordinates } from "./valueObjects/CalculatedTrackVelocityPolarCoordinates";
import { DataSourceIdentifier } from "./valueObjects/DataSourceIdentifier";
import { FlightLevelBinary } from "./valueObjects/FlightLevelBinary";
import { MeasuredHeight } from "./valueObjects/MeasuredHeight";
import { MeasuredPositionPolarCoordinates } from "./valueObjects/MeasuredPositionPolarCoordinates";
import { MessageType } from "./valueObjects/MessageType";
import { Mode3ACodeOctalRepresentation } from "./valueObjects/Mode3ACodeOctalRepresentation";
import { ModeSMBData } from "./valueObjects/ModeSMBData";
import { PositionCartesianCoordinates } from "./valueObjects/PositionCartesianCoordinates";
import { PositionWG84Coordinates } from "./valueObjects/PositionWGS84Coordinates";
import { PreProgrammedMessage } from "./valueObjects/PreProgrammedMessage";
import { Presence } from "./valueObjects/Presence";
import { StandardDeviationOfPosition } from "./valueObjects/StandardDeviationOfPosition";
import { SystemStatus } from "./valueObjects/SystemStatus";
import { TargetAddress } from "./valueObjects/TargetAddress";
import { TargetIdentification } from "./valueObjects/TargetIdentification";
import { TargetReportDescriptor } from "./valueObjects/TargetReportDescriptor";
import { TargetSizeAndOrientation } from "./valueObjects/TargetSizeAndOrientation";
import { TimeOfDay } from "./valueObjects/TimeOfDay";
import { TrackNumber } from "./valueObjects/TrackNumber";
import { TrackStatus } from "./valueObjects/TrackStatus";
import { VehicleFleetIdentification } from "./valueObjects/VehicleFleetIdentification";

export class Cat10 {
    messageType : MessageType;
    dataSourceIdentifier : DataSourceIdentifier;
    targetReportDescriptor : TargetReportDescriptor;
    measuredPositionPolarCoordinates : MeasuredPositionPolarCoordinates;
    positionWG84Coordinates : PositionWG84Coordinates;
    positionCartesianCoordinates : PositionCartesianCoordinates;
    mode3ACodeOctalRepresentation : Mode3ACodeOctalRepresentation;
    flightLevelBinary : FlightLevelBinary;
    measuredHeight : MeasuredHeight;
    amplitudeOfPrimaryPlot : AmplitudeOfPrimaryPlot;
    timeOfDay : TimeOfDay;
    trackNumber : TrackNumber;
    trackStatus : TrackStatus;
    calculatedTrackVelocityPolarCoordinates : CalculatedTrackVelocityPolarCoordinates;
    calculatedTrackVelocityCartesianCoordinates : CalculatedTrackVelocityCartesianCoordinates;
    calculatedAcceleration : CalculatedAcceleration;
    targetAddress : TargetAddress;
    targetIdentification : TargetIdentification;
    modeSMBData : ModeSMBData;
    targetSizeAndOrientation : TargetSizeAndOrientation;
    presence : Presence;
    vehicleFleetIdentification : VehicleFleetIdentification;
    preProgrammedMessage : PreProgrammedMessage;
    standardDeviationOfPosition : StandardDeviationOfPosition;
    systemStatus : SystemStatus;

    public async setMessageType(item : Buffer) : Promise<void> {
        var messageTypeDecoder : MessageTypeDecoder = new MessageTypeDecoder();
        var messageType : MessageType = await  messageTypeDecoder.decode(item);
        this.messageType = messageType;
    }

    public async setDataSourceIdentifier(item : Buffer) : Promise<void> {
        var dataSourceIdentifierDecoder : DataSourceIdentifierDecoder = new DataSourceIdentifierDecoder();
        var dataSourceIdentifier : DataSourceIdentifier = await  dataSourceIdentifierDecoder.decode(item);
        this.dataSourceIdentifier = dataSourceIdentifier;
    }

    public async setTargetReportDescriptor(item : Buffer) : Promise<void> {
        var targetReportDescriptorDecoder : TargetReportDescriptorDecoder = new TargetReportDescriptorDecoder();
        var targetReportDescriptor : TargetReportDescriptor = await  targetReportDescriptorDecoder.decode(item);
        this.targetReportDescriptor = targetReportDescriptor;
    }

    public async setMeasuredPositionPolarCoordinates(item : Buffer) : Promise<void> {
        var measuredPositionPolarCoordinatesDecoder : MeasuredPositionPolarCoordinatesDecoder = new MeasuredPositionPolarCoordinatesDecoder();
        var measuredPositionPolarCoordinates : MeasuredPositionPolarCoordinates = await  measuredPositionPolarCoordinatesDecoder.decode(item);
        this.measuredPositionPolarCoordinates = measuredPositionPolarCoordinates;
    }

    public async setPositionWG84Coordinates(item : Buffer) : Promise<void> {
        var positionWG84CoordinatesDecoder : PositionWG84CoordinatesDecoder = new PositionWG84CoordinatesDecoder();
        var positionWG84Coordinates : PositionWG84Coordinates = await positionWG84CoordinatesDecoder.decode(item);
        this.positionWG84Coordinates = positionWG84Coordinates;
    }

    public async setPositionCartesianCoordinates(item : Buffer) : Promise<void> {
        var positionCartesianCoordinatesDecoder : PositionCartesianCoordinatesDecoder = new PositionCartesianCoordinatesDecoder();
        var positionCartesianCoordinates : PositionCartesianCoordinates = await positionCartesianCoordinatesDecoder.decode(item);
        this.positionCartesianCoordinates = positionCartesianCoordinates;
    }

    public async setMode3ACodeOctalRepresentation(item : Buffer) : Promise<void> {
        var mode3ACodeOctalRepresentationDecoder : Mode3ACodeOctalRepresentationDecoder = new Mode3ACodeOctalRepresentationDecoder();
        var mode3ACodeOctalRepresentation : Mode3ACodeOctalRepresentation = await mode3ACodeOctalRepresentationDecoder.decode(item);
        this.mode3ACodeOctalRepresentation = mode3ACodeOctalRepresentation;
    }

    public async setFlightLevelBinary(item : Buffer) : Promise<void> {
        var flightLevelBinaryDecoder : FlightLevelBinaryDecoder = new FlightLevelBinaryDecoder();
        var flightLevelBinary : FlightLevelBinary = await flightLevelBinaryDecoder.decode(item);
        this.flightLevelBinary = flightLevelBinary;
    }

    public async setMeasuredHeight(item : Buffer) : Promise<void> {
        var measuredHeightDecoder : MeasuredHeightDecoder = new MeasuredHeightDecoder();
        var measuredHeight : MeasuredHeight = await measuredHeightDecoder.decode(item);
        this.measuredHeight = measuredHeight;
    }

    public async setAmplitudeOfPrimaryPlot(item : Buffer) : Promise<void> {
        var amplitudeOfPrimaryPlotDecoder : AmplitudeOfPrimaryPlotDecoder = new AmplitudeOfPrimaryPlotDecoder();
        var amplitudeOfPrimaryPlot : AmplitudeOfPrimaryPlot = await amplitudeOfPrimaryPlotDecoder.decode(item);
        this.amplitudeOfPrimaryPlot = amplitudeOfPrimaryPlot;
    }

    public async setTimeOfDay(item : Buffer) : Promise<void> {
        var timeOfDaydecoder : TimeOfDayDecoder = new TimeOfDayDecoder();
        var timeOfDay : TimeOfDay = await timeOfDaydecoder.decode(item);
        this.timeOfDay = timeOfDay;
    }

    public async setTrackNumber(item : Buffer) : Promise<void> {
        var trackNumberDecoder : TrackNumberDecoder = new TrackNumberDecoder();
        var trackNumber : TrackNumber = await trackNumberDecoder.decode(item);
        this.trackNumber = trackNumber;
    }

    public async setTrackStatus(item : Buffer) : Promise<void> {
        var trackStatusDecoder : TrackStatusDecoder = new TrackStatusDecoder();
        var trackStatus : TrackStatus = await trackStatusDecoder.decode(item);
        this.trackStatus = trackStatus;
    }
      

    public async setCalculatedTrackVelocityPolarCoordinates(item : Buffer) : Promise<void> {
        var calculatedTrackVelocityPolarCoordinatesDecoder : CalculatedTrackVelocityPolarCoordinatesDecoder = new CalculatedTrackVelocityPolarCoordinatesDecoder();
        var calculatedTrackVelocityPolarCoordinates : CalculatedTrackVelocityPolarCoordinates  = await calculatedTrackVelocityPolarCoordinatesDecoder.decode(item);
        this.calculatedTrackVelocityPolarCoordinates = calculatedTrackVelocityPolarCoordinates;
    }

    public async setCalculatedTrackVelocityCartesianCoordinates(item : Buffer) : Promise<void> {
        var calculatedTrackVelocityCartesianCoordinatesDecoder : CalculatedTrackVelocityCartesianCoordinatesDecoder = new CalculatedTrackVelocityCartesianCoordinatesDecoder();
        var calculatedTrackVelocityCartesianCoordinates : CalculatedTrackVelocityCartesianCoordinates  = await calculatedTrackVelocityCartesianCoordinatesDecoder.decode(item);
        this.calculatedTrackVelocityCartesianCoordinates = calculatedTrackVelocityCartesianCoordinates;
    }

    public async setCalculatedAcceleration(item : Buffer) : Promise<void> {
        var calculatedAccelerationDecoder : CalculatedAccelerationDecoder = new CalculatedAccelerationDecoder();
        var calculatedAcceleration : CalculatedAcceleration  = await calculatedAccelerationDecoder.decode(item);
        this.calculatedAcceleration = calculatedAcceleration;
    }

    public async setTargetAddress(item : Buffer) : Promise<void> {
        var targetAddressDecoder : TargetAddressDecoder = new TargetAddressDecoder();
        var targetAddress : TargetAddress  = await targetAddressDecoder.decode(item);
        this.targetAddress = targetAddress;
    }

    public async setTargetIdentification(item : Buffer) : Promise<void> {
        var targetIdentificationDecoder : TargetIdentificationDecoder = new TargetIdentificationDecoder();
        var targetIdentification : TargetIdentification  = await targetIdentificationDecoder.decode(item);
        this.targetIdentification = targetIdentification;
    }

    public async setModeSMBData(item : Buffer, length : number) : Promise<void> {
        var modeSMBDataDecoder : ModeSMBDataDecoder = new ModeSMBDataDecoder();
        var modeSMBData : ModeSMBData  = await modeSMBDataDecoder.decode(item, length);
        this.modeSMBData = modeSMBData;
    }
    
    public async setTargetSizeAndOrientation(item : Buffer) : Promise<void> {
        var targetSizeAndOrientationDecoder : TargetSizeAndOrientationDecoder = new TargetSizeAndOrientationDecoder();
        var targetSizeAndOrientation : TargetSizeAndOrientation  = await targetSizeAndOrientationDecoder.decode(item);
        this.targetSizeAndOrientation = targetSizeAndOrientation;
    }

    public async setPresence(item : Buffer, length : number) : Promise<void> {
        var presenceDecoder : PresenceDecoder = new PresenceDecoder();
        var presence : Presence  = await presenceDecoder.decode(item, length);
        this.presence = presence;
    }

    public async setVehicleFleetIdentification(item : Buffer) : Promise<void> {
        var vehicleFleetIdentificationDecoder : VehicleFleetIdentificationDecoder = new VehicleFleetIdentificationDecoder();
        var vehicleFleetIdentification : VehicleFleetIdentification  = await vehicleFleetIdentificationDecoder.decode(item);
        this.vehicleFleetIdentification = vehicleFleetIdentification;
    }

    public async setPreProgrammedMessage(item : Buffer) : Promise<void> {
        var preProgrammedMessageDecoder : PreProgrammedMessageDecoder = new PreProgrammedMessageDecoder();
        var preProgrammedMessage : PreProgrammedMessage  = await preProgrammedMessageDecoder.decode(item);
        this.preProgrammedMessage = preProgrammedMessage;
    }

    public async setStandardDeviationOfPosition(item : Buffer) : Promise<void> {
        var standardDeviationOfPositionDecoder : StandardDeviationOfPositionDecoder = new StandardDeviationOfPositionDecoder();
        var standardDeviationOfPosition : StandardDeviationOfPosition  = await standardDeviationOfPositionDecoder.decode(item);
        this.standardDeviationOfPosition = standardDeviationOfPosition;
    }

    public async setsystemStatus(item : Buffer) : Promise<void> {
        var systemStatusDecoder : SystemStatusDecoder = new SystemStatusDecoder();
        var systemStatus : SystemStatus  = await systemStatusDecoder.decode(item);
        this.systemStatus = systemStatus;
    }

}