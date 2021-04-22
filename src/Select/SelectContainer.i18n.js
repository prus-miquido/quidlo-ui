import {defineMessages} from 'react-intl';

export default defineMessages({
    isRequired: {
        id: 'select.error.isRequired',
        defaultMessage: 'Field is required!'
    },
    min: {
        id: 'select.error.min',
        defaultMessage: 'Value should contain at least {min} elements!'
    },
    max: {
        id: 'select.error.max',
        defaultMessage: 'Value should contain at most {max} elements!'
    }
});