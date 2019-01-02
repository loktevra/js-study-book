function getCurrencyList(nc) {
  return (data, reply) => {
    const list = ['foo', 'bar'];
    nc.publish(reply, { result: { model: { message: JSON.stringify(list) } }})
  }
}

export default getCurrencyList
