import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import { loadGraphicsLayer } from "./graphicsLayer";
import { loadGroundLayer } from "./groundLayer";
import { loadAreasLayer } from "./areasLayer";
import Point from "@arcgis/core/geometry/Point";

export function initializeMap() {
  setTimeout(initMap, 500);
}
let view: SceneView;
function initMap() {
  view = new SceneView({
    // An instance of Map or WebScene
    map: new Map({
      basemap: "dark-gray-vector",
      ground: "world-elevation-3d",
    }),
    camera: {
      heading: 330,
      position: {
        // observation point
        latitude: 41.2819,
        longitude: 2.0955,
        z: 9000, // zoom level
      },
      tilt: 10, // perspective in degrees
    },
    viewingMode: "global",
    //  spatialReference: SpatialReference.WGS84,

    // The id of a DOM element (may also be an actual DOM element)
    container: "viewDiv",
  });

  view.when(() => {
    loadAreasLayer(view.map);
    loadGraphicsLayer(view.map);
    loadGroundLayer(view.map);
  });
}

export async function flyTo(p: Point) {
  const newP = new Point();
  const ground = await view.map.ground.queryElevation(p);
  const groundgeom = ground.geometry as Point;

  newP.z = p.z + 300 + groundgeom.z;
  newP.y = p.y - 0.004;
  newP.x = p.x;

  view.goTo({ position: newP, heading: 0, tilt: 50 });
}