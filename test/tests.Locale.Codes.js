/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-01-03 | @Updated: 2019-02-03
 * @Company: mConnect.biz | @License: MIT
 * @Description: @mconnect/utils testing, locales/Codes
 */

const {suite, test, before} = require('mocha');

const path  = require('path');
const utils = require('../index');
const ok    = require('./assert');

let res;
//const localeFiles = {
//    'en-US': path.join(__dirname, 'json/codes/enUSCodes.json'),
//    'en-CA': path.join(__dirname, 'json/codes/enCACodes.json'),
//    'fr-CA': path.join(__dirname, 'json/codes/frCACodes.json'),
//    'fr-FR': path.join(__dirname, 'json/codes/frFRCodes.json'),
//};

const localeFiles = {
    'en-US': path.join(__dirname, 'js/codes/enUSCodes.js'),
    'en-CA': path.join(__dirname, 'js/codes/enCACodes.js'),
    'fr-CA': path.join(__dirname, 'js/codes/frCACodes.js'),
    'fr-FR': path.join(__dirname, 'js/codes/frFRCodes.js'),
};

let mcUtils,
    options = {};
before(() => {
    mcUtils = utils(options);
});


suite('@mconnect/locales package Testing - Codes:', () => {
    suite('Positive testing:', () => {
        test('should return valid type', () => {
            res       = "langType";
            const req = mcUtils.getLocale2(localeFiles, options);
            ok(res === req[0].type, `response should be: ${res}`);
        });
        test('should return valid description', () => {
            res       = "Languages (en-US, en-CA, en-UK, fr-CA, fr-FR etc.)";
            const req = mcUtils.getLocale2(localeFiles, options);
            ok(res === req[0].desc, `response should be: ${res}`);
        });
        test('should return valid isActive status', () => {
            res       = true;
            const req = mcUtils.getLocale2(localeFiles, options);
            ok(res === req[0].isActive, `response should be: ${res}`);
        });
        test('should return items.length > 0', () => {
            res       = 0;
            const req = mcUtils.getLocale2(localeFiles, options);
            ok(req[0].items.length > res, `response should be greater than: ${res}`);
        });
        test('should return items.length < 20', () => {
            res       = 20;
            const req = mcUtils.getLocale2(localeFiles, options);
            ok(req[0].items.length < res, `response should be less than: ${res}`);
        });
    });

    suite('Negative testing:', () => {
        test('should not return invalid desc', () => {
            res       = "Languages (en-US, en-CA, en-UK, fr-CA, fr-FR etc....)";
            const req = mcUtils.getLocale2(localeFiles, options);
            ok(res !== req[0].desc, `response should not be: ${res}`);
        });
    });
});
