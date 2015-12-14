/* @flow */

export default class Bounds {
  constructor(
      minLat: number,
      maxLat: number,
      minLng: number,
      maxLng: number) {
    this.minLat = minLat;
    this.maxLat = maxLat;
    this.minLng = minLng;
    this.maxLng = maxLng;
  }
}

const test2 = new Bounds({
  asdasd: 123123,
});
