import chai from 'chai';
import mocha from 'mocha';

import Validator from '../src';

const { it, describe } = mocha;
const { expect } = chai;

describe('CONNECTION', () => {
    it('SHOULD CONNECT to database with connect method', async () => {
        const test = 'Test String';
        Validator({ test }).isString();
    });
});
