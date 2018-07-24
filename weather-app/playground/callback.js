const getUser = (id, callback) => {
  const user = {
    id,
    name: 'Barrie',
  };
  callback(user);
};

getUser(31, (user) => {
  console.log(user);
});
