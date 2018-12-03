import Seneca from 'seneca';

export const seneca = Seneca();

export const act = (pattern) => new Promise((resolve) => {
  seneca.act(pattern, (err, msg) => {
    if (err) {
      throw err;
    }
    resolve(msg)
  });
});
