export const formatBillableTime = (billableSeconds: number) => {
  const hours = Math.floor(billableSeconds / 3600)
  const minutes = Math.floor((billableSeconds % 3600) / 60)

  let minutesString = minutes.toString()
  if (minutes < 10) {
    minutesString = `0${minutesString}`
  }

  const seconds = billableSeconds % 60
  let secondsString = seconds.toString()
  if (seconds < 10) {
    secondsString = `0${secondsString}`
  }

  return `${hours}:${minutesString}:${secondsString}`
}
