const shell = require('shelljs');

const err = 'Error: Git pull failed';

const deployCommands = ['git pull', 'yarn', 'yarn build', 'pm2 restart server'];

const update = (key, cb) => {
  if (key !== config.api_key) {
    shell.echo(`${err} (wrong key)`);
    return cb('Error: wrong key');
  }

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

exports.update = update;
