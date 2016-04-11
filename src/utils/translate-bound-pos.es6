export default function translateBoundPos({bounds, width, height, lat, lng}={}) {
  const boundsLatSize = bounds.maxLat - bounds.minLat;
  const boundsLngSize = bounds.maxLng - bounds.minLng;
  const relativeLat = lat - bounds.minLat;
  const relativeLng = lng - bounds.minLng;
  const latRatio = relativeLat / boundsLatSize;
  const lngRatio = relativeLng / boundsLngSize;
  return {
    left: width * lngRatio,
    top: (-1) * height * latRatio,
  };
}
