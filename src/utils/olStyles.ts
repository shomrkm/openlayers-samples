import { Style, Fill, Stroke, Circle } from 'ol/style';

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

export const style = new Style({ fill, stroke, image: circle });