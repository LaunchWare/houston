import { sendMonthlyMessage } from "../slack/sendMonthlyMessage";

export const monthlyReminderHandler = async () => {
  await sendMonthlyMessage()

  return {
    statusCode: 201,
    body: JSON.stringify({ success: true }),
  }
}
