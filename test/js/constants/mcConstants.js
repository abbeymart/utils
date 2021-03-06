/**
 * Created by abbeymart on 2018-06-23
 */
const mcConstants = {
    SHORT_DESC           : 20,
    DDP_LIMIT            : 10,
    LOGIN_TIMEOUT        : 86400000,
    REMEMBER_TIMEOUT     : 345600000,
    PAGE_CACHE_EXPIRE    : 3600000,
    DB_CACHE_EXPIRE      : 300,
    MAX_FILE_COUNT       : 10,
    MAX_PRODUCT_QTY      : 20,
    QUERY_REC_LIMIT      : 100000,
    MAX_FILE_SIZE        : 10485760,
    DEFAULT_LANG         : 'en-US',
    DEFAULT_CURRENCY     : 'USD',
    READ_LOG_TYPE        : 'Create',
    CREATE_LOG_TYPE      : 'Create',
    SEARCH_LOG_TYPE      : 'Search',
    UPDATE_LOG_TYPE      : 'Update',
    REMOVE_LOG_TYPE      : 'Remove',
    LOGIN_LOG_TYPE       : 'Login',
    LOGOUT_LOG_TYPE      : 'Logout',
    LOG_CREATE           : true,
    LOG_READ             : true,
    LOG_UPDATE           : true,
    LOG_DELETE           : true,
    LOG_LOGIN            : true,
    LOG_LOGOUT           : true,
    LOG_SEARCH           : true,
    DEFAULT_CART         : 'Cart',
    DEFAULT_WISH         : 'Wish List',
    PASSWORD_MIN_LENGTH  : 6,
    LOGIN_NAME_MIN_LENGTH: 6,
    LOGIN_MAX_RETRY      : 5,
    LOGIN_LOCKOUT_TIME   : 15000,
    FILE_UPLOAD_ROOT     : 'http://localhost:4000/upload/files/',
    ALLOWED_DOC_TYPES    : [ 'text/plain', 'image/jpeg', 'image/jpg', 'image/png', 'audio/wav', 'audio/mpeg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint' ],
};

module.exports = mcConstants;
