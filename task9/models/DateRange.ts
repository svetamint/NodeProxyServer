import config from '../config/config'

export class DateRange {
  startDate: string
  endDate: string

  constructor(startDate: string, endDate: string) {
    this.startDate = startDate
    this.endDate = endDate
  }

  static createFromDate(date?: string): DateRange {
    if (date) {
      return new DateRange(date, date)
    }
    return new DateRange(config.startDate, config.endDate)
  }
}
