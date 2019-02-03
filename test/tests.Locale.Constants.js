/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-01-06 | @Updated: 2019-02-03
 * @Company: mConnect.biz | @License: MIT
 * @Description: @mconnect/utils testing, locales/Constants
 */

const { suite, test, before } = require('mocha');

const path  = require('path');
const utils = require('../index');
const ok    = require('./assert');

const SHORT_DESC     = 20;
const MAX_FILE_COUNT = 10;
const LOGIN_TIMEOUT  = 86400000;
const DEFAULT_LANG   = "en-US";

const localeFiles = {
    'en-US': path.join(__dirname, 'json/constants/enUSConstants.json'),
    'en-CA': path.join(__dirname, 'json/constants/enCAConstants.json'),
    'fr-CA': path.join(__dirname, 'json/constants/frCAConstants.json'),
    'fr-FR': path.join(__dirname, 'json/constants/frFRConstants.json'),
};

let mcUtils,
    options = {
        type: 'mcConstants',
    };
before(() => {
    mcUtils = utils(options);
});

suite('@mconnect/locales package Testing - Constants:', () => {
    suite('Positive testing:', () => {
        test('should return valid SHORT_DESC', () => {
            const req = mcUtils.getLocale(localeFiles, options);
            ok(req.getShortDesc() === SHORT_DESC, `response should be: ${SHORT_DESC}`);
        });
        test('should return valid MAX_FILE_COUNT', () => {
            const req = mcUtils.getLocale(localeFiles, options);
            ok(req.getMaxFileCount() === MAX_FILE_COUNT, `response should be: ${MAX_FILE_COUNT}`);
        });
        test('should return valid LOGIN_TIMEOUT', () => {
            const req = mcUtils.getLocale(localeFiles, options);
            ok(req.getLoginTimeout() === LOGIN_TIMEOUT, `response should be: ${LOGIN_TIMEOUT}`);
        });
        test('should return valid DEFAULT_LANG', () => {
            const req = mcUtils.getLocale(localeFiles, options);
            ok(req.getDefaultLanguage() === DEFAULT_LANG, `response should be: ${DEFAULT_LANG}`);
        });
    });

    suite('Negative testing:', () => {
        test('should not return invalid MAX_FILE_COUNT', () => {
            const req = mcUtils.getLocale(localeFiles, options);
            ok(req.getMaxFileCount() < 11, `response should not be greater than ${MAX_FILE_COUNT}`);
        });
    });
});