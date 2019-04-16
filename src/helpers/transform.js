export const toInt = value => parseInt(value, 10)

export const toWeekdays = days => {
  const map = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
  }
  const intValues = days.map(day => map[day])
  const result = []
  for (let i = 0; i < 7; ++i) {
    if (intValues.indexOf(i) > -1) {
      result.push(1)
    } else {
      result.push(0)
    }
  }
  return result.join(',')
}

export default (values, types) => {
  const transFormedValues = {}

  Object.entries(values).forEach(([fieldName, value]) => {
    const castType = types[fieldName]
    switch (castType) {
      case 'int':
        transFormedValues[fieldName] = toInt(value)
        break
      case 'weekdays':
        transFormedValues[fieldName] = toWeekdays(value)
        break
      default:
        transFormedValues[fieldName] = value
    }
  })
  return transFormedValues
}