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


// async function addPost(userId, content) {
//     return new Promise((resolve, reject) => {
//         const query = 'INSERT INTO posts (user_id, content) VALUES (?, ?)';
//         connection.query(query, [userId, content], (error, results, fields) => {
//             if (error) {
//                 reject(new Error('Fel vid tillägg av inlägg:', error));
//                 return;
//             }
//             resolve({ success: true, postId: results.insertId });
//         });
//     });
// }


module.exports = {
    addUser,
    login,
    // addPost
};
