import { AmplitudeOfPrimaryPlotDecoder } from "./decoders/AmplitudeOfPrimaryPlotDecoder";
import { DataSourceIdentifierDecoder } from "./decoders/DataSourceIdentifierDecoder";
import { FlightLevelBinaryDecoder } from "./decoders/FlightLevelBinaryDecoder";
import { MeasuredHeightDecoder } from "./decoders/MeasuredHeightDecoder";
import { MeasuredPositionPolarCoordinatesDecoder } from "./decoders/MeasuredPositionPolarCoordinatesDecoder";
import { MessageTypeDecoder } from "./decoders/MessageTypeDecoder";
import { Mode3ACodeOctalRepresentationDecoder } from "./decoders/Mode3ACodeOctalRepresentationDecoder";
import { PositionCartesianCoordinatesDecoder } from "./decoders/PositionCartesianCoordinatesDecoder";
import { PositionWG84CoordinatesDecoder } from "./decoders/PositionWGS84CoordinatesDecoder";
import { TargetReportDescriptorDecoder } from "./decoders/TargetReportDescriptorDecoder";
import { TimeOfDayDecoder } from "./decoders/TimeOfDayDecoder";
import { TrackNumberDecoder } from "./decoders/TrackNumberDecoder";
import { TrackStatusDecoder } from "./decoders/TrackStatusDecoder";
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
    calculatedacceleration : CalculatedAcceleration;
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
    
}