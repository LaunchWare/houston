export const formatBillableTime = (billableSeconds: number) => {
  const hours = Math.floor(billableSeconds / 3600)
  const minutes = Math.floor((billableSeconds % 3600) / 60)
  const seconds = billableSeconds % 60
  return `${hours}:${minutes}:${seconds}`
}
