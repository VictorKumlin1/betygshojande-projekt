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

function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/');
  }
  next();
}

app.get('/', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/');
  }


  res.render('home', { title: 'Välkommen' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Registrering' });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userId = await databas.addUser(username, password);
    req.session.userId = userId;
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
      req.session.userId = loginResult.user.userId;
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



app.get('/users', requireLogin, async (req, res) => {
  const userId = req.session.userId;
  try {
    const userComments = await databas.getCommentsByUser(userId);
    const username = req.session.username;
    res.render('users', { title: 'Ditt konto', username: username, comments: userComments });
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
  const userId = req.session.userId;
  const username = req.session.username;

  try {
    await databas.addThread(username, userId, title);
    res.redirect('/threads');
  } catch (error) {
    res.status(500).send('Serverfel vid tillägg av thread');
  }
});

app.get('/threads/:id', requireLogin, async (req, res) => {
  const threadId = req.params.id;
  try {
    const thread = await databas.getThreadById(threadId);
    const posts = await databas.getCommentsByThread(threadId);
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
  const userId = req.session.userId;
  const username = req.session.username;

  try {
    await databas.addComment(threadId, userId, username, comment);
    res.redirect(`/threads/${threadId}/comments`);
  } catch (error) {
    res.status(500).send('Serverfel vid tillägg av kommentar');
  }
});

app.post('/delete-comment/:id', requireLogin, async (req, res) => {
  const commentId = req.params.id;
  try {
    await databas.deleteComment(commentId);
    res.redirect('/users');
  } catch (error) {
    console.error('Fel vid borttagning av kommentar:', error);
    res.status(500).send('Serverfel vid borttagning av kommentar');
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
