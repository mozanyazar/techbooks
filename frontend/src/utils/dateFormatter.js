const dateFormatter = (dateTimeString, format = 'DD/MM/YYYY') => {
  const currentDate = new Date().getTime()
  const date = new Date(dateTimeString)
  const timeDiff = currentDate - date.getTime()

  // If the comment was created less than a day ago.
  if (timeDiff < 86400000) {
    const minuteDiff = Math.floor(timeDiff / 60000)
    // If the comment was created less than a hour ago.
    if (minuteDiff < 60) {
      return `${minuteDiff} minute ago`
    }
    // If the comment was created more than a hour ago.
    else {
      const hour = Math.floor(minuteDiff / 60)
      return `${hour} hour ago`
    }
  }

  // If the comment was created more than a day ago.
  else {
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
}

export default dateFormatter
