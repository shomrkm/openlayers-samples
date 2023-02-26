import React, { useState, useEffect, useRef } from 'react';

import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import OLMap from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { CodeBlock } from '@/components/CodeBlock';

const code = `
const BaseMap: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [, setMap] = useState<OLMap | undefined>();

  useEffect(() => {
    if (!mapElement.current) return;
    const initialMap = new OLMap({
      target: mapElement.current,
      view: new View({ projection: 'CRS:84', zoom: 16, center: [141.1378, 39.6987] }),
      layers: [new TileLayer({ source: new OSM() })],
    });
    setMap(initialMap);
    return () => initialMap.setTarget(undefined);
  }, []);

  return (
    <div className="m-4 flex-col">
      <div className="text-4xl text-gray-700">Display Basemap</div>
      <div className="mt-4 h-[600px] w-full" ref={mapElement} />
    </div>
  );
};
`

const BaseMap: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [, setMap] = useState<OLMap | undefined>();

  useEffect(() => {
    if (!mapElement.current) return;

    const initialMap = new OLMap({
      target: mapElement.current,
      view: new View({ projection: 'CRS:84', zoom: 16, center: [141.1378, 39.6987] }),
      layers: [new TileLayer({ source: new OSM() })],
    });
    setMap(initialMap);

    return () => initialMap.setTarget(undefined);
  }, []);

  return (
    <div className="m-4 flex-col">
      <div className="text-4xl text-gray-700">Display Basemap</div>
      <div className="my-4 h-[600px] w-full" ref={mapElement} />
      <div className=''>
        <h2 className='text-2xl text-gray-700'>Code Sample</h2>
        <CodeBlock code={code} />
      </div>
    </div>
  );
};
export default BaseMap;
