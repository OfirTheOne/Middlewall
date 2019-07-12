

import * as xfw from './../../../../../lib'
import * as cryptoUtils from '../../../../utils';

const AuthHeaderSecret = 'secret_header_123';

console.log(cryptoUtils.saltHashPassword(AuthHeaderSecret));

export class AuthValidator {


    static authHeaderValidator = xfw.buildStack(
        xfw.isExist('x-auth'),
        xfw.run('x-auth', 
            async (authHeader: string) => await cryptoUtils.verifySaltHashPassword(authHeader, AuthHeaderSecret)
        , undefined, 'auth header failed')
    ).headers();


    static userCredentialsValidator = xfw.buildStack(
        xfw.isEmail('user.email'),
        xfw.isOWASPStrongPassword('user.password')
    ).body();

    static userSignUpValidator = xfw.buildStack(
        xfw.isEmail('user.email'),
        xfw.isOWASPStrongPassword('user.password'),
        xfw.or(
            xfw.isAlpha('user.firstName'),
            xfw.isAlpha('user.lastName'),
            xfw.isNumber('user.age'),
            xfw.isURL('user.profilePicture'),
        )
    ).body();
    
}