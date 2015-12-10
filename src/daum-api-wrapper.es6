import Promise from 'q';
// import getScript from 'getscript-promise';
// import $ from 'jquery';
const postscribe = require('postscribe');

const deferred = Promise.defer();
let isLoading = false;

function load(APIKey) {
  if (!isLoading) {
    isLoading = true;
    //getScript(`https://apis.daum.net/maps/maps3.js?apikey=${APIKey}&libraries=services`)
    // $.getScript(`https://apis.daum.net/maps/maps3.js?apikey=${APIKey}&libraries=services`)
    //   .done(()=> {
    //     deferred.resolve();
    //   })
    //   .fail((e)=> {
    //     deferred.reject(e);
    //   });
    const url = `https://apis.daum.net/maps/maps3.js?apikey=${APIKey}&libraries=services`;
    const test = postscribe;
    debugger;
    postscribe(window.document.head, `<script src="${url}"></script>`, {
      done: ()=> {
        deferred.resolve();
      },
    })
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
