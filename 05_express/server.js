const express = require('express');
const hbs = require('hbs');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, '/views'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase() + '!!');

// Middleware
app.use((req, res, next) => {
  // res.render('maintenance.hbs');
  next();
});
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to my Express website',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'No!',
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
