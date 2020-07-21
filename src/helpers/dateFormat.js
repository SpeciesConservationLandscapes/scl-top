const dateFormat = date => {
  const newDate = new Date(date)

  if (Object.prototype.toString.call(newDate) === '[object Date]') {
    if (Number.isNaN(newDate.getTime())) {
      return ''
    }

    return `${newDate.getFullYear()}-${newDate.getMonth() +
      1}-${newDate.getDate()}`
  }

  return ''
}

export default dateFormat
