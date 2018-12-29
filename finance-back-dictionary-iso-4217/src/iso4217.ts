function iso4217() {
  this.add({role: 'iso-4217', cmd: 'getCurrencyList'}, function (msg, done) {
    const list = ['foo', 'bar']
    done(null, { data: list, status: 'success' })
  })
  this.act('role:web', {
    routes: [{
      pin: 'role:iso-4217,cmd:*',
      prefix: '/dictionary',
      map: {
        getCurrencyList: {
          GET: true,
          name: '/currency-list'
        },
      }
    }]
  }, console.log)
}

export default iso4217
