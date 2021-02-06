const fs = require('fs');
const configs = require('./config.json');

// A `privateConfig.json` file is created from this object
const template = {
  default: {
    phone_number: 'update value in generated file "privateConfig.json" to keep it a secret',
  },
  production: {
    api_key: '', // DON'T PUT API KEY HERE, update value in file privateConfig.json
  },
};

try {
  fs.writeFileSync('./privateConfig.json', JSON.stringify(template, null, 2), { flag: 'wx' });
  console.log("Creating a new `privateConfig.json` file");
}
catch (err) {
  if (err && err.code === 'EEXIST') {
    console.log('Using Existing `privateConfig.json` file');
  }
  else throw err;
}

const privateConfigs = require('../privateConfig.json');
const env = process.env.NODE_ENV;
global.config = Object.assign(
  configs.default,
  configs[env] || {},
  privateConfigs.default,
  privateConfigs[env] || {}
);
