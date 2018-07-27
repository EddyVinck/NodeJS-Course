const asyncAdd = (x = 1, y = 2) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof x === 'number' && typeof y === 'number') {
        resolve(x + y);
      } else {
        reject('arguments must be numbers');
      }
    }, 2000);
  });
};

// const myPromise = new Promise((resolve, reject) => {
//   // reject('oh no..');
//   setTimeout(() => {
//     resolve('It worked');
//   }, 2000);
// });

// myPromise.then(
//   (msg) => {
//     console.log(msg);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

asyncAdd()
  .then((result) => {
    console.log('step: 1');
    return result;
  })
  .then((result) => {
    console.log('step: 2');
    console.log(result);
    return asyncAdd(result, 5);
  })
  // This does NOT work because it is not a promise
  // .then((result) => {
  //   console.log('step: 3');
  //   setTimeout(() => {
  //     console.log('async result');
  //     console.log(result);
  //     return result;
  //   }, 1000);
  // })
  .then((result) => {
    return new Promise((resolve, reject) => {
      console.log('step: 3');
      setTimeout(() => {
        console.log('async result');
        console.log(result);
        resolve(result);
      }, 1000);
    });
  })
  .then((result) => {
    return new Promise((resolve, reject) => {
      console.log('step: 4');
      setTimeout(() => {
        console.log('async result 2');
        console.log(result);
        resolve(asyncAdd(result, result));
      }, 1000);
    });
  })
  .then((result) => {
    console.log('step: 5');
    console.log(result);
    return asyncAdd(result, 5);
  })
  .then((result) => {
    console.log('step: 6');
    console.log('Final result:', result);
  })
  .then(() => {
    console.log('step: 7');
    console.log('finished...');
  })
  .catch((error) => {
    console.log(error);
  });
