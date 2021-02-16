const shell = require('shelljs');

const err = 'Error: Git pull failed';

const update = (key, cb) => {
  if (key !== config.api_key) {
    shell.echo(`${err} (wrong key)`);
    return cb('Error: wrong key');
  }

  const { code } = shell.exec('git pull');
  if (code !== 0) {
    shell.echo(`${err} code: ${code}`);
    cb(`${err} code: ${code}`);
  } else {
    shell.echo('Git Pull Success');
    cb();
  }
};

exports.update = update;
