export const dateFormater = (date: string) => {
  const dateObj = new Date(date)
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth().toString().padStart(2, '0')
  const day = dateObj.getDay().toString().padStart(2, '0')
  const hours = dateObj.getHours().toString().padStart(2, '0')
  const minutes = dateObj.getMinutes().toString().padStart(2, '0')

  return `${day}.${month}.${year} ${hours}:${minutes}`
}
