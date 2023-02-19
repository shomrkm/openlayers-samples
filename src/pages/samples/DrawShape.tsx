import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import OLMap from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { Draw } from 'ol/interaction';
import { Type } from 'ol/geom/Geometry';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

const DrawShape: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<OLMap | undefined>();
  const [type, setType] = useState<Type>();

  const source = useMemo(() => new VectorSource(), []);
  const draw = useMemo(() => type && new Draw({ source, type }), [source, type]);

  useEffect(() => {
    if (!mapElement.current) return;
    const initialMap = new OLMap({
      target: mapElement.current,
      view: new View({ projection: 'CRS:84', zoom: 16, center: [141.1378, 39.6987] }),
      layers: [
        new TileLayer({ source: new OSM() }),
        new VectorLayer({
          source,
          style: {
            'fill-color': 'rgba(255,255,255, 0.2)',
            'stroke-color': '#ffcc33',
            'stroke-width': 2,
            'circle-radius': 7,
            'circle-fill-color': '#ffcc33',
          },
        }),
      ],
    });
    setMap(initialMap);
    return () => initialMap.setTarget(undefined);
  }, [source]);

  useEffect(() => {
    if (map && draw) {
      map.addInteraction(draw);
      return () => {
        map.removeInteraction(draw);
      };
    }
  }, [map, draw]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) return;
    setType(e.target.value as Type);
  }, []);

  return (
    <div className="m-4 flex-col">
      <div className="text-4xl text-gray-700">Drawing Shape</div>
      <div className="mt-4 h-[600px] w-full" ref={mapElement} />
      <div className="flex justify-start py-4">
        <p className="flex items-center pl-2 pr-4 text-lg text-gray-600">Drawing geometry type:</p>
        <select
          className="block rounded-sm border border-solid border-gray-300 px-4 py-1.5 font-normal text-gray-600"
          onChange={handleChange}
        >
          <option value="Point">Point</option>
          <option value="LineString">LineString</option>
          <option value="Polygon">Polygon</option>
        </select>
      </div>
    </div>
  );
};
export default DrawShape;
