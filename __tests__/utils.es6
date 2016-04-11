jest.unmock('../src/utils/index.es6');
jest.unmock('../src/index.es6');

import {
  translateBoundPos,
} from '../src/utils/index.es6';

import {
  DaumMapBounds,
} from '../src/index.es6';

// //{
//     minLat,
//     maxLat,
//     minLng,
//     maxLng}
describe('translateBoundPos should...', () => {
  it('should calculate correctly 1', () => {
    // translateBoundPos({bounds, width, height, lat, lng})
    const bounds = new DaumMapBounds({
      minLat: 30, maxLat: 50,
      minLng: 10, maxLng: 60,
    });

    const { top, left } = translateBoundPos({
      bounds,
      width: 100, height: 100,
      lat: 35, lng: 40,
    });
    expect(top).toEqual(50);
    expect(left).toEqual(50);
  });
});
