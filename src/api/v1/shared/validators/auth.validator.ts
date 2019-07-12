

import * as xfw from './../../../../../lib'
import * as cryptoUtils from '../../../../utils';

const AuthHeaderSecret = 'secret_header_123';

console.log(cryptoUtils.saltHashPassword(AuthHeaderSecret));

export class AuthValidator {


    static authHeaderValidator = xfw.buildStack(
        xfw.run('x-auth', async (authHeader: string) => {
            return await cryptoUtils.verifySaltHashPassword(authHeader, AuthHeaderSecret);
        }, undefined, 'auth header failed')
    ).headers();
    
}