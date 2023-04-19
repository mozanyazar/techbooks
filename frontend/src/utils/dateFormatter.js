const dateFormatter = (dateTimeString, format = 'DD/MM/YYYY') => {
  const date = new Date(dateTimeString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  const formattedDate = format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year)
    .replace('hh', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
  return formattedDate
}

export default dateFormatter
