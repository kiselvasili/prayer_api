import * as Promise from 'bluebird';
import * as jwt from 'jsonwebtoken'

import User from '../db/models/User';

class AuthService {
    constructor() {}

    static register(req) {
        let email = req.body.email;
        let password = req.body.password;

        if(!email) {
            return Promise.reject(new Error('You must enter an email address'));
        }
    
        if(!password) {
            return Promise.reject(new Error('You must enter a password'));
        }

        return User.findOne({email: email})
            .then((err, user) => {
                console.log('user', user);
                if (err) {
                    return Promise.reject(new Error('Finding error'));
                }

                if (user) {
                    return Promise.reject(new Error('That email address is already in use'));
                }

                let newUser = new User({
                    email: email,
                    password: password
                });

                console.log('newUser', newUser);

                return newUser.save()
                    .then( user => {
                        return;
                        // let token = jwt.sign(JSON.stringify({
                        //     id: user._id
                        // }), 'helloKostya');

                        // console.log('token', token);
                        
                        // return {
                        //     token: 'Bearer ' + token
                        // };
                    });
            });
    }

    static authorize(req) {
        let email = req.body.email;
        let password = req.body.password;

        return User.findOne({email: email})
            .then(user => {
                if (!user || user.password !== password) {
                    return Promise.reject(new Error('error'));
                }

                let token = jwt.sign(JSON.stringify({
                    id: user._id
                }), 'helloKostya');
                
                return {
                    token: 'Bearer ' + token
                };
            });
    }

    // static authorizeFacebook(req) {
    //     let token = jwt.sign(JSON.stringify({
    //         id: req.user._id
    //     }), 'helloKostya');
        
    //     return Promise.resolve({
    //         token: 'Bearer ' + token
    //     });
    // }

    static authorizeFacebook(req) {
        let facebookID = req.body.id;
        if (!facebookID) {
            return Promise.reject(new Error('error'));
        }
        return User.findOne({ facebook_id : facebookID })
            .then(user => {
                if (user) {
                    let token = jwt.sign(JSON.stringify({
                        id: user._id
                    }), 'helloKostya');
                    
                    return Promise.resolve({
                        token: 'Bearer ' + token
                    });
                } else {
                    let newUser = new User();
                    newUser.facebook_id = facebookID;
                    return newUser.save()
                        .then(user => {
                        // if (err) {
                        //     return Promise.reject(new Error('error'));
                        // }
        
                        let token = jwt.sign(JSON.stringify({
                            id: user._id
                        }), 'helloKostya');
                        
                        return Promise.resolve({
                            token: 'Bearer ' + token
                        });
                    });
                }
            }) 
    }
}

export default AuthService;