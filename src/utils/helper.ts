import Feature from 'ol/Feature';
import Circle from 'ol/geom/Circle';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import { Fill, Style } from 'ol/style';

interface Item {
  latitude: number;
  longitude: number;
  hash_id: string;
  uncertainty: number;
  [key: string]: any;
}

export const processDataES = (data: Item[]) => {
  const circleFeatures = data.map(
    item => new Feature(new Circle(fromLonLat([item.longitude, item.latitude]), item.uncertainty))
  );
  return new VectorLayer({
    source: new VectorSource({
      features: circleFeatures,
    }),
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 165, 0, 0.01)',
      }),
    }),
    zIndex: 2,
  });
};
