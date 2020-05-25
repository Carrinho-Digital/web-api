const axios = require('axios');
const { Client } = require('@googlemaps/google-maps-services-js');

function createMaps() {
  return new Client({
    axiosInstance: axios,
  });
}

function googleDistanceMatrix(
  { latX, longX },
  { latY, longY },
  departureTime = Date.now(),
) {
  const maps = createMaps();

  return maps.distancematrix({
    params: {
      departure_time: departureTime,
      origins: [{lat: latX, lng: longX}],
      destinations: [{lat: latY, lng: longY}],
      key: process.env.GOOGLE_DISTANCE_MATRIX_API_KEY,
    },
  });
}

function distanceBetweenCoordinates({ latX, longX }, { latY, longY }) {
  const earthRadius = 6371e3;
  const originTetaLatitude = latX * Math.PI / 180;
  const destinationTetaLatitude = latY * Math.PI / 180;

  const diffBetweenLatitudes = (latY - latX) * Math.PI / 180;
  const diffBetweenLongitudes = (longY - longX) * Math.PI / 180;

  const powOfLatDiffs = Math.sin(diffBetweenLatitudes/2) *
    Math.sin(diffBetweenLatitudes/2);
  const powOfLongDiffs = Math.sin(diffBetweenLongitudes/2) *
    Math.sin(diffBetweenLongitudes/2);

  const strategy = powOfLatDiffs +
    Math.cos(originTetaLatitude) *
    Math.cos(destinationTetaLatitude) *
    powOfLongDiffs;

  const distance = 2 * Math.atan2(Math.sqrt(strategy), Math.sqrt(1-strategy));
  const distanceInMeters = earthRadius * distance;
  const distanceInKm = distanceInMeters / 1000;

  return distanceInKm;
}

module.exports = {
  googleDistanceMatrix,
  distanceBetweenCoordinates,
};
