export default function translateBoundPos({
  bounds, width, height, lat, lng,
} = {}) {
  const boundsLatSize = bounds.maxLat - bounds.minLat;
  const boundsLngSize = bounds.maxLng - bounds.minLng;
  const relativeLat = bounds.maxLat - lat;
  const relativeLng = lng - bounds.minLng;
  //
  const latWidthRatio = height / boundsLatSize;
  const lngHeightRatio = width / boundsLngSize;

  return {
    left: relativeLng * lngHeightRatio,
    top: relativeLat * latWidthRatio,
  };
}
