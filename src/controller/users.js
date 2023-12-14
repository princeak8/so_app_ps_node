const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.socketToken = (token) => {
    setToken = '654321';
    return (token == setToken);
}

exports.register = async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;
    const email = req.body.email;
    let post = {username: username, password: password, email: email};
    try{
        User.register(post).then(result => {
            console.log(result);
            res.status(201).json({
                statusCode: 200,
                message: 'User registered successfully'
            });
        }).catch((err) => {
            console.log('could not add user: '+err);
            res.status(500).json({
                statusCode: 500,
                message: 'could not add user: '+err
            });
        }) 
    }catch(err){
        console.log('could not add user: '+err);
        res.status(500).json({
            statusCode: 500,
            message: 'could not add user: '+err
        });
    }
}

exports.login = async (req, res) => {
    const { username, password} = req.body;
    if(!username || !password) {
        console.log('Username and Password must be set');
        res.status(404).json({
            statusCode: 404,
            message: 'Please provide a username and password'
        });
    }else{
        let post = {username: username, password: password};
        try{
            User.login(post).then(result => {
                bcrypt.compare(password, result.password, (err, ans) => {
                    if(err) {
                        console.log('could not login: Wrong Username/Password');
                        res.status(500).json({
                            statusCode: 500,
                            message: 'could not login: Wrong Username/Password'
                        });
                    }else if(ans) {
                        console.log(result);
                        const token = jwt.sign({
                                username: result.username,
                                userId: result.id,
                                email: result.email
                            }, process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );
                        res.status(200).json({
                            statusCode: 200,
                            token: token,
                            message: 'User logged in successfully'
                        });
                    }else{
                        console.log('could not login: Wrong Username/Password');
                        res.status(500).json({
                            statusCode: 500,
                            message: 'could not login: Wrong Username/Password'
                        });
                    }
                });
            }).catch((err) => {
                console.log('could not login: '+err);
                res.status(500).json({
                    statusCode: 500,
                    message: 'could not login: '+err
                });
            }) 
        }catch(err){
            console.log('could not login: '+err);
            res.status(500).json({
                statusCode: 500,
                message: 'could not login: '+err
            });
        }
    }
}