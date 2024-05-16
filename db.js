const mysql = require('mysql');
const bcrypt = require("bcrypt");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'betygshöjandeprojekt'
});

connection.connect((err) => {
    if (err) {
        console.error('Fel vid anslutning till databasen:', err);
        return;
    }
    console.log('Ansluten till databasen');
});

// Funktion för att skapa en hash av ett lösenord
async function hashPassword(password) {
    try {
        const saltRounds = 10; // Antal salt rundor för bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Fel vid hashning av lösenord:', error);
    }
}

// Funktion för att lägga till användare i databasen
async function addUser(username, password) {
    try {
        const hashedPassword = await hashPassword(password);
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        connection.query(query, [username, hashedPassword], (error, results, fields) => {
            if (error) {
                console.error('Fel vid tillägg av användare:', error);
                return;
            }
            console.log('Användare tillagd i databasen');
        });
    } catch (error) {
        console.error('Fel vid tillägg av användare:', error);
    }
}



module.exports = {
    addUser,
};
