import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

import 'ol/ol.css';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OLMap from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';

import { style } from '@/utils/olStyles';
import { Feature, MapBrowserEvent } from 'ol';
import { Geometry, Polygon } from 'ol/geom';
import PointerInteraction from 'ol/interaction/Pointer';
import { FeatureLike } from 'ol/Feature';

const INITIAL_SHAPE = [
  [
    [141.13922828482868, 39.700746114892695],
    [141.13562590259545, 39.699950292498954],
    [141.13569723689824, 39.69791953170119],
    [141.13826527175615, 39.69671202398027],
    [141.1412613124262, 39.69715112014126],
    [141.14261666418167, 39.699044690323944],
    [141.13922828482868, 39.700746114892695],
  ],
];

type Option = {
  source: VectorSource;
};

/**
 * Custom Interaction class by using subclassing ol/interaction/Pointer to drag and copy.
 */
export class Copy extends PointerInteraction {
  protected coordinate: number[];
  protected selectedFeature: FeatureLike | undefined;
  readonly source: VectorSource;

  constructor(optOption: Option) {
    super();

    this.coordinate = [];
    this.source = optOption.source;
    this.selectedFeature = undefined;
  }

  protected handleDownEvent(evt: MapBrowserEvent<MouseEvent>) {
    const { map } = evt;
    const feat = map.forEachFeatureAtPixel(evt.pixel, (f: FeatureLike) => f);
    if (feat) {
      this.coordinate = evt.coordinate;
      this.selectedFeature = feat;
    }

    return !!feat;
  }

  /**
   * Event handling for Pointer drag
   * @param mapBrowserEvent Event
   */
  protected handleDragEvent(evt: MapBrowserEvent<MouseEvent>) {
    if (!this.selectedFeature) return;

    const deltaX = evt.coordinate[0] - this.coordinate[0];
    const deltaY = evt.coordinate[1] - this.coordinate[1];

    const geometry = this.selectedFeature.getGeometry();
    if (!geometry) return;

    (geometry as Geometry).translate(deltaX, deltaY);

    this.coordinate = [evt.coordinate[0], evt.coordinate[1]];
  }

  /**
   * Event handling for Pointer up
   * @param mapBrowserEvent Event
   * @return {boolean} return true if event was handled
   */
  protected handleUpEvent() {
    if (this.selectedFeature) {
      this.source.addFeature((this.selectedFeature as Feature).clone());
    }
    this.coordinate = [];
    this.selectedFeature = undefined;
    return false;
  }
}

const CustomInteraction: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<OLMap | undefined>();

  const source = useMemo(() => new VectorSource(), []);
  const copy = useMemo(() => new Copy({ source }), [source]);
  source.addFeature(new Feature(new Polygon(INITIAL_SHAPE)));

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
    if (!map || !copy) return;

    map.addInteraction(copy);
    return () => {
      map.removeInteraction(copy);
    };
  }, [map, copy]);

  const handleRevertChange = useCallback(() => {
    source.clear();
    source.addFeature(new Feature(new Polygon(INITIAL_SHAPE)));
  }, [source]);

  return (
    <div className="m-4 flex-col">
      <div className="text-4xl text-gray-700">Draw Point/LineString/Polygon</div>
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
export default CustomInteraction;
