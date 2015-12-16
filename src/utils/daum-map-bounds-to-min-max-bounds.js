"use strict";
var bounds_1 = require('../datatypes/bounds');
const daumMapBoundsToBounds = function daumMapBoundsToBounds(daumBounds) {
    const sw = daumBounds.getSouthWest();
    const ne = daumBounds.getNorthEast();
    return new bounds_1.default({
        minLat: sw.getLat(),
        maxLat: ne.getLat(),
        minLng: sw.getLng(),
        maxLng: ne.getLng(),
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = daumMapBoundsToBounds;
