function getCurrentWeekNumber() {
    const date = new Date();
    // Set to nearest Thursday: current date + 4 - current day number
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);

    const firstThursday = new Date(target.getFullYear(), 0, 4);
    const firstDayNr = (firstThursday.getDay() + 6) % 7;
    firstThursday.setDate(firstThursday.getDate() - firstDayNr + 3);

    const weekNo = 1 + Math.round(
        (target - firstThursday) / (7 * 24 * 60 * 60 * 1000)
    );
    return weekNo;
}

const currentWeek = getCurrentWeekNumber();
console.log("Current week number:", currentWeek);

// תוכל לייצא את זה אם אתה עובד עם מודולים:
export { currentWeek };
