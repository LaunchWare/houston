import { endOfMonth, format, startOfMonth, subMonths } from "date-fns"
import { BillableSummaryMessage } from "../bot/BillableSummaryMessage"
import { WebhookMessage } from "./WebhookMessage"

const formatDate = (date: Date) => format(date, "yyyy-MM-dd")
export const sendMonthlyMessage = async () => {
  const today = new Date()
  const lastMonth = subMonths(today, 1)
  const startDate = startOfMonth(lastMonth)
  const endDate = endOfMonth(lastMonth)
  const summary = new BillableSummaryMessage(startDate, endDate)
  const summaryMessages = [
    `<!here> Please confirm your time and share what you worked on between ${formatDate(startDate)} and ${formatDate(endDate)}`,
    ...(await summary.build())
  ]
  const message = summaryMessages.join("\n")

  const webhookMessage = new WebhookMessage(message)
  await webhookMessage.send()
}
