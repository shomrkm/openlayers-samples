import React, { useState, useEffect, useRef } from 'react';

import 'ol/ol.css';
import { Tile as TileLayer } from 'ol/layer';
import OLMap from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { Control } from 'ol/control';

import { renderToString } from 'react-dom/server';

import { TfiPlus } from 'react-icons/tfi';

type Options = {
  element?: HTMLElement | undefined;
  target?: string | HTMLElement | undefined;
};

const tfiPlusIcon = <TfiPlus style={{ color: 'red', fontSize: '30px' }} />;

class CenterIconControl extends Control {
  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options: Options) {
    const options = opt_options || {};

    const img = document.createElement('img');
    const iconString = renderToString(tfiPlusIcon);
    img.src = `data:image/svg+xml;utf8,${encodeURIComponent(iconString)}`;

    const element = document.createElement('div');
    element.className = 'ol-control';
    element.classList.add('plus-mark');
    element.classList.add('zoom-in');
    element.appendChild(img);

    super({
      element: element,
      target: options.target,
    });
  }
}

const CustomControl: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<OLMap | undefined>();

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

  useEffect(() => {
    if (!map) return;

    const control = new CenterIconControl({});
    map.on('moveend', () => {
      map.addControl(control);
    });
    map.on('movestart', () => {
      map.removeControl(control);
    });
  }, [map]);

  return (
    <div className="m-4 flex-col">
      <div className="text-4xl text-gray-700">Custom Control</div>
      <div className="mt-4 h-[600px] w-full" ref={mapElement} />
    </div>
  );
};
export default CustomControl;
