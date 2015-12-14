import keyMirror from 'keymirror';
import daumAPIWrapper from '../../daum-api-wrapper';

export default keyMirror({
  ROADVIEW: null,
  OVERLAY: null,
  TRAFFIC: null,
  TERRAIN: null,
  BICYCLE: null,
  BICYCLE_HYBRID: null,
  USE_DISTRICT: null,
});

export function convertToDaumOverlayMapType(overlayMapType) {
  const daumMapAPI = daumAPIWrapper.getDaumMapAPI();
  return daumMapAPI.MapTypeId[overlayMapType];
}
