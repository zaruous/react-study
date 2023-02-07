/**
 * set storage data.
 * @param key
 * @param data
 */
exports.saveStorage = (key, data) => {
    localStorage.setItem(key, data);
};

/**
 * get storage data.
 * @param key
 * @returns {string}
 */
exports.getStorage = (key) => {
    return localStorage.getItem(key);
};