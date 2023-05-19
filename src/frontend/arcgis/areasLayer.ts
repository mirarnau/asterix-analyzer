import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import type ArcGISMap from "@arcgis/core/Map";
import Polygon from "@arcgis/core/geometry/Polygon";

let areasLayer: GraphicsLayer;

const fillSymbolRWY = {
  type: "simple-fill", 
  color: [0, 255, 247, 0.3],
  outline: {
    color: [0, 255, 247],
    width: 0.5,
  },
};

const fillSymbolThreshold = {
  type: "simple-fill", 
  color: [255, 255, 0, 0.3],
  outline: {
    color: [0, 255, 247],
    width: 0.5,
  },
};

export function loadAreasLayer(map: ArcGISMap) {
  const rwy06R = new Graphic({
    symbol: fillSymbolRWY,
    geometry: new Polygon({
      rings: [
        [
          [2.073544428747862, 41.282322777493, 0],
          [2.1038044835174534, 41.292695924731504, 0],
          [2.104090847313795, 41.29222048305417, 0],
          [2.07382476073992, 41.28186917069003, 0],
          [2.073544428747862, 41.282322777493, 0],
        ],
      ],
    }),
  });

  const rwy06L = new Graphic({
    symbol: fillSymbolRWY,
    geometry: new Polygon({
      rings: [
        [
          [2.065580784730532, 41.29305232485694, 0],
          [2.1049044795464513, 41.30645156655545, 0],
          [2.1052273721378163, 41.305915116490716, 0],
          [2.0659512374753133, 41.29242934718271, 0],
          [2.065580784730532, 41.29305232485694, 0],
        ],
      ],
    }),
  });

  const rwy20 = new Graphic({
    symbol: fillSymbolRWY,
    geometry: new Polygon({
      rings: [
        [
          [2.094497120222143, 41.30954117409855, 0],
          [2.0950813004192828, 41.309381976193684, 0],
          [2.0849565195353246, 41.287409333392745, 0],
          [2.084454624379581, 41.28753586595036, 0],
          [2.094497120222143, 41.30954117409855, 0],
        ],
      ],
    }),
  });

  const thresholdRwy06R = new Graphic({
    symbol: fillSymbolThreshold,
    geometry: new Polygon({
      rings: [
        [
          [2.0732979029761642, 41.28224134602138, 0],
          [2.0755151495146293, 41.28300687827166, 0],
          [2.075805308831857, 41.28252233629394, 0],
          [2.0735830568687006, 41.281771289107695, 0],
          [2.0732979029761642, 41.28224134602138, 0]
        ],
      ],
    }),
  });

  areasLayer = new GraphicsLayer({
    elevationInfo: { mode: "on-the-ground" },
  });

  areasLayer.addMany([
    rwy06R,
    rwy06L,
    rwy20,
    thresholdRwy06R
  ]);

  map.add(areasLayer);
}

export function setAreasLayerVisibility(b: boolean) {
  areasLayer.visible = b;
}