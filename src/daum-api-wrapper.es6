import Promise from 'q';

// Really hacky, but postscribe is not npm-friendly module.
require('postscribe');
require('postscribe/htmlParser/htmlParser.js');
const postscribe = window.postscribe;

const deferred = Promise.defer();
let isLoading = false;

function load(APIKey) {
  if (!isLoading) {
    isLoading = true;
    const url = `https://apis.daum.net/maps/maps3.js?apikey=${APIKey}&libraries=services`;
    postscribe(window.document.head, `<script src="${url}"></script>`, {
      done: ()=> {
        deferred.resolve();
      },
      error: (e)=> {
        deferred.reject(e);
      },
    });
  }
  return deferred.promise;
}

const loadPromise = deferred.promise;

function getDaumMapAPI() {
  if (!window.daum.maps) {
    throw new Error('Daum Map not loaded yet!');
  }
  return window.daum.maps;
}

function daumMapCoordsToArrayCoords(daumMapCoord) {
  const coordStr = daumMapCoord.toString();
  const latStr = coordStr.substring(1, coordStr.indexOf(',') - 1);
  const lat = Number(latStr);
  const longStr = coordStr.substring(coordStr.indexOf(',') + 2, coordStr.length - 1);
  const long = Number(longStr);
  return [lat, long];
}

export default {
  load, loadPromise,
  getDaumMapAPI,
  daumMapCoordsToArrayCoords,
};
