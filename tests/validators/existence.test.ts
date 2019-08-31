

import { isEmpty, isExist, isNaN, isNotExist, isNull, isUndefined, includeKeys } from './../../lib/operations/validations/existence'
import { expect } from 'chai';

describe('existence validator', function () {
    it('isEmpty - should pass all validation', async () => {
        try {

            const goodInput01 = "ABC";
            const goodInput02= [1, 2];
            const goodInput03 = (a: any, b: any) => '2';

            
            const badInput01 = ""; 
            const badInput02 = []; 
            const badInput03 = () => '2';

            const validationFn = isEmpty('');

            
            expect((await validationFn('',goodInput01, goodInput01)).pass).to.be.true;
            expect((await validationFn('',goodInput02, goodInput02)).pass).to.be.true;
            expect((await validationFn('',goodInput03, goodInput03)).pass).to.be.true;
            expect((await validationFn('',badInput01, badInput01)).pass).to.be.false;
            expect((await validationFn('',badInput02, badInput02)).pass).to.be.false;
            expect((await validationFn('',badInput03, badInput03)).pass).to.be.false;
            

        } catch (error) {
            throw error;
        }
    });

    it('isExist - should pass all validation', async () => {
        try {

            const goodInput01 = {};
            const goodInput02= "123";
            const goodInput03 = (a: any, b: any) => '2';
            const goodInput04 = 20;

            
            const badInput01 = undefined; 
            const badInput02 = null; 

            const validationFn = isExist('');

            
            expect((await validationFn('',goodInput01, goodInput01)).pass).to.be.true;
            expect((await validationFn('',goodInput02, goodInput02)).pass).to.be.true;
            expect((await validationFn('',goodInput03, goodInput03)).pass).to.be.true;
            expect((await validationFn('',goodInput04, goodInput04)).pass).to.be.true;

            expect((await validationFn('',badInput01, badInput01)).pass).to.be.false;
            expect((await validationFn('',badInput02, badInput02)).pass).to.be.false;
            

        } catch (error) {
            throw error;
        }
    });

    it('isNotExist - should pass all validation', async () => {
        try {

            const badInput01 = {};
            const badInput02= "123";
            const badInput03 = (a: any, b: any) => '2';
            const badInput04 = 20;

            
            const goodInput01 = undefined; 
            const goodInput02 = null; 

            const validationFn = isNotExist('');

            
            expect((await validationFn('',goodInput01, goodInput01)).pass).to.be.true;
            expect((await validationFn('',goodInput02, goodInput02)).pass).to.be.true;
            
            expect((await validationFn('',badInput01, badInput01)).pass).to.be.false;
            expect((await validationFn('',badInput02, badInput02)).pass).to.be.false;
            expect((await validationFn('',badInput03, badInput03)).pass).to.be.false;
            expect((await validationFn('',badInput04, badInput04)).pass).to.be.false;
            

        } catch (error) {
            throw error;
        }
    });

    it('isNaN - should pass all validation', async () => {
        try {

            const goodInput01 = {};
            const goodInput02= "12p3";
            const goodInput03 = (a: any, b: any) => '2';
            const goodInput05 = NaN;

            const badInput01 = 10;
            const badInput02 = '10';
            const badInput03 = null;



            const validationFn = isNaN('');
            
            expect((await validationFn('',goodInput01, goodInput01)).pass).to.be.true;
            expect((await validationFn('',goodInput02, goodInput02)).pass).to.be.true;
            expect((await validationFn('',goodInput03, goodInput03)).pass).to.be.true;
            expect((await validationFn('',goodInput05, goodInput05)).pass).to.be.true;
            
            expect((await validationFn('',badInput01, badInput01)).pass).to.be.false;
            expect((await validationFn('',badInput02, badInput02)).pass).to.be.false;
            expect((await validationFn('',badInput03, badInput03)).pass).to.be.false;

        } catch (error) {
            throw error;
        }
    });

    it('isNull - should pass all validation', async () => {
        try {

            const badInput01 = {};
            const badInput02= "12p3";
            const badInput03 = (a: any, b: any) => '2';
            const badInput04 = NaN;

            const goodInput01 = null;


            const validationFn = isNull('');
            
            expect((await validationFn('',goodInput01, goodInput01)).pass).to.be.true;
            
            expect((await validationFn('',badInput01, badInput01)).pass).to.be.false;
            expect((await validationFn('',badInput02, badInput02)).pass).to.be.false;
            expect((await validationFn('',badInput03, badInput03)).pass).to.be.false;
            expect((await validationFn('',badInput04, badInput04)).pass).to.be.false;

        } catch (error) {
            throw error;
        }
    });

    it('isUndefined - should pass all validation', async () => {
        try {

            const badInput01 = {};
            const badInput02= "12p3";
            const badInput03 = (a: any, b: any) => '2';
            const badInput04 = NaN;

            const goodInput01 = undefined;


            const validationFn = isUndefined('');
            
            expect((await validationFn('',goodInput01, goodInput01)).pass).to.be.true;
            
            expect((await validationFn('',badInput01, badInput01)).pass).to.be.false;
            expect((await validationFn('',badInput02, badInput02)).pass).to.be.false;
            expect((await validationFn('',badInput03, badInput03)).pass).to.be.false;
            expect((await validationFn('',badInput04, badInput04)).pass).to.be.false;

        } catch (error) {
            throw error;
        }
    });

    it('includeKeys - should pass all validation', async () => {
        try {

            const goodInput01 = {};
            const goodInput02 = {a: 1};

            const badInput01 = undefined;
            const badInput02 = null;

            const validationFn01 = includeKeys('', []);
            
            expect((await validationFn01('',goodInput01, goodInput01)).pass).to.be.true;
            expect((await validationFn01('',goodInput02, goodInput02)).pass).to.be.true;

            expect((await validationFn01('',badInput01, badInput01)).pass).to.be.false;
            expect((await validationFn01('',badInput02, badInput02)).pass).to.be.false;
            

            const goodInput03 = {a: 1, b: 2};

            const validationFn02 = includeKeys('', ["a", "b"]);

            expect((await validationFn02('',goodInput03, goodInput03)).pass).to.be.true;
            expect((await validationFn02('',badInput01, badInput01)).pass).to.be.false;
            expect((await validationFn02('',badInput02, badInput02)).pass).to.be.false;

        } catch (error) {
            throw error;
        }
    });

});