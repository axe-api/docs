# `onAfterUpdate()`

This hook/event is called the after updating a new record.

It can be used in the `UPDATE` handler.

::: code-group

```ts [app/v1/Hooks/User/onAfterUpdate.ts]
import { IHookParameter } from "axe-api";

export default async (parameters: IHookParameter) => {
  // do something in here
};
```

:::
