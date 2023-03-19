export class Cat21Adapter {

    public async adapt(message : Buffer) : Promise<Buffer[]> {
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
        
        var items : any[] = [];
        //DataSourceIdentifier
        items.push(message.subarray(offset, offset + 2));
        offset += 2;

        //Target Report Descriptor
        let len = await this.variableItemOffset(message.subarray(offset, offset + 3), 3);
        items.push(message.subarray(offset, offset + len));
        offset += len;

        // Track Number
        if (fspec[2] === "1") {
          items.push(message.subarray(offset, offset + 2));
          offset += 2;
        }
        // Service Identification
        if (fspec[3] === "1") {
          items.push(message.subarray(offset, offset + 1));
          offset += 1;
        }
        // Time of Applicability for Position
        if (fspec[4] === "1") {
          items.push(message.subarray(offset, offset + 3));
          offset += 3;
        }
        // Position in WGS-84 coordinates
        if (fspec[5] === "1") {
          items.push(message.subarray(offset, offset + 6));
          offset += 6;
        }
        // Position in WGS-84 coordinates High Resolution
        if (fspec[6] === "1") {
          if (message.subarray(offset, offset + 8).length == 0) {
            console.log("Zero buffer");
            console.log(fspec);
            console.log(message);
          }
          items.push(message.subarray(offset, offset + 8));
          offset += 8;
        }
        // FX
        if (fspec[7] === "1") {      
          // Time of Applicability for Velocity
          if (fspec[8] === "1") {
            items.push(message.subarray(offset, offset + 3));
            offset += 3;
          }
          // Air Speed
          if (fspec[9] === "1") {
            items.push(message.subarray(offset, offset + 2));
            offset += 2;
          }
          // True Air Speed
          if (fspec[10] === "1") {
            items.push(message.subarray(offset, offset + 2));
            offset += 2;
          }
          /// Target Address
          items.push(message.subarray(offset, offset + 3));
          offset += 3;
          // Time of Message Reception of Position
          if (fspec[12] === "1") {
            items.push(message.subarray(offset, offset + 3));
            offset += 3;
          }
          // Time of Message Reception of Position-High
          if (fspec[13] === "1") {
            items.push(message.subarray(offset, offset + 4));
            offset += 4;
          }
          // Time of Message Reception of Velocity
          if (fspec[14] === "1") {
            items.push(message.subarray(offset, offset + 3));
            offset += 3;
          }
          // FX
          if (fspec[15] === "1") {
            // Time of Message Reception of Velocity-High Precision
            if (fspec[16] === "1") {
              items.push(message.subarray(offset, offset + 4));
              offset += 4;
            }
            // Geometric Height
            if (fspec[17] === "1") {
              items.push(message.subarray(offset, offset + 2));
              offset += 2;
            }
            // Quality Indicators
            let len = await this.variableItemOffset(message.subarray(offset, offset + 4), 4);
            items.push(message.subarray(offset, offset + len));
            offset += len;
            // MOPS Version
            if (fspec[19] === "1") {
              items.push(message.subarray(offset, offset + 1));
              offset += 1;
            }
            // Mode 3/A Code
            if (fspec[20] === "1") {
              items.push(message.subarray(offset, offset + 2));
              offset += 2;
            }
            // Roll Angle
            if (fspec[21] === "1") {
              items.push(message.subarray(offset, offset + 2));
              offset += 2;
            }
            // Flight Level
            if (fspec[22] === "1") {
              items.push(message.subarray(offset, offset + 2));
              offset += 2;
            }
            // FX
            if (fspec[23] === "1") {
              // Magnetic Heading     
              if (fspec[24] === "1") {
                items.push(message.subarray(offset, offset + 2));
                offset += 2;
              }
              // Target Status
              if (fspec[25] === "1") {
                items.push(message.subarray(offset, offset + 1));
                offset += 1;
              }
              // Barometric Vertical Rate
              if (fspec[26] === "1") {
                items.push(message.subarray(offset, offset + 2));
                offset += 2;
              }
              // Geometric Vertical Rate
              if (fspec[27] === "1") {
                items.push(message.subarray(offset, offset + 2));
                offset += 2;
              }
              // Airborne Ground Vector
              if (fspec[28] === "1") {
                items.push(message.subarray(offset, offset + 4));
                offset += 4;
              }
              // Track Angle Rate
              if (fspec[29] === "1") {
                items.push(message.subarray(offset, offset + 2));
                offset += 2; 
              }
              // Time of Report Transmission
              if (fspec[30] === "1") {
                items.push(message.subarray(offset, offset + 3));
                offset += 3;
              }
              // FX
              if (fspec[31] === "1") {
                // Target Identification
                if (fspec[32] === "1") {
                  items.push(message.subarray(offset, offset + 6));
                  offset += 6;
                }
                // Emitter Category
                if (fspec[33] === "1") {
                  items.push(message.subarray(offset, offset + 1));
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
                  items.push(
                    message.subarray(offset + 1, offset + selection.length * 2 + len), selection);
                  offset += selection.length * 2 + len;
                }
                // Selected Altitude
                if (fspec[35] === "1") {
                  items.push(message.subarray(offset, offset + 2));
                  offset += 2;
                }
                // Final State Selected Altitude
                if (fspec[36] === "1") {
                  items.push(message.subarray(offset, offset + 2));
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
                  items.push(message.subarray(offset + 1, offset + len + 1), tis, tid, rep);
                  offset += len + 1;
                }
                // Service Management
                if (fspec[38] === "1") {
                  items.push(message.subarray(offset, offset + 1));
                  offset += 1;
                }
                // FX
                if (fspec[39] === "1") {
                  // Aircraft Operational Status
                  if (fspec[40] === "1") {
                    items.push(message.subarray(offset, offset + 1));
                    offset += 1;
                  }
                  // Surface Capabilities and Characteristics
                  if (fspec[41] === "1") {
                    let len = await this.variableItemOffset(message.subarray(offset, offset + 2), 2);
                    items.push(message.subarray(offset, offset + len));
                    offset += len;
                  }
                  // Message Amplitude
                  if (fspec[42] === "1") {
                    items.push(message.subarray(offset, offset + 1));
                    offset += 1;
                  }
                  // Mode S MB Data
                  if (fspec[43] === "1") {
                    const len = parseInt("0x" + message.subarray(offset, offset + 1).toString("hex"));
                    items.push(message.subarray(offset + 1, offset + 1 + 8 * len), len);
                    offset += 1 + 8 * len;
                  }
                  // ACAS Resolution Advisory Report
                  if (fspec[44] === "1") {
                    items.push(message.subarray(offset, offset + 7));
                    offset += 7;
                  }
                  // Receiver ID
                  if (fspec[45] === "1") {
                    items.push(message.subarray(offset, offset + 1));
                    offset += 1;
                  }
                  // Data Ages
                  if (fspec[46] === "1") {
                    items.push(message.subarray(offset, message.length));
                    offset += len;
                  }
                }
              }
            }
          }
        }
      return items;
    }
      
  private async variableItemOffset(buffer: Buffer, max_len: number) {
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