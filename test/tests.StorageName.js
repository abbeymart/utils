/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-01-06 | @Updated: 2019-01-06
 * @Company: mConnect.biz | @License: MIT
 * @Description: @abbeymart/utils testing, localStorage Name
 */

const suite  = require('mocha').suite;
const test   = require('mocha').test;
const before = require('mocha').before;
const utils  = require('../index');
const ok     = require('./assert');

let mcUtils,
    options = {
        storageName: 'testStore',
    };
const defaultStorage = 'mconnectStore';
before( () => {
    mcUtils = utils(options);
});

suite('@mconnect/locales package Testing - localStorage Name:', () => {
    suite('Positive testing:', () => {
        test('should return valid storageName, set in options{}', async () => {
            const req = await mcUtils.mcStoreTest();
            ok(req === options.storageName, `response should be: ${options.storageName}`);
        });
        test('should return default storageName (mconnectStore)', async () => {
            mcUtils = utils();
            const req = await mcUtils.mcStoreTest();
            ok(req === defaultStorage, `response should be: ${defaultStorage}`);
        });
    });
    suite('Negative testing:', () => {
        test('should not return default storageName (mconnectStore)', async () => {
            mcUtils = utils(options);
            const req = await mcUtils.mcStoreTest();
            ok(req !== defaultStorage, `response should be: ${options.storageName}`);
        });
    });
});