console.log('index');
setTimeout(() => {
  const name = 'main'
  import(/* webpackIgnore: true */ `/${name}-module.js`).then(console.log).catch(console.log)

}, 2000);