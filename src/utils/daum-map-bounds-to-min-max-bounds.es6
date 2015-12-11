export default function daumMapBoundsToMinMaxBounds(daumBoundary) {
  const sw = daumBoundary.getSouthWest();
  const ne = daumBoundary.getNorthEast();
  return {
    minLat: sw.getLat(),
    maxLat: ne.getLat(),
    minLng: sw.getLng(),
    maxLng: ne.getLng(),
  };
}
