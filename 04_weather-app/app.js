const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
    },
  })
  .help()
  .alias('help', 'h').argv;

const geocodeKey = 'AIzaSyC8KhY00La7zp9Q0QPKwlNkRAkas_P9awM';
const encodedAddress = encodeURIComponent(argv.address);

const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${geocodeKey}`;

const getWeatherUrl = (geolocation) => {
  const API_KEY = '84424dfdd3d5ceb2d12742a00911c920';
  const options = {
    lang: 'en',
    units: 'auto',
  };
  const { latitude, longitude, city, address } = geolocation;
  const url = `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}?`;

  let optionParameters = '';

  for (const option in options) {
    if (options.hasOwnProperty(option)) {
      optionParameters += `${option}=${options[option]}&`;
    }
  }
  const weatherUrl = url + optionParameters;

  return weatherUrl;
};

axios
  .get(geocodeUrl)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Address could not be found.');
    }

    const localityObject = response.data.results[0].address_components.filter((obj) => {
      return obj.types.includes('locality');
    })[0];
    const city = localityObject.long_name;
    const geometry = response.data.results[0].geometry;
    const address = response.data.results[0].formatted_address;
    const latitude = geometry.location.lat;
    const longitude = geometry.location.lng;

    const geoInfo = {
      latitude,
      longitude,
      city,
      address,
    };
    return geoInfo;
  })
  .then((geolocation) => {
    return axios.get(getWeatherUrl(geolocation)).then((response) => {
      return {
        geolocation,
        response,
      };
    });
  })
  .then((results) => {
    let weatherMessage = `It is currently ${results.response.data.currently.temperature} degrees.`;

    if (
      results.response.data.currently.temperature !==
      results.response.data.currently.apparentTemperature
    ) {
      weatherMessage += ` However, it feels like ${
        results.response.data.currently.apparentTemperature
      } degrees.`;
    }
    console.log(weatherMessage);
  })
  .catch((e) => {
    console.log(e);
    if (e.code === 'ENOTFOUND') {
      console.log('Could not connect to geolocation server.');
    } else {
      console.log(e.message);
    }
  });
