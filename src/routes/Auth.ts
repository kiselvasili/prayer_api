import * as express from 'express';
import * as passport from 'passport';

import AuthService from '../services/Auth';
import handleRequest from '../core/serviceHandler';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import User from '../db/models/User';
import Auth from '../core/auth';

class AuthRoute {
    public auth: any = express.Router();

    constructor() {
        // this.auth.get('/facebook', Auth.loginFacebookRequest);
        // this.auth.get('/facebook/callback', Auth.loginFacebookRequest, handleRequest(AuthService, AuthService.authorizeFacebook));
        this.auth.post('/', handleRequest(AuthService, AuthService.authorize));
        this.auth.post('/facebook', Auth.loginRequest, handleRequest(AuthService, AuthService.authorizeFacebook));
        this.auth.post('/register', handleRequest(AuthService, AuthService.register));
    }
}

export default new AuthRoute().auth;