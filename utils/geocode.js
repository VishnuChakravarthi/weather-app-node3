const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmlzaG51Y2hha3JhdmFydGhpIiwiYSI6ImNrZzg1bDV6ODAxYjMycW1yeGwwM2l3eXMifQ.P_wxCw8rrgmtURh38CcvLg&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Network not connected");
    } else if (response.body.features.length === 0) {
      callback("Place value is invalid");
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
