/**
 * Глава 1
 * Упражнение 1
 * Составьте таблицы сложения и умножения в N-ричной системе и проделайте несколько примеров
 */
const [
  operation,
  arg1,
  arg2,
  arg3,
  ...other
] = process.argv.splice(2, process.argv.length);
if (operation === '-h') {
  console.log(`Допустимые команды:
    -h показать помощь
    -s N вывести таблицу сложения где N основание, натуральное число от 2 до 36
    -ss N X Y сложить числа с основанием N
    -m N вывести таблицу умножения где N основание, натуральное число от 2 до 36
    -mm N X Y умножить числа с основанием N
    -t N1 N2 X перевести число с основанием N1 в число с основанием N2
`)
  return 1
} else if (operation === '-s') {
  const radix = arg1;
  if (!radix || radix < 2 || radix > 36) {
    console.log('Основание должно быть натуральным числом от 2 до 36');
    return
  }
  const table = new Array(+radix).fill(new Array(+radix).fill(null)).map((item, x) => item.map((i, y) => (x + y).toString(radix)))
  
  console.log('ТАБЛИЦА СЛОЖЕНИЯ')
  console.table(table)

  return 1
} else if (operation === '-m') {
  const radix = arg1;
  if (!radix || radix < 2 || radix > 36) {
    console.log('Основание должно быть натуральным числом от 2 до 36');
    return
  }
  const table = new Array(+radix).fill(new Array(+radix).fill(null)).map((item, x) => item.map((i, y) => (x * y).toString(radix)))
  
  console.log('ТАБЛИЦА УМНОЖЕНИЯ')
  console.table(table)

  return 1
} else if (operation === '-ss') {
  const result = parseInt(arg2, arg1) + parseInt(arg3, arg1)
  console.log(result.toString(arg1));
  return
} else if (operation === '-mm') {
  const result = parseInt(arg2, arg1) * parseInt(arg3, arg1)
  console.log(result.toString(arg1));
  return
} else if (operation === '-t') {
  console.log(parseInt(arg3, arg1).toString(arg2));
  return
}
