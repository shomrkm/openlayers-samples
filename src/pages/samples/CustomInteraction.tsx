import React, { useState, useEffect, useRef, useMemo } from 'react';

import 'ol/ol.css';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OLMap from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';

import { style } from '@/utils/olStyles';
import { Collection, Feature, MapBrowserEvent } from 'ol';
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
  features: Collection<Feature>;
};

export class Copy extends PointerInteraction {
  protected coordinate: number[];
  protected selectedFeature: FeatureLike | undefined;
  readonly features: Collection<Feature>;

  constructor(optOption: Option) {
    super();

    this.coordinate = [];
    this.features = optOption.features;
    this.selectedFeature = undefined;
  }

  protected handleDownEvent(evt: MapBrowserEvent<any>) {
    const { map } = evt;
    const feat = map.forEachFeatureAtPixel(evt.pixel, (f: FeatureLike) => f);
    if (feat) {
      this.coordinate = evt.coordinate;
      this.selectedFeature = feat;
    }

    return !!feat;
  }

  /**
   * Pointer drag イベントのハンドリング処理
   * @param mapBrowserEvent イベント.
   */
  protected handleDragEvent(evt: MapBrowserEvent<any>) {
    if (!this.selectedFeature) return;

    const deltaX = evt.coordinate[0] - this.coordinate[0];
    const deltaY = evt.coordinate[1] - this.coordinate[1];

    const geometry = this.selectedFeature.getGeometry();
    if (!geometry) return;

    (geometry as Geometry).translate(deltaX, deltaY);

    this.coordinate = [evt.coordinate[0], evt.coordinate[1]];
  }

  /**
   * Pointer up イベントのハンドリング処理
   * @param mapBrowserEvent イベント.
   * @return {boolean} イベントが処理されたら true
   */
  protected handleUpEvent() {
    if (this.selectedFeature) {
      this.features.push((this.selectedFeature as Feature).clone());
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
  source.addFeature(new Feature(new Polygon(INITIAL_SHAPE)));

  // TODO:
  map.addInteraction(
    new Copy({ features: source.getFeaturesCollection() ?? new Collection<Feature>() })
  );

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

  // TODO:
  useEffect(() => {
    if (!map || !draw) return;

    map.addInteraction(draw);
    return () => {
      map.removeInteraction(draw);
    };
  }, [map, draw]);

  return (
    <div className="m-4 flex-col">
      <div className="text-4xl text-gray-700">Draw Point/LineString/Polygon</div>
      <div className="mt-4 h-[600px] w-full" ref={mapElement} />
      <div className="flex justify-start py-4"></div>
    </div>
  );
};
export default CustomInteraction;
