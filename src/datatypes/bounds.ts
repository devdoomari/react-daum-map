export class Bounds {
  minLat:number;
  maxLat:number;
  minLng:number;
  maxLng:number;
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