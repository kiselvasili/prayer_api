import { handleError } from './../errorHandler/index';
// import * as express from 'express';
import * as Promise from 'bluebird';
import * as passport from 'passport';
import { Strategy, StrategyOptions, ExtractJwt} from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import User from '../../db/models/User';
// import { handleError } from '../errorHandler';

// import * as User from '../../app/models/user';

class Auth {
    constructor() {
        this.configuration();
    }

    private configuration() {
        const jwtOpts = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'helloKostya'
        };

        const facebookOpts = {
            clientID: '2715098495442284',
            clientSecret: '2c23575238242597d931d398c3286fbe',
            callbackURL: 'http://localhost:8080/api/auth/facebook/callback'
            // profileURL    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
            // profileFields : ['id', 'email', 'name']
        };

        passport.use(new Strategy(jwtOpts, function(jwt_payload, done) {
            User.findOne({_id: jwt_payload.id})
                .then(user => {
                    console.log('--------------------------', user);
                    if (!user) {
                        let err = new Error('in passport');
                        return done(err, false);
                    }

                    done(null, user)
                })
        }));

        passport.use('authenticate', new Strategy(jwtOpts, function(jwt_payload, done) {
            done(null, jwt_payload);
        })); 

        passport.use(new FacebookStrategy(facebookOpts, function(token, refreshToken, profile, done) {
            User.findOne({ 'facebook_id' : profile.id }, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, user);
                } else {
                    let newUser = new User();
                    newUser.facebook_id = profile.id;
                    newUser.save(function(err, user) {
                        if (err)
                            throw err;
        
                        return done(null, user);
                    });
                }
            }) 
        }));
    }

    private authenticateRequest(req, res, next) {
        passport.authenticate('authenticate', { session: false }, (err: any, user: any) => {
            if (err) {
                return next(err);
            }
            req.user = user;
            next();
        })(req, res, next);
    }

    static loginFacebookRequest(req, res, next) {
        passport.authenticate('facebook', { session: false }, (err: any, user: any) => {
            if (err) {
                return next(err);
            }
            req.user = user;
            next();
        })(req, res, next);
    }

    static authorizeRequest() {
        return function(req, res, next) {
            console.log('req.user', req.user);
            if (!req.user) {
                console.log('error');
                return handleError(new Error('error'), res);
            }
            next();
        }
    }

    static loginRequest(req, res, next) {
        passport.authenticate('jwt', {session: false}, (err, user) => {
            console.log('------------------------ddfd', user);
            if (user) {
                req.user = user;
            }
            next();
        })(req, res, next);
    }

    public init(app) {
        app.use(passport.initialize());
        app.use(this.authenticateRequest);
    }
}

export default Auth;