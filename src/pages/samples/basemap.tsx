import React, { useEffect, useRef } from 'react';

import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import OLMap from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';

const BaseMap: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<OLMap>();

  useEffect(() => {
    if (!mapElement.current || mapRef.current) return;
    mapRef.current = new OLMap({
      target: mapElement.current,
      view: new View({ projection: 'CRS:84', zoom: 16, center: [141.1378, 39.6987] }),
      layers: [new TileLayer({ source: new OSM() })],
    });
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1">Test</div>
      <div id="map" className="h-[600px] w-full" ref={mapElement} />
    </div>
  );
};
export default BaseMap;
