/* @flow */

export default class Bounds {
  constructor({
      minLat,
      maxLat,
      minLng,
      maxLng} = {}) {
    this.minLat = minLat;
    this.maxLat = maxLat;
    this.minLng = minLng;
    this.maxLng = maxLng;
  }
}
