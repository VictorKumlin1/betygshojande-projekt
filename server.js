const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const databas = require('./databas');

const app = express();

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('home', { title: 'Välkommen' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Registrering' });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log(`Username: ${username}, Password: ${password}`);
  res.send('Registrering lyckades!');
  databas.addUser(username, password);

});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Username: ${username}`);
  try {
    const loginResult = await databas.login(username, password);
    if (loginResult.success) {
      res.send('Inloggning lyckades!');
    } else {
      res.send('Inloggning misslyckades');
    }
  } catch (error) {
    console.error('Fel vid inloggning:', error);
    res.status(500).send('Serverfel');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servern kör på http://localhost:${PORT}`);
});
