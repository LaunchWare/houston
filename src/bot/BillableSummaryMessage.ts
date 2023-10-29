import { BillableReport } from "../toggl/BillableReport"
import { buildClientMap } from "../toggl/buildClientMap"
import { buildUserMap } from "../toggl/buildUserMap"
import { formatBillableTime } from "./formatBillableTime"

export class BillableSummaryMessage {
  private startDate: Date
  private endDate: Date
  constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate
    this.endDate = endDate
  }

  async build() {
    const clientMap = await this.fetchClientMap()
    const userMap = await this.fetchUserMap()
    const billableReport = await this.fetchBillableReport()
    return billableReport.groups.reduce((map, group) => {
      if (group && group.id) {
        const clientName = clientMap[group.id.toString()]
        if (clientName) {
          map[clientName] = group.sub_groups.reduce((subMap, subGroup) => {
            subMap[userMap[subGroup.id.toString()]] = formatBillableTime(subGroup.seconds)
            return subMap
          }, {} as Record<string, string>)
        }
      }
      return map
    }, {} as Record<string, Record<string, string>>)
  }

  private async fetchBillableReport() {
    const report = new BillableReport(this.startDate, this.endDate)
    return report.generate()
  }

  private async fetchClientMap() {
    return buildClientMap()
  }

  private async fetchUserMap() {
    return buildUserMap()
  }
}
