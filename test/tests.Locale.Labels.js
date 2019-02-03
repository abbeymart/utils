/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-01-06 | @Updated: 2019-02-03
 * @Company: mConnect.biz | @License: MIT
 * @Description: @mconnect/utils testing, locales/Labels
 */

const { suite, test, before } = require('mocha');

const path  = require('path');
const utils = require('../index');
const ok    = require('./assert');

const solution     = "Solution",
      packageGroup = "Package Group",
      packageName  = "Package";

const localeFiles = {
    'en-US': path.join(__dirname, 'json/labels/enUSLabels.json'),
    'en-CA': path.join(__dirname, 'json/labels/enCALabels.json'),
    'fr-CA': path.join(__dirname, 'json/labels/frCALabels.json'),
    'fr-FR': path.join(__dirname, 'json/labels/frFRLabels.json'),
};

let mcUtils,
    options = {};
before(() => {
    mcUtils = utils(options);
});

suite('@mconnect/locales package Testing - Labels:', () => {
    suite('Positive testing:', () => {
        test('should return valid solution', () => {
            const req = mcUtils.getLocale(localeFiles, options);
            ok(req[ 'solution' ] === solution, `response should be: ${solution}`);
        });
        test('should return valid packageGroup', () => {
            const req = mcUtils.getLocale(localeFiles, options);
            ok(req[ 'packageGroup' ] === packageGroup, `response should be: ${packageGroup}`);
        });
        test('should return valid package-name', () => {
            const req = mcUtils.getLocale(localeFiles, options);
            ok(req[ 'package' ] === packageName, `response should be: ${packageName}`);
        });
    });

    suite('Negative testing:', () => {
        test('should not return invalid solution', () => {
            const sol = 'mconnect100';
            const req = mcUtils.getLocale(localeFiles, options);
            ok(req[ 'solution' ] !== sol, `response should be ${solution}`);
        });
    });
});