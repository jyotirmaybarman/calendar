"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = void 0;
class Calendar {
    months = [
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
    days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];
    currentMonth;
    currentYear;
    startDay;
    constructor(data) {
        const today = new Date();
        this.currentMonth = data?.month
            ? this.months.indexOf(data.month) + 1
            : today.getMonth() + 1;
        this.currentYear = data?.year ? data.year : today.getFullYear();
        this.startDay = data?.startDay ? this.days.indexOf(data.startDay) : 1;
    }
    getMonth(options) {
        let year = options?.year ? options.year : this.currentYear;
        let month = options?.month
            ? this.months.indexOf(options.month) + 1
            : this.currentMonth;
        let startDay = options?.startDay
            ? this.days.indexOf(options.startDay)
            : this.startDay;
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const lastDayOfPreviousMonth = new Date(year, month - 1, 0);
        const numberOfDays = new Date(year, month, 0).getDate();
        // Adjust the startDay to be between 0 (Sunday) and 6 (Saturday)
        startDay = ((startDay % 7) + 7) % 7;
        // Determine the day of the week for the first day of the month
        const firstDayOfWeek = (firstDayOfMonth.getDay() - startDay + 7) % 7;
        // Calculate the date for the first day of the week containing January 1st
        const firstDate = 1 - firstDayOfWeek;
        let currentDay = firstDate;
        let MONTH = { weeks: {} };
        while (currentDay <= numberOfDays || currentDay <= 0) {
            const weekNumber = Math.ceil((currentDay + firstDayOfMonth.getDay() - startDay) / 7);
            if (!MONTH.weeks[weekNumber]) {
                MONTH.weeks[weekNumber] = [];
            }
            for (let i = 0; i < 7; i++) {
                const currentDate = new Date(year, month - 1, currentDay);
                const dayName = new Intl.DateTimeFormat("en-US", {
                    weekday: "long",
                }).format(currentDate);
                if (currentDay > 0 && currentDay <= numberOfDays) {
                    MONTH.weeks[weekNumber].push({
                        day: dayName.toLowerCase(),
                        date: currentDay,
                        month: this.months[month - 1],
                        year,
                    });
                }
                else {
                    // Add dates from the previous or next month
                    const adjacentMonth = currentDay <= 0 ? month - 1 : month + 1;
                    const isJanuaryToDecemberTransition = currentDay <= 0 && month === 1;
                    const isDecemberToJanuaryTransition = currentDay > numberOfDays && month === 12;
                    const adjacentMonthDate = isJanuaryToDecemberTransition
                        ? new Date(lastDayOfPreviousMonth.getFullYear(), lastDayOfPreviousMonth.getMonth(), lastDayOfPreviousMonth.getDate() + currentDay)
                        : isDecemberToJanuaryTransition
                            ? new Date(year + 1, 0, currentDay - numberOfDays)
                            : new Date(year, month, currentDay - numberOfDays);
                    const dayNameAdjacent = new Intl.DateTimeFormat("en-US", {
                        weekday: "long",
                    }).format(adjacentMonthDate);
                    const monthAdjacent = isDecemberToJanuaryTransition
                        ? "january"
                        : isJanuaryToDecemberTransition
                            ? "december"
                            : this.months[adjacentMonth - 1];
                    const yearAdjacent = isJanuaryToDecemberTransition
                        ? year - 1
                        : isDecemberToJanuaryTransition
                            ? year + 1
                            : year;
                    MONTH.weeks[weekNumber].push({
                        day: dayNameAdjacent.toLowerCase(),
                        date: adjacentMonthDate.getDate(),
                        month: monthAdjacent,
                        year: yearAdjacent,
                    });
                }
                currentDay++;
            }
        }
        return MONTH;
    }
}
exports.Calendar = Calendar;
