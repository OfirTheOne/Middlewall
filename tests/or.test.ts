

import * as xfw from './../lib/core';
import * as op from './../lib/operations';
import { BrickResultCollection } from './../lib/models'

import { expect } from 'chai';

describe('or operator', function () {
    it('should return with no errors', async () => {
        try {
            // -- 01 -- build the validation stack.
            const validation = xfw.buildStack(
                xfw.or(
                    op.isLen('arr', 3),
                    op.isGt('num', 8)
                )
            ).body();

            // -- 02 -- stub the controller method.
            const req: any = { 
                body: {
                    num: 10, text: 'hello a', arr: [1,2]
                }
            };
            const res: any = {};
            const next = (errors: BrickResultCollection) => {
                // validate the expected errors
                expect(errors).to.be.undefined;
                
            }

            // -- 03 -- run the controller method.
            validation(req, res, next);

        } catch (error) {
            throw error;
        }
    });

    it('should return with errors', async () => {
        try {
            // -- 01 -- build the validation stack.
            const validation = xfw.buildStack(
                xfw.or(
                    op.isLen('arr', 3),
                    op.isGt('num', 10)
                )
            ).body();

            // -- 02 -- stub the controller method.
            const req = { 
                body: {
                    num: 10, text: 'hello a', arr: [1,2]
                }
            };
            const res: any = {};
            const next = (errors: BrickResultCollection) => {
                // validate the expected errors
                expect(errors).to.not.be.undefined;
                expect(errors.errors).to.be.of.length(2);

                const [err01, err02] = errors.errors;

                expect(err01.path).to.be.equals('body.arr');
                expect(err01.value).to.be.equals(req.body.arr);

                expect(err02.path).to.be.equals('body.num');
                expect(err02.value).to.be.equals(req.body.num);
            }

            // -- 03 -- run the controller method.
            await validation(req as any, res, next);

        } catch (error) {
            throw error;
        }
    });
})