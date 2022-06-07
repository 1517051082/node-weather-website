const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=661aba545cc3d26405192112d023153e&query=" +
    latitude +
    "," +
    longitude +
    "&units=s";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather service!", undefined);
    } else if (body.error) {
      callback(body.error.info), undefined;
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " it is currently " +
          body.current.temperature +
          " degrees out" +
          " there is a " +
          body.current.feelslike +
          "% chance of rain"
      );
    }
  });
};

module.exports = forecast;
