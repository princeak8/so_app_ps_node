const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Connection = require('../models/Connection');

exports.socketToken = async (token) => {
    return true;
    const res = await getToken(token);
    return res;
    // setToken = '654321';
    // return (token == setToken);
}

const getToken = async (token) => {
    return Connection.getToken(token).then(async (result) => {
        console.log('result of getToken',result.id);
        let del = await deleteToken(result.id);
        if(!del) console.log('WARNING: token was not deleted');
        return true;
    }).catch((err) => {
        console.log('Error: '+err);
        return false;
    }) 
}


const deleteToken = async (id) => {
    return Connection.deleteToken(id).then(result => {
        if(result.affectedRows > 0) {
            //console.log('result of deleteToken',result);
            return true;
        }else{
            return false;
        }
    }).catch((err) => {
        console.log('Error: '+err);
        return false;
    }) 
}
