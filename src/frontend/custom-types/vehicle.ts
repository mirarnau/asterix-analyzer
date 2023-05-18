import type Graphic from "@arcgis/core/Graphic";
import type { Cat21 } from "../../electron/cat21/Cat21";

export interface Airplane {
  latitude: number;
  longitude: number;
  level: number; // Flight Level
  geometric_height: number; //ft
  target_identification: string;
  target_address: string;
  graphic: Graphic | undefined;
  pathGraphic: Graphic | undefined;
  heading: number;

  adsb_msgs: Cat21[];
}