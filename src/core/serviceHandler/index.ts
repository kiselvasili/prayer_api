import * as Promise from 'bluebird';

import { handleError } from '../errorHandler';

class ServiceHandler{
    public handleRequest = (Service: any, cb: any) => {
        return (req: any, res: any) => {
            let result = cb(req);

            result
                .then((response: any) => {
                    console.log('response', response);
                    res.send(response || {})
                })
                .catch((err) => {
                    return Promise.reject(handleError(err, res));
                });
        }
    }
}

export default new ServiceHandler().handleRequest;