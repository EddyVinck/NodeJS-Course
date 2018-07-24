const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
    },
    d: {
      alias: 'debug',
      describe: 'Display extra information for debugging',
      boolean: true,
    },
  })
  .help()
  .alias('help', 'h').argv;

if (argv.d) {
  console.log(argv);
}

geocode
  .geocodeAddress(argv.address)
  .then(weather.getWeather)
  .then((results) => {
    let weatherMessage = `It is currently ${results.weather.currently.temperature} degrees in ${
      results.city
    }.`;

    if (results.weather.currently.temperature !== results.weather.currently.apparentTemperature) {
      weatherMessage += ` However, it feels like ${
        results.weather.currently.apparentTemperature
      } degrees.`;
    }
    console.log(weatherMessage);
  })
  .catch((error) => {
    console.log(error);
  });
