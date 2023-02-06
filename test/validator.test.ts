import chai from 'chai';
import mocha from 'mocha';

import Validator from '../src';

const { it, describe } = mocha;
const { expect } = chai;

describe('CONNECTION', () => {
    describe('isString', () => {
        it('SHOULD VALIDATE variable as String', () => {
            const test = 'Test String';
            Validator({ test }).isString();
        });
        it('SHOULD VALIDATE variable as String and return validations', () => {
            const test = 'Test String';
            const validated = Validator({ test }).isString().validations();
            expect(validated).to.have.lengthOf(1);
            expect(validated[0]).to.have.keys([
                'validated',
                'variable',
                'value'
            ]);
        });
        it('SHOULD VALIDATE variable as String and return if validated', () => {
            const test = 'Test String';
            const validated = Validator({ test }).isString().validated();
            expect(validated).to.equal(true);
        });
        it('SHOULD VALIDATE 3 variables as String and return if validated', () => {
            const test = 'Test String';
            const test2 = 'Test String';
            const test3 = 'Test String';
            const validated = Validator({ test, test2, test3 })
                .isString()
                .validated();
            expect(validated).to.equal(true);
        });
        it('SHOULD VALIDATE 3 variables as String and return validations', () => {
            const test = 'Test String';
            const test2 = 'Test String';
            const test3 = 'Test String';
            const validated = Validator({ test, test2, test3 })
                .isString()
                .validations();

            expect(validated).to.have.lengthOf(3);
            expect(validated[0]).to.have.keys([
                'validated',
                'variable',
                'value'
            ]);
        });
        it('SHOULD THROW error', () => {
            const test = 3;
            try {
                const validated = Validator({ test }).isString().throwError();
            } catch (err) {
                console.log(err);
            }
        });
    });
});
