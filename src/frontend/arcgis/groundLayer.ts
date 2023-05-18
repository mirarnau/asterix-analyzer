import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

import type ArcGISMap from "@arcgis/core/Map";
import type { Cat10 } from "../../electron/cat10/Cat10";
import type { Cat21 } from "../../electron/cat21/Cat21";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import { computeDestinationPoint } from "geolib";

let groundLayerSmr: GraphicsLayer;
let groundLayerMlat: GraphicsLayer;
let groundLayerAdsb: GraphicsLayer;

const popupTemplateSMR = {
  title: "SMR point {id}",
  content: [
    {
      type: "fields",
      fieldInfos: [
        {
          fieldName: "id",
          label: "Id",
        },
        {
          fieldName: "class",
          label: "Class",
        },
        {
          fieldName: "instrument",
          label: "Instrument",
        },
        {
          fieldName: "time_of_day",
          label: "Time Of Day",
        },
        {
          fieldName: "data_source_identifier",
          label: "Data Source Identifier",
        },
        {
          fieldName: "latitude",
          label: "Latitude",
        },
        {
          fieldName: "longitude",
          label: "Longitude",
        },
        {
          fieldName: "cartesian_coordinate_x",
          label: "Cartesian Coordinate X",
        },
        {
          fieldName: "cartesian_coordinate_y",
          label: "Cartesian Coordinate Y",
        },
        {
          fieldName: "polar_coordinates_r",
          label: "Polar Coordinate R",
        },
        {
          fieldName: "polar_coordinates_theta",
          label: "Polar Coordinate Theta",
        },
      ],
    },
  ],
};

const popupTemplateMLAT = {
  title: "MLAT point {id}",
  content: [
    {
      type: "fields",
      fieldInfos: [
        {
          fieldName: "id",
          label: "Id",
        },
        {
          fieldName: "class",
          label: "Class",
        },
        {
          fieldName: "instrument",
          label: "Instrument",
        },
        {
          fieldName: "time_of_day",
          label: "Time Of Day",
        },
        {
          fieldName: "target_address",
          label: "Target Address",
        },
        {
          fieldName: "data_source_identifier",
          label: "Data Source Identifier",
        },
        {
          fieldName: "latitude",
          label: "Latitude",
        },
        {
          fieldName: "longitude",
          label: "Longitude",
        },
        {
          fieldName: "cartesian_coordinate_x",
          label: "Cartesian Coordinate X",
        },
        {
          fieldName: "cartesian_coordinate_y",
          label: "Cartesian Coordinate Y",
        },
        {
          fieldName: "track_number",
          label: "Track Number",
        },
      ],
    },
  ],
};

const popupTemplateADSB = {
  title: "ADS-B point {id} from {target_identification}",
  content: [
    {
      type: "fields",
      fieldInfos: [
        {
          fieldName: "id",
          label: "Id",
        },
        {
          fieldName: "class",
          label: "Class",
        },
        {
          fieldName: "instrument",
          label: "Instrument",
        },
        {
          fieldName: "time_ASTERIX_report_transmission",
          label: "Time of ASTERIX report transmission",
        },
        {
          fieldName: "target_identification",
          label: "Target Identification",
        },
        {
          fieldName: "target_address",
          label: "Target Address",
        },
        {
          fieldName: "data_source_identifier",
          label: "Data Source Identifier",
        },
        {
          fieldName: "latitude",
          label: "Latitude",
        },
        {
          fieldName: "longitude",
          label: "Longitude",
        },
        {
          fieldName: "flight_level",
          label: "Flight Level",
        },
        {
          fieldName: "geometric_height",
          label: "Geometric Height",
        },
      ],
    },
  ],
};

const graphicMap: Map<number, Graphic> = new Map();

const symbolConstSMR = new SimpleMarkerSymbol({
  style: "circle",
  color: "#fe0000",
});

const symbolConstMLAT = new SimpleMarkerSymbol({
  style: "circle",
  color: "#ffeb16",
});

const symbolSMR = new SimpleMarkerSymbol({
  style: "circle",
  color: "#fe0000",
  size: 4,
});

const symbolMLAT = new SimpleMarkerSymbol({
  style: "circle",
  color: "#ffeb16",
  size: 4,
});

const symbolADSB = new SimpleMarkerSymbol({
  style: "circle",
  color: "#6733bb",
  size: 4,
});

export function loadGroundLayer(map: ArcGISMap) {
  const graphicsmr = new Graphic({
    geometry: new Point({
      latitude: 41.29561833,
      longitude: 2.095114167,
    }),
    symbol: symbolConstSMR,
    attributes: { sic: 7 },
    popupTemplate: {
      title: "LEBL SMR Instrument",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "sic",
              label: "SIC",
            },
          ],
        },
      ],
    },
  });

  const graphicmlat = new Graphic({
    geometry: new Point({ latitude: 41.29706278, longitude: 2.078447222 }),
    symbol: symbolConstMLAT,
    attributes: { sic: 107 },
    popupTemplate: {
      title: "LEBL MLAT Logical Reference Point",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "sic",
              label: "SIC",
            },
          ],
        },
      ],
    },
  });

  groundLayerSmr = new GraphicsLayer({ elevationInfo: { mode: "on-the-ground" } });
  groundLayerMlat = new GraphicsLayer({ elevationInfo: { mode: "on-the-ground" } });
  groundLayerAdsb = new GraphicsLayer({ elevationInfo: { mode: "on-the-ground" } });

  const constLayer = new GraphicsLayer();
  constLayer.elevationInfo = { mode: "on-the-ground" };

  //constLayer.addMany([graphicsmr, graphicmlat]);
  // let sketch = new Sketch({
  //   layer: constLayer,
  //   view: view,
  // });

  // sketch.on("create", function (event) {
  //   // check if the create event's state has changed to complete indicating
  //   // the graphic create operation is completed.
  //   if (event.state === "complete") {
  //     // remove the graphic from the layer. Sketch adds
  //     // the completed graphic to the layer by default.
  //     console.log(event.graphic);
  //   }
  // });

  // view.ui.add(sketch, { position: "top-right" });

  map.add(groundLayerSmr);
  map.add(groundLayerMlat);
  map.add(groundLayerAdsb);
  map.add(constLayer);
}

export function createGraphicSMR(msg: Cat10) {
  if (!msg.positionCartesianCoordinates) return;

  const target_pos = computeDestinationPoint(
    { latitude: 41.29561833, longitude: 2.095114167 },
    msg.measuredPositionPolarCoordinates.rho,
    msg.measuredPositionPolarCoordinates.theta
  );
  const newPoint = new Point({
    spatialReference: SpatialReference.WGS84,
    latitude: target_pos.latitude,
    longitude: target_pos.longitude,
  });

  const newGraphic = new Graphic({
    geometry: newPoint,
    symbol: symbolSMR,
    popupTemplate: popupTemplateSMR,
    attributes: {
      id: msg.id,
      class: msg.class,
      instrument: msg.measurementInstrument,
      time_of_day: new Date(msg.timeOfDay.timestamp * 1000).toISOString().substring(11, 23),
      data_source_identifier: `SIC: ${msg.dataSourceIdentifier.sic}; SAC: ${msg.dataSourceIdentifier.sac}`,
      cartesian_coordinate_x: `${msg.positionCartesianCoordinates.x}`,
      cartesian_coordinate_y: `${msg.positionCartesianCoordinates.y}`,
      polar_coordinates_r: `${msg.measuredPositionPolarCoordinates.rho}`,
      polar_coordinates_theta: `${msg.measuredPositionPolarCoordinates.theta}`,
      latitude: target_pos.latitude,
      longitude: target_pos.longitude,
    },
  });

  graphicMap.set(msg.id, newGraphic);
  groundLayerSmr.add(newGraphic);
}

export function createGraphicMLAT(msg: Cat10) {
  if (!msg.positionCartesianCoordinates) return;

  const target_pos = computeDestinationPoint(
    { latitude: 41.29706278, longitude: 2.078447222 },
    Math.sqrt(Math.pow(msg.positionCartesianCoordinates.x, 2) + Math.pow(msg.positionCartesianCoordinates.y, 2)),
    (Math.atan2(msg.positionCartesianCoordinates.x, msg.positionCartesianCoordinates.y) * 180) / Math.PI
  );
  const newPoint = new Point({
    spatialReference: SpatialReference.WGS84,
    latitude: target_pos.latitude,
    longitude: target_pos.longitude,
  });

  const newGraphic = new Graphic({
    geometry: newPoint,
    symbol: symbolMLAT,
    popupTemplate: popupTemplateMLAT,
    attributes: {
      id: msg.id,
      class: msg.class,
      instrument: msg.measurementInstrument,
      time_of_day: new Date(msg.timeOfDay.timestamp * 1000).toISOString().substring(11, 23),
      target_address: msg.targetAddress.value,
      data_source_identifier: `SIC: ${msg.dataSourceIdentifier.sic}; SAC: ${msg.dataSourceIdentifier.sac}`,
      cartesian_coordinate_x: `${msg.positionCartesianCoordinates.x}`,
      cartesian_coordinate_y: `${msg.positionCartesianCoordinates.y}`,
      track_number: msg.trackNumber.value,

      latitude: target_pos.latitude,
      longitude: target_pos.longitude,
    },
  });
  graphicMap.set(msg.id, newGraphic);
  groundLayerMlat.add(newGraphic);
}

export function createGraphicADSB(msg: Cat21) {
  if (!msg.positioninWGS84Coordinates) return;

  const newPoint = new Point({
    spatialReference: SpatialReference.WGS84,
    latitude: msg.positioninWGS84Coordinates.latitude,
    longitude: msg.positioninWGS84Coordinates.longitude,
  });

  const newGraphic = new Graphic({
    geometry: newPoint,
    symbol: symbolADSB,
    popupTemplate: popupTemplateADSB,
    attributes: {
      id: msg.id,
      class: msg.class,
      instrument: msg.measurementInstrument,
      time_ASTERIX_report_transmission: msg.timeofReportTransmission
        ? new Date(msg.timeofReportTransmission.time * 1000)
            .toISOString()
            .substring(11, 23)
        : null,
      target_address: msg.targetAddress ? msg.targetAddress.value : null,
      target_identification: msg.targetIdentification ? msg.targetIdentification.data : null,
      data_source_identifier: msg.dataSourceIdentifier
        ? `SIC: ${msg.dataSourceIdentifier.sic}; SAC: ${msg.dataSourceIdentifier.sac}`
        : null,
      barometric_vertical_rate: msg.barometricVerticalRate ? msg.barometricVerticalRate.value : null,
      flight_level: msg.flightLevel ? msg.flightLevel.fligthLevel : null,
      geometric_height: msg.geometricHeight ? msg.geometricHeight.geometricHeight : null,
      latitude: msg.positioninWGS84Coordinates ? msg.positioninWGS84Coordinates.latitude : null,
      longitude: msg.positioninWGS84Coordinates ? msg.positioninWGS84Coordinates.longitude : null,
    },
  });
  graphicMap.set(msg.id, newGraphic);
  groundLayerAdsb.add(newGraphic);
  
}

export function setSMRVisibility(b: boolean) {
  groundLayerSmr.visible = b;
}

export function setMLATVisibility(b: boolean) {
  groundLayerMlat.visible = b;
}

export function setADSBVisibility(b: boolean) {
  groundLayerAdsb.visible = b;
}

export function deleteGraphicSMR(msg: Cat10 | Cat21) {
  if (graphicMap.has(msg.id)) {
    groundLayerSmr.remove(graphicMap.get(msg.id)!);
    graphicMap.delete(msg.id);
  }
}

export function deleteGraphicMLAT(msg: Cat10 | Cat21) {
  if (graphicMap.has(msg.id)) {
    groundLayerMlat.remove(graphicMap.get(msg.id)!);
    graphicMap.delete(msg.id);
  }
}

export function deleteGraphicADSB(msg: Cat10 | Cat21) {
  if (graphicMap.has(msg.id)) {
    groundLayerAdsb.remove(graphicMap.get(msg.id)!);
    graphicMap.delete(msg.id);
  }
}

export function clearMap() {
  groundLayerSmr.removeAll();
  groundLayerMlat.removeAll();
  groundLayerAdsb.removeAll();
  graphicMap.clear();
}