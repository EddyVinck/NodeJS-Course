const request = require('request');

const weather = {
  getWeather(geolocation, callback, argv) {
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
    const urlWithOptions = url + optionParameters;

    return new Promise((resolve, reject) => {
      request(
        {
          url: urlWithOptions,
          json: true,
        },
        (error, response, body) => {
          if (!error && response.statusCode === 200) {
            const results = {
              weather: body,
              city,
              address,
            };
            resolve(results);
          } else {
            reject('Could not connect to weather servers');
          }
        }
      );
    });
  },
};

// const weather = {
//   API_KEY: '84424dfdd3d5ceb2d12742a00911c920',

//   /**
//    *
//    * @param {*} geolocation
//    * @param {function} callback error, results
//    */
//   getWeather(geolocation, callback, argv) {
//     const options = {
//       lang: 'en',
//       units: 'auto',
//     };
//     const { latitude, longitude, city, address } = geolocation;
//     const url = `https://api.darksky.net/forecast/${this.API_KEY}/${latitude},${longitude}?`;

//     let optionParameters = '';
//     if (argv.d) {
//       console.log(`-- weather options --`);
//     }
//     for (const option in options) {
//       if (options.hasOwnProperty(option)) {
//         if (argv.d) {
//           console.log(`${option}: ${options[option]}`);
//         }
//         optionParameters += `${option}=${options[option]}&`;
//       }
//     }

//     const urlWithOptions = url + optionParameters;
//     if (argv.d) {
//       console.log(`-- weather query --`);
//       console.log(urlWithOptions);
//       console.log(`-- weather request --`);
//     }

//     request(
//       {
//         url: urlWithOptions,
//         json: true,
//       },
//       (error, response, body) => {
//         if (!error && response.statusCode === 200) {
//           const results = {
//             weather: body,
//             city,
//             address,
//           };
//           callback(null, results);
//         } else {
//           callback('Could not connect to weather servers', null);
//         }
//       }
//     );
//   },
// };

module.exports = weather;
