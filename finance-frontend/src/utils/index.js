function getISODate(date) {
  return date.toISOString().split('T')[0]
}

const currency = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB'})

export {
  getISODate,
  currency,
}
