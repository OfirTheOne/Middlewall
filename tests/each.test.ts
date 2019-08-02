

import * as xfw from './../lib/core';
import * as op from './../lib/operations';
import { expect } from 'chai';
import { BrickResultCollection } from '../lib/models';

describe('each operator', function () {
    it('should return with no errors', async () => {
        try {
            // -- 01 -- build the validation stack.
            const validation = xfw.buildStack(
                xfw.goTo('items', 
                    xfw.each(
                        op.isArray('arr'),
                        op.isString('text'),
                        op.isNumber('num'),
                    )
                )
            ).body();

            // -- 02 -- stub the controller method.
            const req = { 
                body: {
                    items: [
                        { num: 10, text: 'hello a', arr: [1,2] },
                        { num: 11, text: 'hello b', arr: [3,4] },
                        { num: 12, text: 'hello c', arr: [5,6] }
                    ]
                }
            };
            const res: any = {};
            const next = (errors: BrickResultCollection) => {
                // validate the expected errors
                expect(errors).to.be.undefined;
                
            }

            // -- 03 -- run the controller method.
            validation(req as any, res, next);

        } catch (error) {
            throw error;
        }
    });

    it('should return with errors', async () => {
        try {
            // -- 01 -- build the validation stack.
            const validation = xfw.buildStack(
                xfw.goTo('items', 
                    xfw.each(
                        op.isArray('arr'),
                        op.isString('text'),
                        op.isNumber('num'),
                    )
                )
            ).body();

            // -- 02 -- stub the controller method.
            const req = { 
                body: {
                    items: [
                        { num: 10, text: 'hello a', arr: [1,2] },
                        { num: '11', text: 'hello b', arr: [3,4] },
                        { num: 12, text: 'hello c', arr: [5,6] }
                    ]
                }
            };
            const res: any = {};
            const next = (errors: BrickResultCollection) => {
                // validate the expected errors
                expect(errors).to.not.be.undefined;

                expect(errors.errors).to.be.of.length(1);

                const [err01] = errors.errors;

                expect(err01.path).to.be.equals('body.items[1].num');
            }

            // -- 03 -- run the controller method.
            await validation(req as any, res, next);

        } catch (error) {
            throw error;
        }
    });
})