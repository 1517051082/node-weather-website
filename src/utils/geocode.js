const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmVuZHl3aWpheWEyMiIsImEiOiJjanNlcmd0cmIxOG10M3lvYTZ3NXB6emhoIn0.Ji3p25rrEra8icX6fYBrZA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service!", undefined);
    } else if (body.features.length == 0) {
      callback("Unable to find location");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
