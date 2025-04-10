// dateUtils.js

export const getTaskDate = (task) => task.date || task.dueDate || '';

export const setTaskDate = (task, value) => {
    if ('dueDate' in task) return { ...task, dueDate: value };
    return { ...task, date: value };
};

/**
 * Basic format for an ISO-like date string "YYYY-MM-DD".
 * E.g. "2025-03-20" -> "20.03.2025"
 */
export const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
};

/**
 * Generates an array of weeks (Sunday to Saturday)
 * starting from `startDateStr` until `endDateStr`.
 */
export const generateWeeksBySundayToSaturday = (startDateStr, endDateStr) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const weeks = [];
    let currentWeekIndex = 0;
    let currentStart = new Date(startDate);

    // If the semester doesn't start on Sunday, create a partial "week 0"
    if (currentStart.getDay() !== 0) {
        const partialEnd = new Date(currentStart);
        while (partialEnd.getDay() !== 6) {
            partialEnd.setDate(partialEnd.getDate() + 1);
            if (partialEnd > endDate) break;
        }
        weeks.push({
            weekIndex: currentWeekIndex,
            start: new Date(currentStart),
            end: new Date(partialEnd),
        });
        currentWeekIndex++;
        const nextSunday = new Date(partialEnd);
        nextSunday.setDate(nextSunday.getDate() + 1);
        currentStart = nextSunday;
    }

    // Full weeks (Sunday to Saturday)
    while (currentStart <= endDate) {
        const wStart = new Date(currentStart);
        const wEnd = new Date(wStart);
        wEnd.setDate(wEnd.getDate() + 6);

        if (wEnd > endDate) {
            wEnd.setTime(endDate.getTime());
        }

        weeks.push({
            weekIndex: currentWeekIndex,
            start: wStart,
            end: wEnd,
        });
        currentWeekIndex++;

        const nextStart = new Date(wStart);
        nextStart.setDate(nextStart.getDate() + 7);
        currentStart = nextStart;

        if (wEnd.getTime() === endDate.getTime()) break;
    }

    return weeks;
};

/**
 * Formats a week range in Hebrew locale, e.g. "20 במרץ – 26 במרץ".
 */
export const formatWeekRange = (start, end) => {
    const formatLocal = (date) => {
        const day = date.getDate();
        const monthName = date.toLocaleString('he-IL', { month: 'short' });
        return `${day} ב${monthName}`;
    };
    return `${formatLocal(start)} – ${formatLocal(end)}`;
};

export function getDatesOfWeek(startDate, weekNumber) {
    const result = [];
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekNumber - 1) * 7);

    for (let i = 0; i < 7; i++) {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        result.push(d);
    }

    return result;
}

export function getValidDatesOfWeek(startSemester, endSemester, startDate, weekNumber) {
    const result = [];
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekNumber - 1) * 7);

    for (let i = 0; i < 7; i++) {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        result.push(d);
    }

    return result;
}