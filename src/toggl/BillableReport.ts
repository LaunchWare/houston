import { format } from "date-fns"
import { TogglReportsClient } from "./TogglReportsClient"
export class BillableReport {
  private startDate: Date
  private endDate: Date

  constructor(start_date: Date, end_date: Date) {
    this.startDate = start_date
    this.endDate = end_date
  }

  async generate() {
    const http = await TogglReportsClient.instance.http()
    return http.post(`summary/time_entries`, {
      json: {
        start_date: this.formattedStartDate,
        end_date: this.formattedEndDate,
        grouping: "clients",
        sub_grouping: "users"
      },
    })
  }

  get formattedStartDate() {
    return this.formatDate(this.startDate)
  }

  get formattedEndDate() {
    return this.formatDate(this.endDate)
  }

  private formatDate(date: Date) {
    return format(date, "yyyy-MM-dd")
  }

}
