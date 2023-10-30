import { BillableReport } from "../toggl/BillableReport"
import { buildClientMap } from "../toggl/buildClientMap"
import { buildUserMap } from "../toggl/buildUserMap"
import { formatBillableTime } from "./formatBillableTime"

export interface ClientGroup {
  name: string
  entries: ProfessionalEntry[]
}

export interface ProfessionalEntry {
  name: string
  time: string
}
export class BillableSummaryMessage {
  private startDate: Date
  private endDate: Date
  constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate
    this.endDate = endDate
  }

  async data() {
    const clientMap = await this.fetchClientMap()
    const userMap = await this.fetchUserMap()
    const billableReport = await this.fetchBillableReport()
    return billableReport.groups.reduce((map, group) => {
      if (group && group.id) {
        const clientName = clientMap[group.id.toString()]
        if (clientName) {
          return [
            ...map,
            {
              name: clientName,
              entries: group.sub_groups.reduce((subMap, subGroup) => {
                subMap = [
                  ...subMap,
                  {
                    name: userMap[subGroup.id.toString()],
                    time: formatBillableTime(subGroup.seconds)
                  }
                ]
                return subMap
              }, [] as ProfessionalEntry[])
            }
          ]
        }
      }
      return map
    }, [] as ClientGroup[])
  }
  async build() {
    const data = await this.data()
    return data.reduce((messages, clientGroup) => {
      return [
        ...messages,
        ...clientGroup.entries.reduce((subMessages, entry) => {
          return [
            ...subMessages,
            `- *${entry.name}*: Billed ${clientGroup.name} for ${entry.time}`
          ]
        }, [] as string[])
      ]
    }, [] as string[])
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
