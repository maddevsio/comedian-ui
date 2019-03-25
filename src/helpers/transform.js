export const toInt = value => parseInt(value, 10)

export default (values, types) => {
  const transFormedValues = {}

  Object.entries(values).forEach(([fieldName, value]) => {
    const castType = types[fieldName]
    switch (castType) {
      case 'int':
        transFormedValues[fieldName] = toInt(value)
        break
      default:
        transFormedValues[fieldName] = value
    }
  })
  return transFormedValues
}