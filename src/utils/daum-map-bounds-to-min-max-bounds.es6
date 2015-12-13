import Bounds from '../datatypes/bounds';

export default function daumMapBoundsToBounds(daumBounds) {
  const sw = daumBounds.getSouthWest();
  const ne = daumBounds.getNorthEast();
  return new Bounds({
    minLat: sw.getLat(),
    maxLat: ne.getLat(),
    minLng: sw.getLng(),
    maxLng: ne.getLng(),
  });
}
