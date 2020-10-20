const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6daae2581a83ba2f75da3cd04bd1d08e&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    // console.log(response);
    if (error) {
      callback("Location not found.Try another");
    } else {
      callback(undefined, {
        forecastdata: `The sky is ${response.body.current.weather_descriptions[0]}. The temperature is ${response.body.current.temperature} and feelslike ${response.body.current.feelslike}`,
      });
    }
  });
};

module.exports = forecast;
