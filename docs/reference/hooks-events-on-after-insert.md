# `onAfterInsert()`

This hook/event is called the after creating a new record.

It can be used in the `INSERT` handler.

::: code-group

```ts [app/v1/Hooks/User/onAfterInsert.ts]
import { IHookParameter } from "axe-api";

export default async (parameters: IHookParameter) => {
  // do something in here
};
```

:::
