export type DayObject = {
  day: Day;
  date: number;
  month: Month;
  year: number;
};

export type WeekObject = Record<number, DayObject[]>;

export type MonthObject = {
  weeks: WeekObject;
};

export type Month =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

export type MonthInNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type DateInNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export type Day =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type DayInNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const Days: Day[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const Months: Month[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export class Calendar {
  private currentMonth: number;
  private currentYear: number;
  private startDay: number;

  constructor(data?: {
    year?: number;
    month?: Month | MonthInNumber;
    startDay?: Day | DayInNumber;
  }) {
    const today = new Date();
    this.currentMonth = data?.month
      ? this.monthToNum(data.month)
      : today.getMonth();
    this.currentYear = data?.year ? data.year : today.getFullYear();
    this.startDay = data?.startDay ? this.dayToNum(data.startDay) : 1;
  }

  generateMonth(options?: {
    year?: number;
    month?: Month | MonthInNumber;
    startDay?: Day | DayInNumber;
  }) {
    const year = options?.year ? options.year : this.currentYear;
    const month = options?.month
      ? this.monthToNum(options.month)
      : this.currentMonth;
    const startDay = options?.startDay
      ? this.dayToNum(options.startDay)
      : this.startDay;

    const firstDayOfMonth = new Date(year, month, 1);
    const numberOfDaysThisMonth = new Date(year, month + 1, 0).getDate();

    // Set according to startDay. Eg - 0: sunday, 1: monday ... 6: saturday
    const weekStartsOnDay = (startDay + Days.length) % Days.length;
    // Days to go back to dates depending on weekStartsOnDay
    const daysToGoBack =
      (firstDayOfMonth.getDay() - weekStartsOnDay + Days.length) % Days.length;
    // The first day of the week starts after going back to the date
    const firstDayOfWeek = 1 - daysToGoBack;
    let generatedMonth: MonthObject = { weeks: {} };

    let currentDay = firstDayOfWeek;

    while (currentDay <= numberOfDaysThisMonth || currentDay <= 0) {
      let weekNumber = Math.floor((currentDay + firstDayOfMonth.getDay()) / 7) + 1;
      
      if (!generatedMonth.weeks[weekNumber]) {
        generatedMonth.weeks[weekNumber] = [];
      }

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(year, month, currentDay);
        const dayName = Days[currentDate.getDay()];

        if (currentDay > 0 && currentDay <= numberOfDaysThisMonth) {
          // Dates of the current month
          generatedMonth.weeks[weekNumber].push({
            day: dayName,
            date: currentDay as DateInNumber,
            month: Months[month],
            year,
          });
        } else {
          // Add dates from the previous / next month
          const isPreviousMonth = currentDay <= 0;
          const isNextMonth = currentDay > numberOfDaysThisMonth;

          const adjacentYear =
            isPreviousMonth && month === 0
              ? year - 1
              : isNextMonth && month === 11
              ? year + 1
              : year;

          const adjacentMonth = isPreviousMonth
            ? month === 0
              ? 11
              : month - 1
            : isNextMonth
            ? month === 11
              ? 0
              : month + 1
            : month;

          const numberOfAdjacentDays = isPreviousMonth
            ? new Date(adjacentYear, adjacentMonth + 1, 0).getDate() +
              currentDay
            : isNextMonth
            ? currentDay - numberOfDaysThisMonth
            : currentDay;

          const adjacentMonthDate = new Date(
            adjacentYear,
            adjacentMonth,
            numberOfAdjacentDays
          );

          const adjacentDayName = Days[adjacentMonthDate.getDay()];
          const adjacentMonthName = Months[adjacentMonth];

          generatedMonth.weeks[weekNumber].push({
            day: adjacentDayName,
            date: adjacentMonthDate.getDate() as DateInNumber,
            month: adjacentMonthName,
            year: adjacentYear,
          });
        }

        currentDay++;
      }
    }

    let keys = Object.keys(generatedMonth.weeks);
    if(keys.includes('0')){
      let newKey = 1;
      let newlyGenerated:MonthObject = { weeks: {} };

      keys.forEach((key: any)=>{
        newlyGenerated.weeks[newKey] = generatedMonth.weeks[key]
        newKey++;
      })

      return newlyGenerated;
    }

    return generatedMonth;
  }

  private monthToNum(month: Month | MonthInNumber): number {
    if (typeof month == "number") return month - 1;
    return Months.indexOf(month);
  }

  private dayToNum(day: DayInNumber | Day): number {
    if (typeof day == "number") return day;
    return Days.indexOf(day);
  }
}