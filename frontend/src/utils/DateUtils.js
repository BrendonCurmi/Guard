/**
 * Describes the specified date in human-readable format.
 * @param date the date to describe.
 * @param curr the date to compare to.
 * @returns string the date in human-readable format.
 */
const describeDate = (date, curr = new Date(Date.now())) => {
    date = new Date(date);

    const hrs = hoursSince(date, curr);
    const weeks = weeksSince(date, curr);

    const isWithinSameDay = () => 0 <= hrs && hrs < 24;
    const isWithinSameWeek = () => 24 <= hrs && hrs < 24 * 7;
    const isWithinSameMonth = () => weeks < 4;
    const isWithinSameYear = () => monthsSince(date, curr) < 12;

    if (isWithinSameDay()) {
        const mins = minutesSince(date, curr);
        return hrs === 0 ?
            mins < 1
                ? "Less than a minute ago"
                : config(mins, "m")
            : config(hrs, "h");
    } else if (isWithinSameWeek()) {
        return hrs < 48
            ? "Yesterday"
            : config(daysSince(date, curr), "d");
    } else if (isWithinSameYear()) {
        return isWithinSameMonth()
            ? config(weeks, "w")
            : config(monthsSince(date, curr), "month");
    } else return `${curr.getDate()}-${curr.getMonth() + 1}-${curr.getFullYear()}`;
};

const config = (time, type) => {
    switch (type) {
        case "m":
            return `${time} ${s(time, "minute", "minutes")} ago`;
        case "h":
            return `${time} ${s(time, "hour", "hours")} ago`;
        case "d":
            return `${time} ${s(time, "day", "days")} ago`;
        case "w":
            return s(time, "Last week", `${time} weeks ago`);
        case "month":
            return s(time, "Last month", `${time} months ago`);
    }
};

const s = (val, singular, plural) => val === 1 ? singular : plural;


const msSince = (date, curr) => Math.abs(curr - date);

const minutesSince = (date, curr) => Math.floor(msSince(date, curr) / 60000);

const hoursSince = (date, curr) => Math.floor(minutesSince(date, curr) / 60);

const daysSince = (date, curr) => Math.floor(hoursSince(date, curr) / 24);

const weeksSince = (date, curr) => Math.floor(daysSince(date, curr) / 7);

const monthsSince = (date, curr) => Math.floor(weeksSince(date, curr) / 4);

const dayOfWeek = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
};

const exportedForTesting = {
    monthsSince,
    weeksSince,
    daysSince,
    hoursSince,
    minutesSince,
    msSince
}
module.exports = { describeDate, exportedForTesting };
