

import { or, compose } from './../../lib/core';
import * as op from './../../lib/operations';
import { BrickResultCollection } from './../../lib/models'

import { expect } from 'chai';

describe('validation-options', function () {
    it('should return with no errors and set default values', async () => {
        try {
            // -- 01 -- build the validation stack.
            const validation = compose(
                or(
                    op.isLen('arr', 3, undefined, undefined, { optional: true, default: [1, 2, 3]}),
                    op.isGt('num', 8)
                )
            ).body();

            // -- 02 -- stub the controller method.
            const req: any = { 
                body: {
                    num: 1, text: 'hello a'
                }
            };
            const res: any = {};
            const next = (errors: BrickResultCollection) => {
                // validate the expected errors
                expect(errors).to.be.undefined;
                expect(req.body.arr).to.be.eqls([1, 2, 3]);
            }

            // -- 03 -- run the controller method.
            validation(req, res, next);

        } catch (error) {
            throw error;
        }
    });

    it('should return with no errors and not set value of is-pass cb', async () => {
        try {
            // -- 01 -- build the validation stack.
            const validation = compose(
                or(
                    op.isLen('arr', 3, () => [1,1], undefined, { optional: true, overwriteValue: true, default: [2,2] }),
                    op.isGt('num', 8, () => 100)
                )
            ).body();

            // -- 02 -- stub the controller method.
            const req: any = { 
                body: {
                    num: 9, text: 'hello a'
                }
            };
            const res: any = {};
            const next = (errors: BrickResultCollection) => {
                // validate the expected errors
                // console.log(errors);
                expect(errors).to.be.undefined;
                expect(req.body.num).to.be.eqls(9);
                expect(req.body.arr).to.be.eqls([2,2]);
            }

            // -- 03 -- run the controller method.
            validation(req, res, next);

        } catch (error) {
            throw error;
        }
    });
})