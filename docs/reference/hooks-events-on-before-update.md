# `onBeforeUpdate()`

This hook/event is called the before updating a new record.

It can be used in the `UPDATE` handler.

::: code-group

```ts [app/v1/Hooks/User/onBeforeUpdate.ts]
import { IHookParameter } from "axe-api";

export default async (parameters: IHookParameter) => {
  // do something in here
};
```

:::
