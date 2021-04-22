const
    HOURS_MINUTES = /^\d+[:,.h -]\s?\d+m?$/,
    HOURS_MINUTES_WITH_COMMA = /^\d+[,.]\s?\d+h?$/,
    HOURS = /^\d+[h]?$/,
    MINUTES = /^\d+m$/,
    ALL = [HOURS_MINUTES, HOURS_MINUTES_WITH_COMMA, HOURS, MINUTES];

export default {
    HOURS_MINUTES,
    HOURS_MINUTES_WITH_COMMA,
    HOURS,
    MINUTES,
    ALL
};
