import { useState, useEffect, useCallback } from 'react';

import OLMap from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { Coordinate } from 'ol/coordinate';

const INITIAL_SETTINGS = {
  initialZoom: 16, 
  initialCenter: [141.1378, 39.6987],
  projection: 'CRS:84'
}

type Props = {
  initialZoom?: number;
  initialCenter?: Coordinate;
  projection?: string;
}

export const useMap = ({
  initialZoom = INITIAL_SETTINGS.initialZoom, 
  initialCenter = INITIAL_SETTINGS.initialCenter,
  projection = INITIAL_SETTINGS.projection,
}: Props) => {
    const [map, setMap] = useState<OLMap | undefined>();

    useEffect(() => {
      const initialMap = new OLMap({
        view: new View({ projection, zoom: initialZoom, center: initialCenter }),
        layers: [new TileLayer({ source: new OSM() })],
      });
      setMap(initialMap);
    }, [initialCenter, initialZoom, projection]);

    const setTarget = useCallback((ele: HTMLElement)=> {
        if(!map) return;
        map.setTarget(ele);
    }, [map]);

    return { map, setTarget }
}