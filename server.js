const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const db = require('./db'); // Lägg till den här raden för att inkludera db.js


const app = express();

// Konfigurera Handlebars som templating-motor
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware för att hantera POST-data
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
  // Här kan du lägga till logik för att spara användardata till en databas
  console.log(`Username: ${username}, Password: ${password}`);
  res.send('Registrering lyckades!');
  db.addUser(username, password);


});

// Serva login-sidan
app.get('/login', (req, res) => {
  res.render('login', { title: 'Logga in' });
});

// Hantera inloggningsdata
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Här kan du lägga till logik för att verifiera användardata
  console.log(`Username: ${username}, Password: ${password}`);
  res.send('Inloggning lyckades!');
});

// Starta servern
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servern kör på http://localhost:${PORT}`);
});