const conn = require('./index');

let users = {};

users.all = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM users`, (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
}

users.register = (post) => {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO users SET ?';
        conn.query(sql, post, (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
}

users.login = (post) => {
    const {username, password} = post;
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM users WHERE username = ?';
        conn.query(sql, [username], async (err, result) => {
            if(err) {
                return reject(err);
            }else if(!result || result.length == 0) {
                return reject('Invalid Username/Password');
            }
            return resolve(result[0]);
        })
    })
}

module.exports = users;