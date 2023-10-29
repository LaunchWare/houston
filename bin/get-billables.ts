/* eslint-disable no-console */
// import { BillableReport } from "../src/toggl/BillableReport";
import { buildClientMap } from "../src/toggl/buildClientMap";
import { buildUserMap } from "../src/toggl/buildUserMap";

(async () => {
  const dotenv = await import("dotenv")
  dotenv.config()
  // const report = new BillableReport(new Date("2023-10-01"), new Date("2023-10-31"))
  // const results = await report.generate()

  // console.log(results)

  // const clientMap = await buildClientMap()
  // console.log(clientMap)

  const userMap = await buildUserMap()
  console.log(userMap)
})()
