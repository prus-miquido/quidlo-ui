Empty input
```js
var { IntlProvider } = require('react-intl');
<IntlProvider locale="en">
    <InputContainer
        label="Test label"
        onChange={() => {}}
        name="test-input-field"
    />
</IntlProvider>
```

Input with filled state
```js
var { IntlProvider } = require('react-intl');
<IntlProvider locale="en">
    <InputContainer
        label="Test label"
        onChange={() => {}}
        name="test-input-field"
        value="test test test"
    />
</IntlProvider>
```

Input with icon
```js
var { IntlProvider } = require('react-intl');
<IntlProvider locale="en">
    <InputContainer
        label="Test label"
        onChange={() => {}}
        name="test-input-field"
        icon="search"
    />
</IntlProvider>
```

Input with error
```js
var { IntlProvider } = require('react-intl');
<IntlProvider locale="en">
    <InputContainer
        label="Test label"
        type="time"
        onChange={() => {}}
        name="test-input-field"
        error="Test Error"
    />
</IntlProvider>
```