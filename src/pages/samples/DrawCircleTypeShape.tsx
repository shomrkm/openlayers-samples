import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

import 'ol/ol.css';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OLMap from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { Draw } from 'ol/interaction';
import { Type } from 'ol/geom/Geometry';
import VectorSource from 'ol/source/Vector';
import { Style, Fill, Stroke, Circle } from 'ol/style';
import { createBox, createRegularPolygon, GeometryFunction } from 'ol/interaction/Draw';

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

const GeometryFunction: Record<string, GeometryFunction> = {
  Square: createRegularPolygon(4),
  Box: createBox(),
}

const DrawCircleTypeShape: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<OLMap | undefined>();
  const [type, setType] = useState<Type>('Point');

  const source = useMemo(() => new VectorSource(), []);
  const draw = useMemo(() => { 
    if(!type) return;

    return new Draw({ 
      source, 
      type: 'Circle', 
      geometryFunction: GeometryFunction[type] });
  }, [source, type]);

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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) return;
    setType(e.target.value as Type);
  }, []);

  const handleClear = useCallback(() => {
    source.clear();
  }, [source]);

  return (
    <div className="m-4 flex-col">
      <div className="text-4xl text-gray-700">Drawing a Circle Type Shape</div>
      <div className="mt-4 h-[600px] w-full" ref={mapElement} />
      <div className="flex justify-start py-4">
        <p className="flex items-center pl-2 pr-4 text-lg text-gray-600">Drawing geometry type:</p>
        <select
          className="block rounded-sm border border-solid border-gray-300 px-4 py-1.5 font-normal text-gray-600"
          onChange={handleChange}
        >
          <option defaultValue="None">Circle</option>
          <option value="Square">Square</option>
          <option value="Box">Box</option>
        </select>
        <button
          className="mx-4 rounded-sm border border-solid border-gray-300 px-4 text-gray-600"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};
export default DrawCircleTypeShape;
