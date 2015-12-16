export default function daumMapCoordsToArrayCoords(daumMapCoord) {
  const coordStr = daumMapCoord.toString();
  const latStr = coordStr.substring(1, coordStr.indexOf(',') - 1);
  const lat = Number(latStr);
  const longStr = coordStr.substring(coordStr.indexOf(',') + 2, coordStr.length - 1);
  const long = Number(longStr);
  return [lat, long];
}
