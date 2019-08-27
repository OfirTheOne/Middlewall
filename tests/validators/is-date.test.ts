

import { _isDate } from './../../lib/operations/validations/date/validation-logic'
import { expect } from 'chai';

describe('idDate validators', function () {
    it('should pass all validation', async () => {
        try {

            const badInput01 = "ABC";
            const badInput02 = "12-p-2019";
            const badInput03 = "12-p-2019";
            const badInput04 = "2019-08-26T21907:00.000Z";

            const badButGoodInput01 = "123"; // 
            const badButGoodInput02 = "pa-2018/05-31"; // clean
            const goodInput01 = "2019-08-26T21:07:00.000Z";
            const goodInput02 = "2019-08-26";

            expect(_isDate(badInput01)).to.be.false;
            expect(_isDate(badInput02)).to.be.false;
            expect(_isDate(badInput03)).to.be.false;
            expect(_isDate(badInput04)).to.be.false;

            expect(_isDate(badButGoodInput01)).to.be.true;
            expect(_isDate(badButGoodInput02)).to.be.true;
            expect(_isDate(goodInput01)).to.be.true;
            expect(_isDate(goodInput02)).to.be.true;
            

        } catch (error) {
            throw error;
        }
    });

});