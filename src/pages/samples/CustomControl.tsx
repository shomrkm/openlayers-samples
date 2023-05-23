import React, { useState, useEffect, useRef } from 'react';

import 'ol/ol.css';
import { Tile as TileLayer } from 'ol/layer';
import OLMap from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { Control, defaults as defaultControls } from 'ol/control';

type Options = {
  element?: HTMLElement | undefined;
  target?: string | HTMLElement | undefined;
};

class RotateNorthControl extends Control {
  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options: Options) {
    const options = opt_options || {};

    const img = document.createElement('img');
    img.src = '/plus.svg';

    const element = document.createElement('div');
    element.className = 'ol-control';
    element.classList.add('zoom-in');
    element.style.cssText =
      'display: flex;' +
      'font-size: 50px;' +
      'width: 50px; height: 50px;' +
      'top: 50%; left: 50%;' +
      'opacity: 50%;' +
      'background-color: transparent;';
    element.appendChild(img);

    super({
      element: element,
      target: options.target,
    });

    element.addEventListener('click', this.handleRotateNorth.bind(this), false);
  }

  handleRotateNorth() {
    this.getMap()?.getView().setRotation(0);
  }
}

const CustomControl: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [, setMap] = useState<OLMap | undefined>();

  useEffect(() => {
    if (!mapElement.current) return;
    const initialMap = new OLMap({
      target: mapElement.current,
      view: new View({ projection: 'CRS:84', zoom: 16, center: [141.1378, 39.6987] }),
      layers: [new TileLayer({ source: new OSM() })],
      controls: defaultControls().extend([new RotateNorthControl({})]),
    });
    setMap(initialMap);
    return () => initialMap.setTarget(undefined);
  }, []);

  return (
    <div className="m-4 flex-col">
      <div className="text-4xl text-gray-700">Custom Interaction</div>
      <div className="mt-4 h-[600px] w-full" ref={mapElement} />
    </div>
  );
};
export default CustomControl;
