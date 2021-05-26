import TIME_FORMATS from '../const/timeFormats';

const
    timeValidator = value => {
        const string = value.trim();
        return !!TIME_FORMATS.ALL.filter(timeString => timeString.test(string)).length;
    },
    // eslint-disable-next-line
    emailValidator = value => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
    hourValidator = value => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);

export {
    timeValidator,
    emailValidator,
    hourValidator
};
