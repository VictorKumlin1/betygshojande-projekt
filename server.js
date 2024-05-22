const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const databas = require('./databas');
const session = require('express-session');

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

app.get('/login', (req, res) => {
  res.render('login', { title: 'Logga in' });
});

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

app.get('/posts', async (req, res) => {
  try {
    const posts = await databas.getPosts();
    res.render('posts', { title: 'Inlägg', posts });
  } catch (error) {
    console.error('Fel vid hämtning av inlägg:', error);
    res.status(500).send('Serverfel vid hämtning av inlägg');
  }
});

app.post('/posts', (req, res) => {
  const { content } = req.body;
  console.log('Session innan post skapande:', req.session);
  const username = req.session.username;
  if (!username) {
    return res.status(401).send('Du måste vara inloggad för att skapa ett inlägg.');
  }
  console.log(`Skapar inlägg för användare: ${username}, Innehåll: ${content}`);
  databas.addPost(username, content)
    .then(() => {
      res.redirect('/posts');
    })
    .catch(error => {
      console.error('Fel vid tillägg av inlägg:', error);
      res.status(500).send('Serverfel vid tillägg av inlägg');
    });
});


app.get('/users', async (req, res) => {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/login'); // Om användaren inte är inloggad, omdirigera till inloggningssidan
  }

  try {
    const userPosts = await databas.getPostsByUser(username);
    res.render('users', { title: 'Ditt konto', username, posts: userPosts });
  } catch (error) {
    console.error('Fel vid hämtning av användarens inlägg:', error);
    res.status(500).send('Serverfel vid hämtning av användarens inlägg');
  }
});

app.post('/logout', (req, res) => {
  // Rensa sessionen
  req.session.destroy(err => {
    if (err) {
      console.error('Fel vid utloggning:', err);
      res.status(500).send('Serverfel vid utloggning');
      return;
    }
    res.redirect('/');
  });
});

app.post('/change-username', async (req, res) => {
  const { newUsername } = req.body;
  const username = req.session.username;
  if (!username) {
    return res.status(401).send('Du måste vara inloggad för att ändra användarnamn.');
  }
  try {
    await databas.updateUsername(username, newUsername);
    req.session.username = newUsername; // Uppdatera sessionens användarnamn
    res.redirect('/users'); // Omdirigera till användarens sida efter ändring av användarnamn
  } catch (error) {
    console.error('Fel vid ändring av användarnamn:', error);
    res.status(500).send('Serverfel vid ändring av användarnamn');
  }
});

app.post('/change-password', async (req, res) => {
  const { newPassword } = req.body;
  console.log('Nytt lösenord:', newPassword);

  const username = req.session.username;
  if (!username) {
    return res.status(401).send('Du måste vara inloggad för att ändra lösenord.');
  }
  try {
    await databas.updatePassword(username, newPassword);
    req.session.password = newPassword; // Uppdatera sessionens användarnamn
    res.redirect('/users'); // Omdirigera till användarens sida efter ändring av användarnamn
  } catch (error) {
    console.error('Fel vid ändring av användarnamn:', error);
    res.status(500).send('Serverfel vid ändring av användarnamn');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servern kör på http://localhost:${PORT}`);
});
