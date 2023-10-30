import { sendWeeklyMessage } from "../slack/sendWeeklyMessage";

export const weeklyReminderHandler = async () => {
  await sendWeeklyMessage()

  return {
    statusCode: 201,
    body: JSON.stringify({ success: true }),
  }
}
