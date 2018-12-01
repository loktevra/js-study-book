function iso4217() {
  this.add({role: 'iso-4217', cmd: 'getCurrencyList'}, function (msg, done) {
    const list = ['foo', 'bar']
    done(null, {list})
  })
}

module.exports = iso4217
