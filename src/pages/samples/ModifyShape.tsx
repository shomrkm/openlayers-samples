import React, { useState, useEffect, useCallback, useRef, useMemo} from 'react';

import 'ol/ol.css';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OLMap from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { Modify} from 'ol/interaction';
import VectorSource from 'ol/source/Vector';
import { Style, Fill, Stroke, Circle } from 'ol/style';
import { Feature } from 'ol';
import { Polygon } from 'ol/geom';

const fill = new Fill({
  color: [255, 255, 255, 0.2],
});
const stroke = new Stroke({
  color: '#ffcc33',
  width: 2,
});
const circle = new Circle({
  radius: 7,
  stroke,
  fill,
});
const style = new Style({ fill, stroke, image: circle });

const INITIAL_SHAPE = [
      [
        [
          141.13922828482868,
          39.700746114892695
        ],
        [
          141.13562590259545,
          39.699950292498954
        ],
        [
          141.13569723689824,
          39.69791953170119
        ],
        [
          141.13826527175615,
          39.69671202398027
        ],
        [
          141.1412613124262,
          39.69715112014126
        ],
        [
          141.14261666418167,
          39.699044690323944
        ],
        [
          141.13922828482868,
          39.700746114892695
        ]
      ]
    ];

const ModifyShape: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<OLMap | undefined>();

  const source = useMemo(() => new VectorSource(), []);
  const draw = useMemo(() => new Modify({ source }), [source]);

  source.addFeature(new Feature( new Polygon(INITIAL_SHAPE)));

  useEffect(() => {
    if (!mapElement.current) return;
    const initialMap = new OLMap({
      target: mapElement.current,
      view: new View({ projection: 'CRS:84', zoom: 16, center: [141.1378, 39.6987] }),
      layers: [
        new TileLayer({ source: new OSM() }),
        new VectorLayer({
          source,
          style,
        }),
      ],
    });
    setMap(initialMap);
    return () => initialMap.setTarget(undefined);
  }, [source]);

  useEffect(() => {
    if (!map || !draw) return;

    map.addInteraction(draw);
    return () => {
      map.removeInteraction(draw);
    };
  }, [map, draw]);

  const handleRevertChange = useCallback(() => {
    source.clear();
    source.addFeature(new Feature( new Polygon(INITIAL_SHAPE)));
  }, [source]);

  return (
    <div className="m-4 flex-col">
      <div className="text-4xl text-gray-700">Modify Shape</div>
      <div className="mt-4 h-[600px] w-full" ref={mapElement} />
      <div className="flex justify-start py-4">
        <button
          className="rounded-sm border border-solid border-gray-300 px-4 text-gray-600"
          onClick={handleRevertChange}
        >
         Revert Changes 
        </button>
      </div>
    </div>
  );
};
export default ModifyShape;
