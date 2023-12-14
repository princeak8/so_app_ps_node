const conn = require('./index');

let connections = {};

connections.getToken = (token) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM socket_connections WHERE token = ?';
        conn.query(sql, [token], async (err, result) => {
            if(err) {
                return reject(err);
            }else if(result.length == 0) {
                return reject('Invalid Token: '+result);
            }
            return resolve(result[0]);
        })
    })
}

connections.deleteToken = (id) => {
    return new Promise((resolve, reject) => {
        let sql = "UPDATE `socket_connections` SET `token` = '' WHERE `id` = ?; ";
        conn.query(sql, [id], async (err, result) => {
            if(err) {
                return reject(err);
            }
            return resolve(result);
        })
    })
}

module.exports = connections;