import Promise from 'q';
import getScript from 'getscript-promise';

const deferred = Promise.defer();
let isLoading = false;

function load(APIKey) {
  if (!isLoading) {
    isLoading = true;
    getScript(`https://apis.daum.net/maps/maps3.js?apikey=${APIKey}&libraries=services`)
      .then(()=> {
        deferred.resolve();
      })
      .catch((e)=> {
        deferred.reject(e);
      });
  }
  return deferred.promise;
}

const loadPromise = deferred.promise;

function getDaumMapAPI() {
  return window.daum.maps;
}

export default {
  load, loadPromise,
  getDaumMapAPI,
};
