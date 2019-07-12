import * as crypto from 'crypto';

const SALT_LEN = 16;

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
export function genRandomString (length: number){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
export function sha512(password: string, salt: string){
    const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

export function saltHashPassword(userpassword: string) {
    var salt = genRandomString(SALT_LEN); 
    var passwordData = sha512(userpassword, salt);
    return passwordData.passwordHash+passwordData.salt;

}

export function verifySaltHashPassword(hashedPassword: string, userpassword: string) {
    const salt =  hashedPassword.slice(hashedPassword.length - SALT_LEN, hashedPassword.length);
    const reHashedPass = sha512(userpassword, salt).passwordHash;
    return hashedPassword == reHashedPass+salt;
}


