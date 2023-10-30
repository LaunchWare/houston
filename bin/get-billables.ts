/* eslint-disable no-console */
import { sendMonthlyMessage } from "../src/slack/sendMonthlyMessage";

(async () => {
  const dotenv = await import("dotenv")
  dotenv.config()
  await sendMonthlyMessage()
})()
