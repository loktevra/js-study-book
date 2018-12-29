import * as Seneca from 'seneca';

export const seneca = Seneca();

export const act = <T>(pattern): Promise<T> => new Promise((resolve) => {
  seneca.act(pattern, (err, msg: T) => {
    if (err) {
      throw err;
    }
    resolve(msg)
  });
});
