import { Cat21 } from "../../cat21/Cat21";
import { AsyncScheduler } from "../../utils/AsyncScheduler";
import { Operator } from "../../utils/Operator";

export class Cat21Adapter {

  operator : Operator = new Operator();
  schduler : AsyncScheduler = new AsyncScheduler();
  cat21: Cat21;

  public async adapt(message : Buffer, id : number) : Promise<Cat21> {
    this.cat21 = new Cat21(id);
    console.log("ID = " + this.cat21.id);
    const fspec = BigInt("0x" + message.subarray(3, 10).toString("hex"))
    .toString(2)
    .padStart(7 * 8, "0")
    .split("");
    
    let count = 7;
    let found = false;
    let offset = fspec.filter((value, index) => {
        if (index == count && !found) {
            if (value != "1") {
                found = true;
            } else {
                count += 8;
            }
            return true;
        }
        return;
        }).length + 3;
    
    //DataSourceIdentifier
    var dataSourceIdentifier = message.subarray(offset, offset + 2);
    this.schduler.addOperation(this.cat21.setDataSourceIdentifier(dataSourceIdentifier));
    offset += 2;

    //Target Report Descriptor
    let len = this.variableItemOffset(message.subarray(offset, offset + 3), 3);
    var targetReportDescriptor = message.subarray(offset, offset + len);
    this.schduler.addOperation(this.cat21.setTargetReporDesriptor(targetReportDescriptor))
    offset += len;

    // Track Number
    if (fspec[2] === "1") {
      var trackNumber = message.subarray(offset, offset + 2);
      this.schduler.addOperation(this.cat21.setTrackNumber(trackNumber));
      offset += 2;
    }
    // Service Identification
    if (fspec[3] === "1") {
      var serviceIdentification = message.subarray(offset, offset + 1);
      this.schduler.addOperation(this.cat21.setServiceIdentification(serviceIdentification));
      offset += 1;
    }
    // Time of Applicability for Position
    if (fspec[4] === "1") {
      var timeofApplicabilityforPosition = message.subarray(offset, offset + 3);
      this.schduler.addOperation(this.cat21.setTimeofApplicabilityforPosition(timeofApplicabilityforPosition));
      offset += 3;
    }
    // Position in WGS-84 coordinates
    if (fspec[5] === "1") {
      var positioninWGS84Coordinates = message.subarray(offset, offset + 6);
      this.schduler.addOperation(this.cat21.setPositioninWGS84Coordinates(positioninWGS84Coordinates));
      offset += 6;
    }
    // Position in WGS-84 coordinates High Resolution
    if (fspec[6] === "1") {
      if (message.subarray(offset, offset + 8).length == 0) {
        console.log("Zero buffer");
        console.log(fspec);
        //console.log(message);
      }
      var highResolutionPositioninWGS84Coordinates = message.subarray(offset, offset + 8);
      this.schduler.addOperation(this.cat21.setHighResPositionPositioninWGS84Coordinates(highResolutionPositioninWGS84Coordinates));
      offset += 8;
    }
    // FX
    if (fspec[7] === "1") {      
      // Time of Applicability for Velocity
      if (fspec[8] === "1") {
        var timeofApplicabilityforVelocity = message.subarray(offset, offset + 3);
        this.schduler.addOperation(this.cat21.setTimeofApplicabilityforVelocity(timeofApplicabilityforVelocity));
        offset += 3;
      }
      // Air Speed
      if (fspec[9] === "1") {
        var airSpeed = message.subarray(offset, offset + 2);
        this.schduler.addOperation(this.cat21.setAirSpeed(airSpeed));
        offset += 2;
      }
      // True Air Speed
      if (fspec[10] === "1") {
        var trueAirSpeed = message.subarray(offset, offset + 2);
        this.schduler.addOperation(this.cat21.setTrueAirSpeed(trueAirSpeed));
        offset += 2;
      }
      /// Target Address
      var targetAddress = message.subarray(offset, offset + 3);
      this.schduler.addOperation(this.cat21.setTargetAddress(targetAddress));
      offset += 3;
      
      // Time of Message Reception of Position
      if (fspec[12] === "1") {
        var timeofMessageReceptionofPosition = message.subarray(offset, offset + 3);
        this.schduler.addOperation(this.cat21.setTimeofMessageReceptionofPosition(timeofMessageReceptionofPosition));
        offset += 3;
      }
      // Time of Message Reception of Position-High
      if (fspec[13] === "1") {
        var timeofMessageReceptionofPosition_highPres = message.subarray(offset, offset + 4);
        this.schduler.addOperation(this.cat21.setTimeofMessageReceptionofPositionHighPres(timeofMessageReceptionofPosition_highPres));
        offset += 4;
      }
      // Time of Message Reception of Velocity
      if (fspec[14] === "1") {
        var timeofMessageReceptionofVelocity = message.subarray(offset, offset + 3);
        this.schduler.addOperation(this.cat21.setTimeofMessageReceptionofVelocity(timeofMessageReceptionofVelocity));
        offset += 3;
      }
      // FX
      if (fspec[15] === "1") {
        // Time of Message Reception of Velocity-High Precision
        if (fspec[16] === "1") {
          var timeofMessageReceptionofVelocity_highPres = message.subarray(offset, offset + 4);
          this.schduler.addOperation(this.cat21.setTimeofMessageReceptionofVelocity_HighPres(timeofMessageReceptionofVelocity_highPres));
          offset += 4;
        }
        // Geometric Height
        if (fspec[17] === "1") {
          var geometricHeight = message.subarray(offset, offset + 2);
          this.schduler.addOperation(this.cat21.setGeometricHeight(geometricHeight));
          offset += 2;
        }
        // Quality Indicators
        let len = this.variableItemOffset(message.subarray(offset, offset + 4), 4);
        var qualityIndicator = message.subarray(offset, offset + len);
        this.schduler.addOperation(this.cat21.setQualityIndicators(qualityIndicator));
        offset += len;
        // MOPS Version
        if (fspec[19] === "1") {
          var mopsVersion = message.subarray(offset, offset + 1);
          this.schduler.addOperation(this.cat21.setMOPSVersion(mopsVersion));
          offset += 1;
        }
        // Mode 3/A Code
        if (fspec[20] === "1") {
          var mode3A = message.subarray(offset, offset + 2);
          this.schduler.addOperation(this.cat21.setMode3A(mode3A));
          offset += 2;
        }
        // Roll Angle
        if (fspec[21] === "1") {
          var rollAngle = message.subarray(offset, offset + 2);
          this.schduler.addOperation(this.cat21.setRollAngle(rollAngle));
          offset += 2;
        }
        // Flight Level
        if (fspec[22] === "1") {
          var flightLevel = message.subarray(offset, offset + 2);
          this.schduler.addOperation(this.cat21.setFlightLevel(flightLevel));
          offset += 2;
        }
        // FX
        if (fspec[23] === "1") {
          // Magnetic Heading     
          if (fspec[24] === "1") {
            var magneticHeading = message.subarray(offset, offset + 2);
            this.schduler.addOperation(this.cat21.setMagneticHeading(magneticHeading));
            offset += 2;
          }
          // Target Status
          if (fspec[25] === "1") {
            var targetStatus = message.subarray(offset, offset + 1);
            this.schduler.addOperation(this.cat21.setTargetStatus(targetStatus));
            offset += 1;
          }
          // Barometric Vertical Rate
          if (fspec[26] === "1") {
            var barometricVerticalRate = message.subarray(offset, offset + 2);
            this.schduler.addOperation(this.cat21.setBarometricVerticalRate(barometricVerticalRate));
            offset += 2;
          }
          // Geometric Vertical Rate
          if (fspec[27] === "1") {
            var geometricVerticalRate = message.subarray(offset, offset + 2);
            this.schduler.addOperation(this.cat21.setGeometricVerticalRate(geometricVerticalRate));
            offset += 2;
          }
          // Airborne Ground Vector
          if (fspec[28] === "1") {
            var airborneGroundVector = message.subarray(offset, offset + 4);
            this.schduler.addOperation(this.cat21.setAirborneGroundVector(airborneGroundVector));
            offset += 4;
          }
          // Track Angle Rate
          if (fspec[29] === "1") {
            var trackAngleRate = message.subarray(offset, offset + 2);
            this.schduler.addOperation(this.cat21.setTrackAngleRate(trackAngleRate));
            offset += 2; 
          }
          // Time of Report Transmission
          if (fspec[30] === "1") {
            var timeofReportTransmission = message.subarray(offset, offset + 3);
            this.schduler.addOperation(this.cat21.setTimeofReportTransmission(timeofReportTransmission));
            offset += 3;
          }
          // FX
          if (fspec[31] === "1") {
            // Target Identification
            if (fspec[32] === "1") {
              var targetIdentification = message.subarray(offset, offset + 6);
              this.schduler.addOperation(this.cat21.setTargetIdentification(targetIdentification));
              offset += 6;
            }
            // Emitter Category
            if (fspec[33] === "1") {
              var emitterCategory = message.subarray(offset, offset + 1);
              this.schduler.addOperation(this.cat21.setEmitterCategory(emitterCategory));
              offset += 1;
            }
            // Met Information
            if (fspec[34] === "1") {
              let selection: string[] = [];
              let len = 1;
              BigInt("0x" + message.toString("hex"))
                .toString(2)
                .padStart(8, "0")
                .split("")
                .forEach((value, index) => {
                  switch (index) {
                    case 0:
                      if (value === "1") {
                        selection.push("WS");
                      }
                      break;
                    case 1:
                      if (value === "1") {
                        selection.push("WD");
                      }
                      break;
                    case 2:
                      if (value === "1") {
                        selection.push("TMP");
                      }
                      break;
                    case 3:
                      if (value === "1") {
                        selection.push("TRB");
                        len--;
                      }
                      break;
                  }
                });
              //items.push(
                //message.subarray(offset + 1, offset + selection.length * 2 + len), selection);
              var metInformation = message.subarray(offset + 1, offset + selection.length * 2 + len);
              this.schduler.addOperation(this.cat21.setMetInformation(metInformation, selection));
              offset += selection.length * 2 + len;
            }
            // Selected Altitude
            if (fspec[35] === "1") {
              var selectedAltitude = message.subarray(offset, offset + 2);
              this.schduler.addOperation(this.cat21.setSelectedAltutude(selectedAltitude));
              offset += 2;
            }
            // Final State Selected Altitude
            if (fspec[36] === "1") {
              var finalStateSelectedAltitude = message.subarray(offset, offset + 2);
              this.schduler.addOperation(this.cat21.setFinalStateSelectedAltitude(finalStateSelectedAltitude));
              offset += 2;
            }
            // Trajectory Intent
            if (fspec[37] === "1") {
              const bits = BigInt("0x" + message.subarray(offset, offset + 1).toString("hex"))
                .toString(2)
                .padStart(8, "0")
                .split("");
              let len = 0;
              let tis = false;
              let tid = false;
              var rep = 0;
              if (bits[0] === "1") {
                len++;
                tis = true;
              }
              if (bits[1] === "1") {
                rep = parseInt("0x" + message.subarray(offset + 1 + len, offset + 2 + len).toString("hex"));
                len += 15 * rep;
                tid = true;
              }
              var trajectoryIntent = message.subarray(offset + 1, offset + len + 1);
              //items.push(message.subarray(offset + 1, offset + len + 1), tis, tid, rep);
              this.schduler.addOperation(this.cat21.setTrajectoryIntent(trajectoryIntent, tis, tid, rep));
              offset += len + 1;
            }
            // Service Management
            if (fspec[38] === "1") {
              var serviceManagement = message.subarray(offset, offset + 1);
              this.schduler.addOperation(this.cat21.setServiceManagement(serviceManagement));
              offset += 1;
            }
            // FX
            if (fspec[39] === "1") {
              // Aircraft Operational Status
              if (fspec[40] === "1") {
                var aircraftOperationalStatus = message.subarray(offset, offset + 1);
                this.schduler.addOperation(this.cat21.setAircraftOperationalStatus(aircraftOperationalStatus));
                offset += 1;
              }
              // Surface Capabilities and Characteristics
              if (fspec[41] === "1") {
                let len = await this.variableItemOffset(message.subarray(offset, offset + 2), 2);
                var surfaCapabilitiesandCharacteristics = message.subarray(offset, offset + len);
                this.schduler.addOperation(this.cat21.setSurfaceCapabilitiesandCharacteristics(surfaCapabilitiesandCharacteristics));
                offset += len;
              }
              // Message Amplitude
              if (fspec[42] === "1") {
                var messageAmplitude = message.subarray(offset, offset + 1);
                this.schduler.addOperation(this.cat21.setMessageAmplitude(messageAmplitude));
                offset += 1;
              }
              // Mode S MB Data
              if (fspec[43] === "1") {
                const rep = parseInt("0x" + message.subarray(offset, offset + 1).toString("hex"));
                var modeSMBData = message.subarray(offset + 1, offset + 1 + 8 * rep);
                this.schduler.addOperation(this.cat21.setModeSMBData(modeSMBData, rep));
                offset += 1 + 8 * rep;
              }
              // ACAS Resolution Advisory Report
              if (fspec[44] === "1") {
                var acasResolutionAdvisoryReport = message.subarray(offset, offset + 7);
                this.schduler.addOperation(this.cat21.setACASResolutionAdvisoryReport(acasResolutionAdvisoryReport));
                offset += 7;
              }
              // Receiver ID
              if (fspec[45] === "1") {
                var receiverID = message.subarray(offset, offset + 1);
                this.schduler.addOperation(this.cat21.setReceiverID(receiverID));
                offset += 1;
              }
              // Data Ages
              if (fspec[46] === "1") {
                var dataAges = message.subarray(offset, message.length);
                this.schduler.addOperation(this.cat21.setDataAges(dataAges));
                offset += len;
              }
            }
          }
        }
      }
    }
    await this.schduler.execute();
    
    console.log("ID2 = " + this.cat21.id);
    return this.cat21;
  }
    
  private variableItemOffset(buffer: Buffer, max_len: number) {
    const bits = BigInt("0x" + buffer.toString("hex"))
      .toString(2)
      .padStart(max_len * 8, "0")
      .split("");

    let count = 7;
    let found = false;
    let offset = bits.filter((value, index) => {
      if (index == count && !found) {
        if (value != "1") {
          found = true;
        } else {
          count += 8;
        }
        return true;
      }
      return;
    }).length;
    return offset;
  }

  }