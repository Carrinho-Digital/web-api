const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.SALT, 10);

async function hash(plainText) {
  return await bcrypt.hash(plainText, saltRounds);
}

function compare(plainText, hash) {
  return bcrypt.compare(plainText, hash);
}

module.exports = {
  hash,
  compare,
};
