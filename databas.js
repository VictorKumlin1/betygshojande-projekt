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
        const checkQuery = 'SELECT * FROM users WHERE username = ?';
        const existingUser = await new Promise((resolve, reject) => {
            connection.query(checkQuery, [username], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.length > 0);
                }
            });
        });

        if (existingUser) {
            throw new Error('Användarnamnet är redan taget.');
        }

        const hashedPassword = await hashPassword(password);
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const result = await new Promise((resolve, reject) => {
            connection.query(query, [username, hashedPassword], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        console.log('Användare tillagd i databasen');
        return result.insertId;
    } catch (error) {
        console.error('Fel vid tillägg av användare:', error);
        throw error;
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

                if ((await bcrypt.compare(password, user.password))) {
                    passwordMatch = true;
                }

                resolve({ success: passwordMatch, user });
            } else {
                resolve({ success: false });
            }
        });
    });
}


async function addComment(threadId, userId, username, comment) {
    const query = 'INSERT INTO comments (postId, userId, username, comment) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [threadId, userId, username, comment], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function getCommentsByUser(userId) {
    const query = 'SELECT * FROM comments WHERE userId = ? ORDER BY created_at DESC';
    return new Promise((resolve, reject) => {
        connection.query(query, [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
async function addThread(username, userId, title) {
    const query = 'INSERT INTO threads (username, title, userId) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [username, title, userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function getThreads() {
    const query = 'SELECT * FROM threads ORDER BY created_at DESC';
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function getThreadById(threadId) {
    const query = 'SELECT * FROM threads WHERE id = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [threadId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

async function getCommentsByThread(threadId) {
    const query = 'SELECT * FROM comments WHERE postId = ? ORDER BY created_at';
    return new Promise((resolve, reject) => {
        connection.query(query, [threadId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function updateUsername(oldUsername, newUsername) {
    try {
        const checkQuery = 'SELECT * FROM users WHERE username = ?';
        const existingUser = await new Promise((resolve, reject) => {
            connection.query(checkQuery, [newUsername], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.length > 0);
                }
            });
        });
        if (existingUser) {
            throw new Error('Användarnamnet är redan taget.');
        }
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
    } catch (error) {
        console.error('Fel vid uppdatering av användarnamn:', error);
        throw error;
    }
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

async function deleteComment(commentId) {
    const query = 'DELETE FROM comments WHERE id = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [commentId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}




module.exports = {
    addUser,
    login,
    addThread,
    getThreads,
    getThreadById,
    addComment,
    getCommentsByUser,
    getCommentsByThread,
    updateUsername,
    updatePassword,
    deleteComment
};
