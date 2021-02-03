const express = require('express');
const AuthService = require('./auth-service');
const authRouter = express.Router();

authRouter
    .route('/login')
    .all((req, res, next) => {
        knexInstance = req.app.get('db');
        next();
    })
    .post((req, res, next) => {
        const { password, email } = req.body;
        const user = { password, email};
        for ( const field of ['email', 'password']){
            if(!req.body[field]){
                return res.status(400).json({
                    error: `Missing ${field}`,
                })
            }
        }
        AuthService.getUserEmail(knexInstance, email).then((logUser) => {
            if(!logUser){
                return res.status(400).json({
                    error: 'Incorrect email or password',
                });
            }
            AuthService.comparePasswords(password, logUser.password).then(
                (match) => {
                    if(!match){
                        return res.status(400).json({
                            error: 'Incorrect email or password',
                        })
                    }
                    const subject = logUser.email,
                    const payload = {userid: logUser.id};
                    res.send({
                        authToken: AuthService.createJwt(subject, payload),
                    })
                }
            )
        })
    })

module.exports = authRouter;