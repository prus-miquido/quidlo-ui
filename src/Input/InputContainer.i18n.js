import {defineMessages} from 'react-intl';

export default defineMessages({
    isRequired: {
        id: 'input.error.isRequired',
        defaultMessage: 'Field is required!'
    },
    min: {
        id: 'input.error.min',
        defaultMessage: 'Value should contain at least {min} characters!'
    },
    max: {
        id: 'input.error.max',
        defaultMessage: 'Value should contain at most {max} characters!'
    },
    timeFormatError: {
        id: 'input.error.timeFormat',
        defaultMessage: 'Not valid time format!'
    },
    timeMaxError: {
        id: 'input.error.timeMax',
        defaultMessage: "Value can't be higher than {max}!"
    },
    timeMinError: {
        id: 'input.error.timeMin',
        defaultMessage: "Value can't be higher than {max}!"
    },
    passwordMin: {
        id: 'input.error.passwordMin',
        defaultMessage: 'Password should contains at least 8 characters'
    },
    passwordDigit: {
        id: 'input.error.passwordDigit',
        defaultMessage: 'Password should contains at least 1 digit'
    },
    passwordUppercase: {
        id: 'input.error.passwordUppercase',
        defaultMessage: 'Password should contains at least uppercase character'
    },
    hourFormatError: {
        id: 'input.error.hourFormat',
        defaultMessage: 'Not valid HH:MM format!'
    },
});