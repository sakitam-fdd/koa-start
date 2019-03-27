const jwt = require('jsonwebtoken');

module.exports = function (userId) {
  const token = jwt.sign({
    user_id: userId,
  }, 'null', {
    expiresIn: '60s',
  });
  return token;
};
