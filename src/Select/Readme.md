Singleselect
```js
var { IntlProvider } = require('react-intl');

<IntlProvider locale="en">
   <SelectContainer
       options={[{
           label: 'Months',
           inputValue: 'Months',
           value: true,
           realValue: 'Months',
       }, {
           label: 'Weeks',
           inputValue: 'Weeks',
           value: false,
           realValue: 'Weeks',
       }]}
       onSelect={() => {}}
       label="Type"
   />
</IntlProvider>

```
Multiselect
```js
var Tag = require('../Tag/Tag');
var { IntlProvider } = require('react-intl');

<IntlProvider locale="en">
    <SelectContainer
        options={[{
          label: <Tag text="John Doe" avatar={<Avatar firstName="John" lastName="Doe" />} />,
          inputValue: 'John Doe',
          value: false,
          realValue: 'John Doe',
        }, {
          label: <Tag text="Philip Doyle" avatar={<Avatar firstName="Philip" lastName="Doyle" />} />,
          inputValue: 'Philip Doyle',
          value: false,
          realValue: 'Philip Doyle',
        }, {
          label: <Tag text="Gary Sparks" avatar={<Avatar firstName="Gary" lastName="Sparks" />} />,
          inputValue: 'Gary Sparks',
          value: false,
          realValue: 'Gary Sparks',
        }, {
          label: <Tag text="Kamil Solipiwko" avatar={<Avatar firstName="Kamil" lastName="Solipiwko" />} />,
          inputValue: 'Kamil Solipiwko',
          value: false,
          realValue: 'Kamil Solipiwko',
        }]}
        onSelect={() => {}}
        label="Person"
        multiselect
    />
</IntlProvider>
```