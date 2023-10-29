export type BillableReportSubgroup = {
  id: number;
  seconds: number
}

export type BillableReportResponse = {
  groups: {
    id: number;
    sub_groups: BillableReportSubgroup[]
  }[]
}
