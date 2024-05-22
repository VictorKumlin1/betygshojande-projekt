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

async function hashPassword(password) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Fel vid hashning av lösenord:', error);
    }
}

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

async function login(username, password) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE username = ?";
        connection.query(sql, [username], async (error, results) => {
            if (error) {
                reject(new Error('Fel vid inloggning:', error));
                return;
            }
            if (results.length > 0) {
                const user = results[0];
                let passwordMatch = false;

                if (password === user.password || (await bcrypt.compare(password, user.password))) {
                    passwordMatch = true;
                }

                resolve({ success: passwordMatch, user });
            } else {
                resolve({ success: false });
            }
        });
    });
}

async function addPost(username, content) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO posts (username, content) VALUES (?, ?)';
        connection.query(query, [username, content], (error, results, fields) => {
            if (error) {
                console.error('Fel vid tillägg av inlägg:', error);
                reject(new Error('Fel vid tillägg av inlägg: ' + error.message));
                return;
            }
            resolve({ success: true, postId: results.insertId });
        });
    });
}

async function getPosts() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM posts ORDER BY time DESC';
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Fel vid hämtning av inlägg:', error);
                reject(new Error('Fel vid hämtning av inlägg: ' + error.message));
                return;
            }
            resolve(results);
        });
    });
}
async function getPostsByUser(username) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM posts WHERE username = ? ORDER BY time DESC';
        connection.query(query, [username], (error, results) => {
            if (error) {
                console.error('Fel vid hämtning av användarens inlägg:', error);
                reject(new Error('Fel vid hämtning av användarens inlägg: ' + error.message));
                return;
            }
            resolve(results);
        });
    });
}
async function updateUsername(oldUsername, newUsername) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET username = ? WHERE username = ?';
        connection.query(query, [newUsername, oldUsername], (error, results) => {
            if (error) {
                console.error('Fel vid uppdatering av användarnamn:', error);
                reject(new Error('Fel vid uppdatering av användarnamn: ' + error.message));
                return;
            }
            resolve(results);
        });
    });
}

async function updatePassword(username, newPassword) {
    try {
        const hashedPassword = await hashPassword(newPassword);
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET password = ? WHERE username = ?';
            connection.query(query, [hashedPassword, username], (error, results) => {
                if (error) {
                    console.error('Fel vid uppdatering av lösenord:', error);
                    reject(new Error('Fel vid uppdatering av lösenord: ' + error.message));
                    return;
                }
                resolve(results);
            });
        });
    } catch (error) {
        console.error('Fel vid hashning av lösenord:', error);
        throw new Error('Fel vid hashning av lösenord: ' + error.message);
    }
}
module.exports = {
    addUser,
    login,
    addPost,
    getPosts,
    getPostsByUser,
    updateUsername,
    updatePassword
};
