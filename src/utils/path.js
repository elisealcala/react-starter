/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');

module.exports = function() {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return envKeys;
};
