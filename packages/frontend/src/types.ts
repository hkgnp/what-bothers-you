export interface Item {
  _id: string
  date: Date
  value: string
  discussed: boolean | null
  discussed_date: Date | null
}
