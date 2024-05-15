const mysql = require('mysql');

// Konfigurera anslutningsparametrar
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'betygshöjandeprojekt'
});

// Anslut till databasen
connection.connect((err) => {
    if (err) {
        console.error('Fel vid anslutning till databasen:', err);
        return;
    }
    console.log('Ansluten till databasen');
});

// Funktion för att lägga till användare i databasen
function addUser(username, password) {
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(query, [username, password], (error, results, fields) => {
        if (error) {
            console.error('Fel vid tillägg av användare:', error);
            return;
        }
        console.log('Användare tillagd i databasen');
    });
}

// Andra funktioner för databasanrop kan läggas till här

module.exports = {
    addUser,
    // Exportera andra funktioner här om du behöver dem
};
