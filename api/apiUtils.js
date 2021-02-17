const shell = require('shelljs');
const crypto = require('crypto');

const err = 'Error: Git pull failed';

const deployCommands = ['git pull', 'yarn', 'yarn build', 'pm2 restart server'];

const update = (key, cb) => {
  for (const command of deployCommands) {
    const { code } = shell.exec(command);
    if (code !== 0) {
      shell.echo(`${err} code: ${code}`);
      return cb(`${err} code: ${code}`);
    } else {
      shell.echo(`${command} Success`);
    }
  }
  cb();
};

const validateJsonWebhook = (request) => {
  // calculate the signature
  const expectedSignature =
    'sha1=' +
    crypto
      .createHmac('sha1', config.api_key)
      .update(JSON.stringify(request.body))
      .digest('hex');

  // compare the signature against the one in the request
  const signature = request.headers['x-hub-signature'];
  if (signature !== expectedSignature) {
    throw new Error('Invalid signature.');
  }
  return true;
};

exports.update = update;
exports.validateJsonWebhook = validateJsonWebhook;
