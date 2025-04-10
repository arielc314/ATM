import { initialData } from '../components/data/initialData';

const semesterStart = new Date(initialData.startSemester);
const semesterEnd = new Date(initialData.endSemester);
const currYear = Number(initialData.currentYear);


export function getDatesOfWeek(weekNumber: number): Date[] {
    const week = Number(initialData.zeroWeek) + weekNumber;

    // Get Sunday and Saturday dates for the week
    const weekDates = getWeekDates(week, currYear);

    // Calculate date range - using sunday and saturday properties
    const dateRangeStart = maxDate(semesterStart, weekDates.sunday);
    const dateRangeEnd = minDate(semesterEnd, weekDates.saturday);

    // Check if the range is valid
    if (dateRangeStart > dateRangeEnd) {
        console.error("Invalid date range: start is after end");
        return [];
    }
    return getDateRange(dateRangeStart, dateRangeEnd);
}

function getWeekDates(weekNumber: number, year: number = new Date().getFullYear()): {
    sunday: Date;
    saturday: Date
} {
    // Calculate the beginning of the year
    const firstDayOfYear = new Date(year, 0, 1);

    // Find the day of the week for January 1st (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeekOfFirstDayOfYear = firstDayOfYear.getDay();

    // Find the Sunday of the week containing January 1st
    // If January 1st is a Sunday, then it's January 1st
    // Otherwise, it's the date before January 1st that is a Sunday
    const daysToSubtract = firstDayOfWeekOfFirstDayOfYear === 0 ? 0 : firstDayOfWeekOfFirstDayOfYear;
    const firstSundayOfFirstWeek = new Date(year, 0, 1 - daysToSubtract);

    // Sunday of the requested week
    const sunday = new Date(firstSundayOfFirstWeek);
    sunday.setDate(firstSundayOfFirstWeek.getDate() + (weekNumber - 1) * 7);

    // Saturday of the same week
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);

    return { sunday, saturday };
}

function minDate(date1: Date, date2: Date): Date {
    return date1 < date2 ? date1 : date2;
}

function maxDate(date1: Date, date2: Date): Date {
    return date1 > date2 ? date1 : date2;
}

/**
 * Returns an array of dates within the range between a start date and an end date
 * @param startDate The start date of the range
 * @param endDate The end date of the range
 * @returns An array of dates within the requested range
 */
function getDateRange(startDate: Date, endDate: Date): Date[] {
    const result: Date[] = [];
    // Create a copy of the start date
    const currentDate = new Date(startDate);

    // Reset hours, minutes, seconds and milliseconds
    currentDate.setHours(0, 0, 0, 0);

    // Create a copy of the end date and set it to the end of the day
    const endDateCopy = new Date(endDate);
    endDateCopy.setHours(23, 59, 59, 999);  // End of day

    // Loop until the end of the day of the end date
    while (currentDate <= endDateCopy) {
        // Add a copy with reset hours
        const dateToAdd = new Date(currentDate);
        dateToAdd.setHours(0, 0, 0, 0);
        result.push(dateToAdd);

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
}