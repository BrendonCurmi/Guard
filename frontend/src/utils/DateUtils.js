/**
 * Describe the specified date in human-readable format.
 * @param date the date to describe.
 * @param curr the date to compare to.
 * @returns string the date in human-readable format.
 */
const describeDate = (date, curr = new Date(Date.now())) => {
    date = new Date(date);

    const hrs = hoursSince(date, curr);
    const weeks = weeksSince(date, curr);

    const isWithinSameDay = () => {
        return 0 <= hrs && hrs < 24;
    };

    const isWithinSameWeek = () => {
        return 24 <= hrs && hrs < 24 * 7;
    };

    const isWithinSameMonth = () => {
        return weeks < 4;
    };

    const isWithinSameYear = () => {
        return monthsSince(date, curr) < 12;
    };

    if (isWithinSameDay()) {
        const mins = minutesSince(date, curr);
        return hrs === 0 ?
            mins < 1
                ? `Less than a minute ago`
                : config(mins, "m")
            : config(hrs, "h");
    } else if (isWithinSameWeek()) {
        return hrs < 48
            ? `Yesterday`
            : config(daysSince(date, curr), "d");
    } else if (isWithinSameYear()) {
        return isWithinSameMonth()
            ? config(weeks, "w")
            : config(monthsSince(date, curr), "month");
    } else return `${curr.getDate()}-${curr.getMonth()}-${curr.getFullYear()}`;


    // if (isSameDayOfYear(date, curr)) {
    //     return hrs < 1 ?
    //         minutesSince(date, curr) < 1
    //             ? `Less than a minute ago`
    //             : config(minutesSince(date, curr), "m")
    //         : config(hrs, "h");
    // } else if (getNumOfWeek(date) === getNumOfWeek(curr))
    //     return config(daysSince(date, curr), "d");
    // else if (date.getMonth() === curr.getMonth())
    //     return config(weeksSince(date, curr), "w");
    // else if (date.getFullYear() === curr.getFullYear())
    //     return config(monthsSince(date, curr), "month");
    // else return `${curr.getDate()}-${curr.getMonth()}-${curr.getFullYear()}`;
};

const config = (time, type) => {
    switch (type) {
        case "m":
            return `${time} ${c(time, `minute`, `minutes`)} ago`;
        case "h":
            return `${time} ${c(time, `hour`, `hours`)} ago`;
        case "d":
            return `${time} ${c(time, `day`, `days`)} ago`;//todo yesterday
        case "w":
            return c(time, `Last week`, `${time} weeks ago`);
        case "month":
            return c(time, `Last month`, `${time} months ago`);
    }
};

const c = (val, singular, plural) => {
    return val === 1 ? singular : plural;
};


const msSince = (date, curr) => {
    return Math.abs(curr - date);
};

const minutesSince = (date, curr) => {
    return Math.floor(msSince(date, curr) / 60000);
};

const hoursSince = (date, curr) => {
    return Math.floor(minutesSince(date, curr) / 60);
};

const daysSince = (date, curr) => {
    return Math.floor(hoursSince(date, curr) / 24);
};

const weeksSince = (date, curr) => {
    return Math.floor(daysSince(date, curr) / 7);
};

const monthsSince = (date, curr) => {
    return Math.floor(weeksSince(date, curr) / 4);
};

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
