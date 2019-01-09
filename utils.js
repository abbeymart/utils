/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-01-02 | @Updated: 2019-01-06
 * @Company: mConnect.biz | @License: MIT
 * @Description: @abbeymart/utils, utility functions
 */

const axios  = require('axios');

function utils( options = {} ) {
    return {
        async mcStore() {
            // localforage instance for client/UI only
            const storageName = options && options.storageName ? options.storageName : 'mconnectStore';
            console.log('store-name: ', storageName);
            return await localforage.createInstance({ name: storageName, });
        },
        async mcStoreTest() {
            // NOTE: *****this method is strictly for testing only*****
            // localforage instance for client/UI only
            const storageName = options && options.storageName ? options.storageName : 'mconnectStore';
            console.log('store-name: ', storageName);
            return storageName;
        },
        getLanguage( userLang = 'en-US' ) {
            // Define/set default language variable
            let defaultLang = 'en-US';

            // Set defaultLang to current userLang, set from the UI
            if ( userLang ) {
                defaultLang = userLang;
            }
            return defaultLang;
        },
        getLocale( localeFiles, options = {} ) {
            // validate localeFiles as an object
            if ( typeof localeFiles !== 'object' ) {
                return {
                    code   : 'paramsError',
                    message: 'Locale files should be an object',
                };
            }
            // validate localeFiles as an object with non-empty values
            if ( Object.keys(localeFiles).length < 1 || Object.values(localeFiles).length < 1 ) {
                return {
                    code   : 'paramsError',
                    message: 'localeFiles should be an object with language:fileLocator key:value pairs',
                };
            }
            // validate localeFiles object-value(s) as json file format, for all languages
            let isJson = false;
            isJson     = Object.values(localeFiles).every(localeFile => {
                const fileItems = localeFile.split('.');
                const fileExt   = fileItems[ fileItems.length - 1 ];
                return ! ! ( fileExt === 'json' );
            });
            if ( ! isJson ) {
                return {
                    code   : 'invalidFilename',
                    message: 'Locale file (fileLocator) should be a json file',
                }
            }

            const localeType = options && options.type ? options.type : '';
            const language   = options && options.language ? options.language : 'en-US';
            const myLocale   = require(localeFiles[ language ]); // converted json to js-object

            switch ( localeType ) {
                case 'mcConstants':
                    return {
                        getShortDesc() {
                            return myLocale.SHORT_DESC;
                        },
                        getDefaultLanguage() {
                            return myLocale.DEFAULT_LANG;
                        },
                        getDefaultCurrency() {
                            return myLocale.DEFAULT_CURRENCY;
                        },
                        getDDPLimit() {
                            return myLocale.DDP_LIMIT;
                        },
                        getCreateLogType() {
                            return myLocale.CREATE_LOG_TYPE;
                        },
                        getUpdateLogType() {
                            return myLocale.UPDATE_LOG_TYPE;
                        },
                        getRemoveLogType() {
                            return myLocale.REMOVE_LOG_TYPE;
                        },
                        getSearchLogType() {
                            return myLocale.SEARCH_LOG_TYPE;
                        },
                        getLoginType() {
                            return myLocale.LOGIN_LOG_TYPE;
                        },
                        getLogoutType() {
                            return myLocale.LOGOUT_LOG_TYPE;
                        },
                        getLoginTimeout() {
                            return myLocale.LOGIN_TIMEOUT;
                        },
                        getStateTimeout() {
                            return myLocale.STATE_TIMEOUT;
                        },
                        getRememberMeTimeout() {
                            return myLocale.REMEMBER_TIMEOUT;
                        },
                        getLogCreate() {
                            return myLocale.LOG_CREATE;
                        },
                        getLogRead() {
                            return myLocale.LOG_READ;
                        },
                        getLogUpdate() {
                            return myLocale.LOG_UPDATE;
                        },
                        getLogDelete() {
                            return myLocale.LOG_DELETE;
                        },
                        getLogLogin() {
                            return myLocale.LOG_LOGIN;
                        },
                        getLogLogout() {
                            return myLocale.LOG_LOGOUT;
                        },
                        getMaxFileCount() {
                            return myLocale.MAX_FILE_COUNT;
                        },
                        getMaxFileSize() {
                            return myLocale.MAX_FILE_SIZE;
                        },
                        getMaxProductQuantity() {
                            return myLocale.MAX_PRODUCT_QTY;
                        },
                        getQueryLimit() {
                            return myLocale.QUERY_REC_LIMIT;
                        },
                        getDefaultCart() {
                            return myLocale.DEFAULT_CART;
                        },
                        getDefaultWish() {
                            return myLocale.DEFAULT_WISH;
                        },
                        getPasswordMinLength() {
                            return myLocale.PASSWORD_MIN_LENGTH;
                        },
                        getLoginNameMinLength() {
                            return myLocale.LOGIN_NAME_MIN_LENGTH;
                        },
                        getLoginMaxRetry() {
                            return myLocale.LOGIN_MAX_RETRY;
                        },
                        getLoginLockoutTime() {
                            return myLocale.LOGIN_LOCKOUT_TIME;
                        },
                        getFileUploadRoot() {
                            return myLocale.FILE_UPLOAD_ROOT;
                        },
                        getAllowedDocTypes() {
                            return myLocale.ALLOWED_DOC_TYPES;
                        },
                    };
                default:
                    return myLocale;
            }
        },
        async setToken( token, expire ) {
            try {
                const mStore = await this.mcStore();
                mStore.setItem('authToken', token);
                mStore.setItem('authTokenExpire', expire);
            } catch ( e ) {
                console.error('error setting/saving localStorage item (setToken): ', e.stack);
            }
        },
        async removeToken() {
            try {
                const mStore = await this.mcStore();
                mStore.removeItem('authToken');
                mStore.removeItem('authTokenExpire');
            } catch ( e ) {
                console.error('error removing localStorage item(removeToken): ', e.stack);
            }
        },
        async getToken() {
            try {
                const mStore = await this.mcStore();
                const token  = mStore.getItem('authToken'),
                      expire = mStore.getItem('authTokenExpire');
                if ( ! token || ! expire ) {
                    return null;
                }
                if ( Date.now() > parseInt(expire) ) {
                    this.removeToken();
                    this.removeCurrentUser();
                    return null;
                }
                return token;
            } catch ( e ) {
                console.error('error getting localStorage item (getToken): ', e.stack);
            }
        },
        async getTokenClient() {
            try {
                const mStore = await this.mcStore();
                const token  = mStore.getItem('authToken'),
                      expire = mStore.getItem('authTokenExpire');
                if ( ! token || ! expire ) {
                    return null;
                }
                if ( Date.now() > parseInt(expire) ) {
                    this.removeToken();
                    this.removeCurrentUser();
                    return null;
                }
                return token;
            } catch ( e ) {
                console.error('error getting localStorage item (getToken): ', e.stack);
            }
        },
        loggedIn() {
            try {
                return ! ! this.getTokenClient();
            } catch ( e ) {
                console.error('error getting localStorage item (loggedIn): ', e.stack);
            }
        },
        async setLoginName( name, expire ) {
            try {
                const mStore = await this.mcStore();
                mStore.setItem('loginName', name);
                mStore.setItem('loginNameExpire', expire);
            } catch ( e ) {
                console.error('error removing localStorage item(setLoginName): ', e.stack);
            }
        },
        async removeLoginName() {
            try {
                const mStore = await this.mcStore();
                mStore.removeItem('loginName');
                mStore.removeItem('loginNameExpire');
            } catch ( e ) {
                console.error('error removing localStorage item(removeLoginName): ', e.stack);
            }
        },
        async getLoginName() {
            try {
                const mStore = await this.mcStore();
                const name   = mStore.getItem('loginName'),
                      expire = mStore.getItem('loginNameExpire');
                if ( ! name || ! expire ) {
                    return null;
                }
                if ( Date.now() > parseInt(expire) ) {
                    this.removeLoginName();
                    return null;
                }
                return name;
            } catch ( e ) {
                console.error('error removing localStorage item(getLoginName): ', e.stack);
            }
        },
        async setCurrentUser( userInfo ) {
            try {
                const mStore = await this.mcStore();
                mStore.setItem('currentUser', userInfo);
            } catch ( e ) {
                console.error('error removing localStorage item(setCurrentUser): ', e.stack);
            }
        },
        async removeCurrentUser() {
            try {
                const mStore = await this.mcStore();
                mStore.removeItem('currentUser');
            } catch ( e ) {
                console.error('error removing localStorage item(removeCurrentUser): ', e.stack);
            }
        },
        async getCurrentUser() {
            try {
                const mStore = await this.mcStore();
                const user   = mStore.getItem('currentUser');
                return user ? user : null;
            } catch ( e ) {
                console.error('error removing localStorage item(getCurrentUser): ', e.stack);
            }
        },
        async setApiToken( token ) {
            try {
                const mStore = await this.mcStore();
                mStore.setItem('apiToken', token);
            } catch ( e ) {
                console.error('error removing localStorage item(setApiToken): ', e.stack);
            }
        },
        async removeApiToken() {
            try {
                const mStore = await this.mcStore();
                mStore.removeItem('apiToken');
            } catch ( e ) {
                console.error('error removing localStorage item(removeApiToken): ', e.stack);
            }
        },
        async getApiToken() {
            try {
                const mStore = await this.mcStore();
                return mStore.getItem('apiToken');
            } catch ( e ) {
                console.error('error removing localStorage item(getApiToken): ', e.stack);
            }
        },
        async setItemState( itemKey, itemValue, expire ) {
            try {
                const mStore = await this.mcStore();
                await mStore.setItem(itemKey, itemValue);
                await mStore.setItem(`${itemKey}Expire`, expire);
            } catch ( e ) {
                console.error('error setting/saving localforage item: ', e.stack);
            }
        },
        async removeItemState( itemKey ) {
            try {
                const mStore = await this.mcStore();
                await mStore.removeItem(itemKey);
                await mStore.removeItem(`${itemKey}Expire`);
            } catch ( e ) {
                console.error('error removing localforage item: ', e.stack);
            }
        },
        async getItemState( itemKey ) {
            try {
                const mStore = await this.mcStore();
                const item   = await mStore.getItem(itemKey),
                      expire = await mStore.getItem(`${itemKey}Expire`);
                if ( ! item || ! expire ) {
                    return null;
                }
                if ( Date.now() > parseInt(expire) ) {
                    await this.removeItemState(itemKey);
                    return null;
                }
                return item;
            } catch ( e ) {
                console.error('error getting localforage data: ', e.stack);
            }
        },
        async userIpInfo( ipUrl = 'https://ipinfo.io' ) {
            // Get the current user IP address Information
            try {
                const response = await axios.get(ipUrl);
                // const response = await fetchIp;
                return await response.data;
            } catch ( error ) {
                return "Error fetching ip-address information: " + error;
            }
        },
        userBrowser() {
            // push each browser property, as key/value pair, into userBrowser array variable
            return navigator.userAgent;
        },
        currentUrlInfo( pathLoc ) {
            // this function returns the parts (array) and lastIndex of a URL/pathLocation
            let parts = '';
            let lastIndex;
            if ( pathLoc ) {
                parts     = pathLoc.toString().split('://')[ 1 ].split('/');
                // get the last index
                lastIndex = parts.lastIndexOf('new') || parts.lastIndexOf('detail') || parts.lastIndexOf('list');
                return {
                    parts,
                    lastIndex,
                };
            }
            return {
                parts,
                lastIndex,
            };
        },
        getPath( req ) {
            let itemPath = req.route.path || '/mc';
            itemPath     = itemPath.split('/')[ 1 ];
            return itemPath ? itemPath : 'mc';
        },
        getParamsMessage( msgObject ) {
            let messages = '';
            Object.entries(msgObject).forEach(( [ key, msg ] ) => {
                messages = `${messages} | ${key} : ${msg}`;
            });
            return {
                code   : 'paramsError',
                resCode: 406,
                value  : '',
                message: messages,
            };
        },
        getFullName( firstName, lastName, middleName = '' ) {
            if ( firstName && middleName && lastName ) {
                return ( firstName + ' ' + middleName + ' ' + lastName );
            }
            return ( firstName + ' ' + lastName );
        },
        getNames( fullName ) {
            const nameParts = fullName.split('');
            let firstName, lastName, middleName;
            if ( nameParts.length > 2 ) {
                firstName  = nameParts[ 0 ];
                lastName   = nameParts[ 2 ];
                middleName = nameParts[ 1 ];
                return {
                    firstName,
                    middleName,
                    lastName,
                };
            } else {
                firstName = nameParts[ 0 ];
                lastName  = nameParts[ 1 ];
                return {
                    firstName,
                    lastName,
                };
            }
            // Return firstName, middleName and lastName based on fullName components ([0],[1],[2])
        },
        shortString( str, maxLength ) {
            return str.toString().length > maxLength ? str.toString().substr(0, maxLength) + '...' : str.toString();
        },
        isProvided( param = '' ) {
            // Verify the Required status
            // Validate that the item is not empty / null / undefined
            return ! ( param === '' || param === null || param === undefined );
        },
        isEven( num ) {
            return Number.isFinite(num) && ( num % 2 === 0 );
        },
        isOdd( num ) {
            return Number.isFinite(num) && ( num % 2 !== 0 );
        },
        isNumberOnRange( param, min = 0, max = 0 ) {
            if ( ( this.isNumberDigit(param) || this.isNumberFloat(param) ) && ( min < max ) ) {
                return ( param >= min && param <= max )
            }
            return false;
        },
        isNumberDigit( param ) {
            // Validate that param is a number (digit): 100 | 99 | 33 | 44 | 200
            const numberPattern = /^[0-9]+$/;
            return numberPattern.test(param);
        },
        isNumberFloat( param ) {
            // Validate that param is a number (float): 0.90 | 99.9 | 33.3 | 44.40
            const numberPattern = /^([0-9])+([.])?([0-9])*$/;
            return numberPattern.test(param);
        },
        isObjectType( param ) {
            "use strict";
            // Validate param is an object, {}
            return ( typeof param === 'object' && ! Array.isArray(param) );
        },
        isArrayType: function ( param ) {
            "use strict";
            // Validate param is an object, []
            return Array.isArray(param);
        },
        isUsername( param ) {
            "use strict";
            const usernamePattern = /^([a-zA-Z0-9_])+$/; // alphanumeric, underscore, no space
            return usernamePattern.test(param);
        },
        isEmpty( param ) {
            "use strict";
            return ( param === '' || param === null || param === undefined || Object.keys(param).length === 0 );
        },
        isNumberInRange( param, min = 0, max = 0 ) {
            if ( ( this.isNumberDigit(param) || this.isNumberFloat(param) ) && ( min < max ) ) {
                return ( param > min && param < max );
            }
            return false;
        },
        isRequired( param = '' ) {
            // Validate that the item is not empty (string/object) / null / undefined
            return ! ( param === '' || param === null || param === undefined || Object.keys(param).length === 0 );
        },
        isNull( infoItem ) {
            "use strict";
            return infoItem === null;
        },
        isStringChar( param ) {
            // Validate that param is a string (characters only) -- use regEx
            const charRegEx = /^[a-zA-Z&$_\-]+$/;
            return charRegEx.test(param);
        },
        isStringAlpha( param ) {
            // Validate that param is a string (alphanumeric, chars/numbers only)
            const alphaNumericPattern = /^[a-zA-Z0-9-_]+$/;
            return alphaNumericPattern.test(param);
        },
        isPrime( num ) {
            // create array from the num
            let nums = [];
            for ( let i = 2; i < num; i ++ ) {
                nums.push(i);
            }
            // check is num is divisible by all values from 2 up to num-1
            return nums.every(item => {
                return num % item === 0;
            });
        },
        isPassword( param ) {
            const testPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{6,15}$/;
            return testPattern.test(param);
        },
        isEmail( param ) {
            const testPattern = /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/;
            // const testPattern = /^[0-9a-zA-Z]+([\-._][0-9a-zA-Z]+)*@[0-9a-zA-Z]+([\-.][0-9a-zA-Z]+)*([.])[a-zA-Z]{2,6}$/;
            return testPattern.test(param);
        },
        isPhone( param ) {
            const phonePattern = /^([1-9]{1,3})?[\-. ]?(\(\d{3}\)?[\-. ]?|\d{3}?[\-. ]?)?\d{3}?[\-. ]?\d{4}$/;
            return phonePattern.test(param);
        },
        isPostalCode( param ) {
            const postCodePattern = /^[a-zA-Z0-9]+(\s)?[a-zA-Z0-9]*/;
            return postCodePattern.test(param);
        },
        isPostalCodeUS( param ) {
            const postCodePattern = /^[a-zA-Z0-9]+(\s)?[a-zA-Z0-9]*/;
            return postCodePattern.test(param);
        },
        isPostalCodeCanada( param ) {
            const postCodePattern = /^[a-zA-Z0-9]+(\s)?[a-zA-Z0-9]*/;
            return postCodePattern.test(param);
        },
        isPostalCodeUK( param ) {
            const postCodePattern = /^[a-zA-Z0-9]+(\s)?[a-zA-Z0-9]*/;
            return postCodePattern.test(param);
        },
        isName( param ) {
            const namePattern = /^[a-zA-Z'\-]+(\s[a-zA-Z'\-])*[a-zA-Z'\-]*/;   // Abi Charles Africa America
            return namePattern.test(param);
        },
        isURL( param ) {
            // Abi Charles Africa America
            const namePattern = /^[a-zA-Z0-9\-\\_.:]+$/;
            return namePattern.test(param);

        },
        isBusinessNumber( param ) {
            // business number format
            const bnPattern = /^[0-9\-]+$/;
            return bnPattern.test(param);
        },
        isStandardCode( param ) {
            // Product Group | Body & Soul10
            const standardCodePattern = /^[a-zA-Z0-9]+[&\s\-_]*[a-zA-Z0-9$#]*$/;
            return standardCodePattern.test(param);
        },
        isCountryCode( param ) {
            // langCode must be string of format en-US
            const countryCodePattern = /^[a-z]{2}-[A-Z]{2}$/;
            return countryCodePattern.test(param);

        },
        isLanguageCode( param ) {
            // langCode must be string of format en-US
            const langCodePattern = /^[a-z]{2}-[A-Z]{2}$/;
            return langCodePattern.test(param);
        },
        isWordSpace( param ) {
            // words with spaces and hyphens, no numbers
            const wordSpacePattern = /^[a-zA-Z0-9,()'._&]+[\s\-a-zA-Z0-9,()'._&]*[a-zA-Z0-9,()'._?]*$/;
            return wordSpacePattern.test(param);
        },
        isLabelCode( param ) {
            // firstName_middleName_lastName
            const labelCodePattern = /^[a-zA-Z]+[_\-a-zA-Z]*[_a-z0-9]*$/;
            return labelCodePattern.test(param);
        },
        isErrorCode( param ) {
            // error code format (AB10-100, AB900)
            const errorCodePattern = /^[a-zA-Z0-9]+[-]*[0-9]*$/;
            return errorCodePattern.test(param);
        },
        isPathName( param ) {
            // mysite.new_base.nicelook
            const pathNamePattern = /^[a-zA-Z0-9/]+[_a-zA-Z0-9./]*[a-zA-Z0-9/]*$/;
            return pathNamePattern.test(param);
        },
        isNameNoSpace( param ) {
            // JohnPaul
            const nameNoSpacePattern = /[a-zA-Z]+/;
            return nameNoSpacePattern.test(param);
        },
        isDescription( param ) {
            "use strict";
            const descPattern = /^[a-zA-Z0-9\s\\.,:/()*_|\-!@#$%&]+$/; // Alphanumeric string with spaces, and
            // (.,:/()*_-|!@)
            return descPattern.test(param);
        },
        isCurrency( param ) {
            const currencyPattern = /^[a-zA-Z#$]+$/;
            return currencyPattern.test(param);
        },
        isDateTypeYMDNumber() {
            // Validate param is date, YYYY-MM-DD (2016-03-20)
        },
        isDateTypeDMYNumber() {
            // Validate param is date, MM-DD-YYYY (03-20-2016)

        },
        isDateTypeMDYNumber() {
            // Validate param is date, MM-DD-YYYY (03-20-2016)

        },
        isDateTypeYMDString() {
            // Validate param is date, YYYY-Month-Day (2016-March-20)

        },
        isDateTypeDMYString() {
            // Validate param is date, Day-Month-YYYY (20-March-2016)

        },
        isDateTypeMDYString() {
            // Validate param is date, Day-Month-YYYY (20-March-2016)

        },
    }
}

module.exports = utils;
