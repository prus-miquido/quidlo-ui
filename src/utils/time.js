import TIME_FORMATS from '../const/timeFormats';

const
    timeValidator = value => {
        const string = value.trim();

        return !!TIME_FORMATS.ALL.filter(timeString => timeString.test(string)).length;
    },
    timeParser = value => {
        const string = value.trim();
        let
            hours = 0,
            minutes = 0;
        if (TIME_FORMATS.HOURS_MINUTES_WITH_COMMA.test(string)) {
            minutes = 60 * Number(string.replace(',', '.'));
        } else if (TIME_FORMATS.HOURS_MINUTES.test(string)) {
            [, hours, minutes] = /^(\d+)[:h -]\s?(\d+)m?$/.exec(string);
        } else if (TIME_FORMATS.MINUTES.test(string)) {
            [, minutes] = /^(\d+)m$/.exec(string);
        } else if (TIME_FORMATS.HOURS.test(string)) {
            [, hours] = /^(\d+)[h]?$/.exec(string);
        }

        return (60 * Number(hours)) + Number(minutes);
    },
    timeFormatter = number => {
        const
            hours = Math.floor(number / 60),
            minutes = number - (60 * hours);

        return `${hours}h ${minutes}m`;
    };

export {
    timeValidator,
    timeFormatter,
    timeParser
};
