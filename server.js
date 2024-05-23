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

// Middleware-funktion för att kontrollera inloggning
function requireLogin(req, res, next) {
  if (!req.session.username) {
    return res.redirect('/');
  }
  next();
}

app.get('/', (req, res) => {
  if (req.session.username) {
    return res.redirect('/threads');
  }
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
    res.redirect('/threads');
  } catch (error) {
    let errorMessage = 'Serverfel vid registrering';
    if (error.message === 'Användarnamnet är redan taget.') {
      errorMessage = 'Användarnamnet är redan taget. Vänligen välj ett annat.';
    }
    res.render('register', { title: 'Registrering', error: errorMessage });
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
      res.redirect('/threads');
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

app.post('/posts', requireLogin, (req, res) => {
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

app.get('/users', requireLogin, async (req, res) => {
  const username = req.session.username;

  try {
    const userComments = await databas.getCommentsByUser(username);
    res.render('users', { title: 'Ditt konto', username, comments: userComments });
  } catch (error) {
    console.error('Fel vid hämtning av användarens kommentarer:', error);
    res.status(500).send('Serverfel vid hämtning av användarens kommentarer');
  }
});

app.post('/change-username', requireLogin, async (req, res) => {
  const { newUsername } = req.body;
  const username = req.session.username;

  try {
    await databas.updateUsername(username, newUsername);
    req.session.username = newUsername;
    res.redirect('/users');
  } catch (error) {
    let errorMessage = 'Serverfel vid ändring av användarnamn';
    if (error.message === 'Användarnamnet är redan taget.') {
      errorMessage = 'Användarnamnet är redan taget. Vänligen välj ett annat.';
    }
    try {
      const userComments = await databas.getCommentsByUser(username);
      res.render('users', { title: 'Ditt konto', username, comments: userComments, error: errorMessage });
    } catch (fetchError) {
      res.status(500).send('Serverfel vid hämtning av användarens kommentarer');
    }
  }
});

app.post('/change-password', requireLogin, async (req, res) => {
  const { newPassword } = req.body;
  console.log('Nytt lösenord:', newPassword);

  const username = req.session.username;
  try {
    await databas.updatePassword(username, newPassword);
    req.session.password = newPassword;
    res.redirect('/users');
  } catch (error) {
    console.error('Fel vid ändring av lösenord:', error);
    res.status(500).send('Serverfel vid ändring av lösenord');
  }
});

app.get('/threads', requireLogin, async (req, res) => {
  try {
    const threads = await databas.getThreads();
    res.render('thread', { title: 'Threads', threads });
  } catch (error) {
    res.status(500).send('Serverfel vid hämtning av threads');
  }
});

app.post('/threads', requireLogin, async (req, res) => {
  const { title } = req.body;
  const username = req.session.username;

  try {
    await databas.addThread(username, title);
    res.redirect('/threads');
  } catch (error) {
    res.status(500).send('Serverfel vid tillägg av thread');
  }
});

app.get('/threads/:id', requireLogin, async (req, res) => {
  const threadId = req.params.id;
  try {
    const thread = await databas.getThreadById(threadId);
    const posts = await databas.getCommentsByComments(threadId);
    res.render('thread', { title: thread.title, thread, posts });
  } catch (error) {
    res.status(500).send('Serverfel vid hämtning av thread');
  }
});

app.get('/threads/:id/comments', requireLogin, async (req, res) => {
  const threadId = req.params.id;
  try {
    const thread = await databas.getThreadById(threadId);
    const comments = await databas.getCommentsByThread(threadId);
    res.render('comments', { title: 'Kommentarer', thread, comments });
  } catch (error) {
    res.status(500).send('Serverfel vid hämtning av kommentarer');
  }
});

app.post('/threads/:id/comments', requireLogin, async (req, res) => {
  const threadId = req.params.id;
  const { comment } = req.body;
  const username = req.session.username;
  try {
    await databas.addComment(threadId, username, comment);
    res.redirect(`/threads/${threadId}/comments`);
  } catch (error) {
    res.status(500).send('Serverfel vid tillägg av kommentar');
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).send('Serverfel vid utloggning');
    } else {
      res.redirect('/');
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servern kör på http://localhost:${PORT}`);
});
