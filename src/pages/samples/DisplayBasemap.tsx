import { useMap } from 'hooks/useMap';
import React, { useEffect, useRef } from 'react';

import 'ol/ol.css';

const DisplayBasemap: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const { setTarget } = useMap({});

  useEffect(()=>{
    if(!mapElement.current) return;
    setTarget(mapElement.current);
  },[setTarget])

  return (
    <div className="m-4 flex-col">
      <div className="text-4xl text-gray-700">Display Basemap</div>
      <div className="my-4 h-[600px] w-full" ref={mapElement} />
    </div>
  );
};
export default DisplayBasemap;
