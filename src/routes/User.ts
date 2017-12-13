import * as express from 'express';

import handleRequest from '../core/serviceHandler';
import UserService from '../services/user';

import User from '../db/models/User';
import Auth from '../core/auth';

class UserRoute {
    public user: any = express.Router();

    constructor() {
        this.user.get('/login', Auth.loginRequest, handleRequest(UserService, UserService.login));
    }
}

export default new UserRoute().user;