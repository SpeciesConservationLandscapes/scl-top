const dateFormat = date => {
  const newDate = new Date(date)

  return `${newDate.getFullYear()}-${newDate.getMonth() +
    1}-${newDate.getDate()}`
}

export default dateFormat
