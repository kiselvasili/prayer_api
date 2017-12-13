import * as Promise from 'bluebird';

import User from '../db/models/User';

class UserService {
    constructor() {}

    static login(req) {
        let params = req.user;
        
        let user = {
            id: params._id
        };
        console.log('login', user);

        return Promise.resolve(user);
    }

    static loginFacebook(req) {
        let params = req.user;
        console.log('facebook login');
        console.log(params);
        return Promise.resolve(params);
    }
}

export default UserService;

