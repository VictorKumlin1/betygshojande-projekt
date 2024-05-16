const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const databas = require('./databas'); x

const app = express();

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));

// Serva huvudsidan
app.get('/', (req, res) => {
  res.render('home', { title: 'Välkommen' });
});

// Serva register-sidan
app.get('/register', (req, res) => {
  res.render('register', { title: 'Registrering' });
});

// Hantera registreringsdata
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log(`Username: ${username}, Password: ${password}`);
  res.send('Registrering lyckades!');
  databas.addUser(username, password);


});

// Serva login-sidan
app.get('/login', (req, res) => {
  res.render('login', { title: 'Logga in' });
});

// Hantera inloggningsdata
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`Username: ${username}`);
  res.send('Inloggning lyckades!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servern kör på http://localhost:${PORT}`);
});
