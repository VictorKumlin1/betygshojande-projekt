const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const databas = require('./databas');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'din hemliga nyckel',
  resave: false,
  saveUninitialized: false,

}));

app.get('/', (req, res) => {
  res.render('home', { title: 'Välkommen' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Registrering' });
});
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Username: ${username}, Password: ${password}`);
  try {
    await databas.addUser(username, password);
    req.session.username = username;
    console.log('Inloggning lyckades för användare:', username);
    res.redirect('/posts');
  } catch (error) {
    console.error('Fel vid registrering:', error);
    res.status(500).send('Serverfel vid registrering');
  }
});

// Serva login-sidan
app.get('/login', (req, res) => {
  res.render('login', { title: 'Logga in' });
});

// Hantera inloggningsdata
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Username: ${username}`);
  try {
    const loginResult = await databas.login(username, password);
    if (loginResult.success) {
      console.log('Inloggning lyckades för användare:', username);
      req.session.username = loginResult.user.username;
      console.log('Session efter inloggning:', req.session);
      res.redirect('/posts');
    } else {
      console.log('Inloggning misslyckades för användare:', username);
      res.send('Inloggning misslyckades');
    }
  } catch (error) {
    console.error('Fel vid inloggning:', error);
    res.status(500).send('Serverfel');
  }
});

// Serva posts-sidan
app.get('/posts', (req, res) => {
  res.render('posts', { title: 'Inlägg' });
});

app.post('/posts', (req, res) => {
  const { content } = req.body;
  console.log('Session innan post skapande:', req.session);
  const username = req.session.username; // Använd username från sessionen
  if (!username) {
    return res.status(401).send('Du måste vara inloggad för att skapa ett inlägg.');
  }
  console.log(`Skapar inlägg för användare: ${username}, Innehåll: ${content}`);
  databas.addPost(username, content)
    .then(() => {
      res.send('Inlägg sparat');
    })
    .catch(error => {
      console.error('Fel vid tillägg av inlägg:', error);
      res.status(500).send('Serverfel vid tillägg av inlägg');
    });
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servern kör på http://localhost:${PORT}`);
});
