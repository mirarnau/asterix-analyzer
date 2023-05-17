import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import type ArcGISMap from "@arcgis/core/Map";
import Polygon from "@arcgis/core/geometry/Polygon";

let areasLayer: GraphicsLayer;

const fillSymbolRWY = {
  type: "simple-fill", // autocasts as new SimpleFillSymbol()
  color: [227, 139, 79, 0.8],
  outline: {
    // autocasts as new SimpleLineSymbol()
    color: [255, 255, 255],
    width: 2,
  },
};

const fillSymbolApron = {
  type: "simple-fill", // autocasts as new SimpleFillSymbol()
  color: [255, 0, 0, 0.6],
  outline: {
    // autocasts as new SimpleLineSymbol()
    color: [255, 255, 255],
    width: 2,
  },
};

const fillSymbolTaxi = {
  type: "simple-fill", // autocasts as new SimpleFillSymbol()
  color: [0, 255, 0, 0.6],
  outline: {
    // autocasts as new SimpleLineSymbol()
    color: [255, 255, 255],
    width: 2,
  },
};

const fillSymbolStand = {
  type: "simple-fill", // autocasts as new SimpleFillSymbol()
  color: [51, 51, 51, 0.8],
  outline: {
    // autocasts as new SimpleLineSymbol()
    color: [255, 255, 255],
    width: 2,
  },
};

const fillSymbolAirbone = {
  type: "simple-fill", // autocasts as new SimpleFillSymbol()
  color: [103, 51, 187, 0.6],
  outline: {
    // autocasts as new SimpleLineSymbol()
    color: [255, 255, 255],
    width: 2,
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

  const apronWest = new Graphic({
    symbol: fillSymbolApron,
    geometry: new Polygon({
      rings: [
        [
          [2.07340839679361, 41.28424861643785, 0],
          [2.0722924007516537, 41.2846495216228, 0],
          [2.0692939942631576, 41.2896632686916, 0],
          [2.0670082812056854, 41.28888138929966, 0],
          [2.0651771657363462, 41.28964539289708, 0],
          [2.075362085809489, 41.29297348683743, 0],
          [2.076448935543488, 41.29108651682509, 0],
          [2.083076000127197, 41.29337438277837, 0],
          [2.0838794285793614, 41.29227393381803, 0],
          [2.0820426211857592, 41.2870759464837, 0],
          [2.07340839679361, 41.28424861643785, 0],
        ],
      ],
    }),
  });

  const apronTop = new Graphic({
    symbol: fillSymbolApron,
    geometry: new Polygon({
      rings: [
        [
          [2.0695459488873227, 41.300539704361, 0],
          [2.070951809448399, 41.3009843477467, 0],
          [2.073740845317415, 41.299798907935326, 0],
          [2.0846029382171016, 41.30328627826634, 0],
          [2.084890978468265, 41.30275966925683, 0],
          [2.0723141678681607, 41.29877235876488, 0],
          [2.0695459488873227, 41.300539704361, 0],
        ],
      ],
    }),
  });

  const apronEast = new Graphic({
    symbol: fillSymbolApron,
    geometry: new Polygon({
      rings: [
        [
          [2.0878639036224214, 41.30589472786412, 0],
          [2.090134405263308, 41.30668795416331, 0],
          [2.0903541337159455, 41.306284210906554, 0],
          [2.0897225914200805, 41.3045567489771, 0],
          [2.0888586949139425, 41.30426039882101, 0],
          [2.0878639036224214, 41.30589472786412, 0],
        ],
      ],
    }),
  });

  const taxi = new Graphic({
    symbol: fillSymbolTaxi,
    geometry: new Polygon({
      rings: [
        [
          [2.058898168373926, 41.29204493396387, 0],
          [2.057556506319483, 41.29401047267355, 0],
          [2.084893054138535, 41.30273980283841, 0],
          [2.0848339122555495, 41.30286966146069, 0],
          [2.0897439375797595, 41.30454743823659, 0],
          [2.0919446267453625, 41.30956587579721, 0],
          [2.093345528722446, 41.31007976477602, 0],
          [2.0940260605946044, 41.31014059449381, 0],
          [2.0943958199346997, 41.309484582752184, 0],
          [2.0926148217927416, 41.30545981970179, 0],
          [2.1018078858594147, 41.30866967423334, 0],
          [2.100578817583161, 41.31055353797318, 0],
          [2.0997468962579604, 41.31040270888631, 0],
          [2.0974558467329016, 41.31048184674368, 0],
          [2.096676960843721, 41.31124922110484, 0],
          [2.0948325322535934, 41.311648072190344, 0],
          [2.0940219730429854, 41.3101586056726, 0],
          [2.093349394740845, 41.310095373025796, 0],
          [2.09454489441944, 41.31215787218275, 0],
          [2.1003221607670013, 41.311060161604516, 0],
          [2.103400160883264, 41.3116790844715, 0],
          [2.1025101496560645, 41.30878595591344, 0],
          [2.103816738112214, 41.308408846200074, 0],
          [2.1061275635375716, 41.30456022123433, 0],
          [2.1053653631591565, 41.30305453158963, 0],
          [2.086560036641853, 41.29662344568625, 0],
          [2.085712522071191, 41.296226001283344, 0],
          [2.0859740988769477, 41.29554745934924, 0],
          [2.0895738950953304, 41.289815072178385, 0],
          [2.0897859294185084, 41.28983605793412, 0],
          [2.099026489388453, 41.29294823410928, 0],
          [2.0992023632588697, 41.29312674726655, 0],
          [2.100905648627836, 41.293726968733196, 0],
          [2.10163777663574, 41.293959373002984, 0],
          [2.1020097583615516, 41.293977670233204, 0],
          [2.102689994259114, 41.293854750910164, 0],
          [2.102894849995388, 41.29373721750032, 0],
          [2.103550169913081, 41.29261076177145, 0],
          [2.0735327121303966, 41.28232376163093, 0],
          [2.0729432724858508, 41.2832949287332, 0],
          [2.0729904439340063, 41.283719599405025, 0],
          [2.073406291476514, 41.28424681162829, 0],
          [2.0820250861807517, 41.28708247490496, 0],
          [2.083891107262406, 41.29224143867939, 0],
          [2.0830373558694437, 41.293450808462836, 0],
          [2.0822295697340727, 41.29526630177341, 0],
          [2.076329381875978, 41.29327544458598, 0],
          [2.077370499140386, 41.29141143059173, 0],
          [2.0764516458942275, 41.29111785437606, 0],
          [2.0753625532473436, 41.29297627995079, 0],
          [2.065200143883595, 41.28964218247223, 0],
          [2.058898168373926, 41.29204493396387, 0],
        ],
      ],
    }),
  });

  const standNW = new Graphic({
    symbol: fillSymbolStand,
    geometry: new Polygon({
      rings: [
        [
          [2.057566419766411, 41.29401143749593, 0],
          [2.056232243532431, 41.29604385446611, 0],
          [2.0695327803170485, 41.30054602929275, 0],
          [2.0723533069392293, 41.29873961634782, 0],
          [2.057566419766411, 41.29401143749593, 0],
        ],
      ],
    }),
  });

  const standNE = new Graphic({
    symbol: fillSymbolStand,
    geometry: new Polygon({
      rings: [
        [
          [2.0709480477699493, 41.30098577881595, 0],
          [2.087590820806823, 41.307172605063904, 0],
          [2.0871856619037885, 41.307902279289024, 0],
          [2.09030926874566, 41.3090181801594, 0],
          [2.0899032256953087, 41.309766014965476, 0],
          [2.0911971603113644, 41.31021606992266, 0],
          [2.091549093851093, 41.30946478361383, 0],
          [2.09013438075815, 41.3066878771161, 0],
          [2.087863147322325, 41.3058920612893, 0],
          [2.0888660645535104, 41.30424924118878, 0],
          [2.084832005010937, 41.30287049661829, 0],
          [2.084602174907319, 41.3032850458234, 0],
          [2.073729049959174, 41.299803330448455, 0],
          [2.0709480477699493, 41.30098577881595, 0],
        ],
      ],
    }),
  });

  const standSW = new Graphic({
    symbol: fillSymbolStand,
    geometry: new Polygon({
      rings: [
        [
          [2.0692959594972384, 41.28966328734533, 0],
          [2.068888034765739, 41.29028579820083, 0],
          [2.0751591327565686, 41.29238773077241, 0],
          [2.0761745605719995, 41.290628245712355, 0],
          [2.082972164249711, 41.29296147135941, 0],
          [2.0835473886613003, 41.29183233922605, 0],
          [2.083016575338188, 41.29068536814547, 0],
          [2.077749250219631, 41.28888680967324, 0],
          [2.0787009037398683, 41.28724580674123, 0],
          [2.0721004959351004, 41.28496838662873, 0],
          [2.0692959594972384, 41.28966328734533, 0],
        ],
      ],
    }),
  });

  const standSE = new Graphic({
    symbol: fillSymbolStand,
    geometry: new Polygon({
      rings: [
        [
          [2.076330901708541, 41.29327324068922, 0],
          [2.082223350452633, 41.29526439187278, 0],
          [2.083079403462817, 41.29336900204539, 0],
          [2.0773779099936402, 41.29141464192244, 0],
          [2.076330901708541, 41.29327324068922, 0],
        ],
      ],
    }),
  });

  const airborne1 = new Graphic({
    symbol: fillSymbolAirbone,
    geometry: new Polygon({
      rings: [
        [
          [2.071865497417063, 41.29511110793517, 0],
          [2.072158956594813, 41.294619661743106, 0],
          [2.054924082006922, 41.28531360680459, 0],
          [2.0521489503744132, 41.29253179181472, 0],
          [2.071865497417063, 41.29511110793517, 0],
        ],
      ],
    }),
  });

  const airborne2 = new Graphic({
    symbol: fillSymbolAirbone,
    geometry: new Polygon({
      rings: [
        [
          [2.1035893919564717, 41.30596837524863, 0],
          [2.120496624604457, 41.31751815740264, 0],
          [2.125422261678434, 41.30981114953884, 0],
          [2.1038732002253835, 41.30548156157961, 0],
          [2.1035893919564717, 41.30596837524863, 0],
        ],
      ],
    }),
  });

  const airborne3 = new Graphic({
    symbol: fillSymbolAirbone,
    geometry: new Polygon({
      rings: [
        [
          [2.074193750587927, 41.282547142775485, 0],
          [2.074464395678444, 41.282087084282104, 0],
          [2.0571723027600743, 41.27254586230649, 0],
          [2.053708408767759, 41.28051709501492, 0],
          [2.074193750587927, 41.282547142775485, 0],
        ],
      ],
    }),
  });

  const airborne4 = new Graphic({
    symbol: fillSymbolAirbone,
    geometry: new Polygon({
      rings: [
        [
          [2.1034107192374742, 41.291983563058004, 0],
          [2.103142290574515, 41.29246685941843, 0],
          [2.123335119056207, 41.30625649674507, 0],
          [2.127920815153932, 41.29690142534238, 0],
          [2.1034107192374742, 41.291983563058004, 0],
        ],
      ],
    }),
  });

  const airborne5 = new Graphic({
    symbol: fillSymbolAirbone,
    geometry: new Polygon({
      rings: [
        [
          [2.0944167204327298, 41.30935050491175, 0],
          [2.0969102992010282, 41.32681424580336, 0],
          [2.105965573112122, 41.32376821661963, 0],
          [2.0949107632325785, 41.30922541971759, 0],
          [2.0944167204327298, 41.30935050491175, 0],
        ],
      ],
    }),
  });

  const airborne6 = new Graphic({
    symbol: fillSymbolAirbone,
    geometry: new Polygon({
      rings: [
        [
          [2.0845747016722433, 41.28780029727091, 0],
          [2.0850803194373535, 41.287690180245015, 0],
          [2.0827974003961294, 41.27020764095785, 0],
          [2.0745660380367976, 41.2739004122815, 0],
          [2.0845747016722433, 41.28780029727091, 0],
        ],
      ],
    }),
  });

  areasLayer = new GraphicsLayer({
    elevationInfo: { mode: "on-the-ground" },
  });

  areasLayer.addMany([
    standNE,
    standNW,
    standSW,
    standSE,
    taxi,
    apronEast,
    apronTop,
    apronWest,
    rwy06R,
    rwy06L,
    rwy20,
    airborne1,
    airborne2,
    airborne3,
    airborne4,
    airborne5,
    airborne6,
  ]);

  map.add(areasLayer);
}

export function setAreasLayerVisibility(b: boolean) {
  areasLayer.visible = b;
}
