let jwt = require('jsonwebtoken');
let User = require('../models/user');
let authConfig = require('../../config/auth');

let generateToken = (user) => {
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
};

let setUserInfo = (request) => {
    return {
        _id: request._id,
        email: request.email
    };
};

exports.login = (req, res, next) => {
    console.log(req.body);
    let userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
    });
};

exports.register = (req, res, next) => {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;

    if(!email) {
        return res.status(422).send({error: 'You must enter an email address'});
    }

    if(!password) {
        return res.status(422).send({error: 'You must enter a password'});
    }

    User.findOne({email: email}, (err, existingUser) => {
        if(err) {
            return next(err);
        }

        if(existingUser) {
            return res.status(422).send({error: 'That email address is already in use'});
        }

        var user = new User({
            email: email,
            password: password
        });

        user.save((err, user) => {
            if(err) {
                return next(err);
            }

            var userInfo = setUserInfo(user);

            res.status(201).json({
                // token: `JWT ${generateToken(userInfo)}`,
                user: userInfo
            });
        });
    });
};