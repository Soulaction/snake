export const formatTimeFromMS = (ms: number) => {
  const second = Math.floor(ms / 1000)
  const minute = Math.floor(second / 60)
  const hour = Math.floor(minute / 60)

  const hourView = hour.toString().padStart(2, '0')
  const minuteView = getFormatedMinute(hour, minute)
  const secondView = getFormatedSecond(hour, minute, second)

  return `${hourView}:${minuteView}:${secondView}`
}

const getFormatedMinute = (hour: number, minute: number): string => {
  const formatedHour = hour ? minute - hour * 60 : minute
  return formatedHour.toString().padStart(2, '0')
}

const getFormatedSecond = (
  hour: number,
  minute: number,
  second: number
): string => {
  const allMinute = parseInt(getFormatedMinute(hour, minute))
  const formatedHour = allMinute ? second - allMinute * 60 : second
  return formatedHour.toString().padStart(2, '0')
}
