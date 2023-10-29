/* eslint-disable no-console */
import { BillableSummaryMessage } from "../src/bot/BillableSummaryMessage";

(async () => {
  const dotenv = await import("dotenv")
  dotenv.config()
  const report = new BillableSummaryMessage(new Date("2023-10-01"), new Date("2023-10-31"))
  const results = await report.build()

  console.log(results)
})()
