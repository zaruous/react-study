/**
 * set storage data.
 * @param key
 * @param data
 */
const saveStorage = (key, data) => {
    localStorage.setItem(key, data);
};

/**
 * get storage data.
 * @param key
 * @returns {string}
 */
const getStorage = (key) => {
    return localStorage.getItem(key);
};

const CONST_KEY_USER_INFO = "userInfo";

export { getStorage, saveStorage, CONST_KEY_USER_INFO} ;