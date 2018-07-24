const request = require('request');

const geocode = {
  API_KEY: 'AIzaSyC8KhY00La7zp9Q0QPKwlNkRAkas_P9awM',
  geocodeAddress(address, callback, argv) {
    const encodedAddress = encodeURIComponent(address);

    return new Promise((resolve, reject) => {
      request(
        {
          url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${
            this.API_KEY
          }`,
          json: true,
        },
        (error, response, body) => {
          if (error) {
            const errorMessage = 'Unable to connect to Google Servers.';
            reject(errorMessage);
          } else if (body.status === 'ZERO_RESULTS') {
            const errorMessage = 'Unable to find that address.';
            reject(errorMessage);
          } else if (body.status === 'OK') {
            const localityObject = body.results[0].address_components.filter((obj) => {
              return obj.types.includes('locality');
            })[0];
            const city = localityObject.long_name;
            const geometry = body.results[0].geometry;
            const address = body.results[0].formatted_address;
            const latitude = geometry.location.lat;
            const longitude = geometry.location.lng;
            // console.log(JSON.stringify(body, null, 2));

            const GeolocationResults = {
              latitude,
              longitude,
              city,
              address,
            };
            resolve(GeolocationResults);
          }
        }
      );
    });
  },
};

module.exports = geocode;
