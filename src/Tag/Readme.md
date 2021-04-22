Tag example:

```js
var Avatar = require('../Avatar/Avatar').default;

<div>
    <Tag text="regular" />
    <Tag text="regular + remove" onRemove={() => {}} />
    <Tag text="large" size="large" />
    <Tag text="large + remove" size="large" onRemove={() => {}} />
    <Tag text="avatar" avatar={<Avatar firstName="John" lastName="Doe" />}/>
    <Tag text="avatar + remove" avatar={<Avatar firstName="John" lastName="Doe" />} onRemove={() => {}}/>
</div>
```

