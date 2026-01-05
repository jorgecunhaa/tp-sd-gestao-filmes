const crypto = require('crypto');

/**
 * Cria hash SHA-256 da password
 * @param {string} password - Password em texto plano
 * @returns {string} Hash SHA-256
 */
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

/**
 * Compara password com hash
 * @param {string} password - Password em texto plano
 * @param {string} hash - Hash SHA-256
 * @returns {boolean}
 */
const comparePassword = (password, hash) => {
  const passwordHash = hashPassword(password);
  return passwordHash === hash;
};

module.exports = {
  hashPassword,
  comparePassword
};

