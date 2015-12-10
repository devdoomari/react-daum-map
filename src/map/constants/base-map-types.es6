import keyMirror from 'keymirror';
import daumAPIWrapper from '../../daum-api-wrapper';


const BASE_MAP_TYPE = keyMirror({
  ROADMAP: null,
  SKYVIEW: null,
  HYBRID: null,
});
export default BASE_MAP_TYPE;

export function convertToDaumBaseMapType(baseMapType) {
  if (!(baseMapType in BASE_MAP_TYPE)) {
    throw new Error(`${baseMapType} is not one of BASE_MAP_TYPE.`);
  }
  const daumMapAPI = daumAPIWrapper.getDaumMapAPI();
  return daumMapAPI.MapTypeId[baseMapType];
}
