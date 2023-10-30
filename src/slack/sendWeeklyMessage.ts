import { format, subDays } from "date-fns"
import { BillableSummaryMessage } from "../bot/BillableSummaryMessage"
import { WebhookMessage } from "./WebhookMessage"

const formatDate = (date: Date) => format(date, "yyyy-MM-dd")
export const sendWeeklyMessage = async () => {
  const today = new Date()
  const sevenDaysAgo = subDays(today, 7)
  const summary = new BillableSummaryMessage(sevenDaysAgo, today)
  const summaryMessages = [`<!here> Please confirm your time for the period of ${formatDate(today)} and ${formatDate(sevenDaysAgo)}`, ...(await summary.build())]
  const message = summaryMessages.join("\n")

  const webhookMessage = new WebhookMessage(message)
  await webhookMessage.send()
}
