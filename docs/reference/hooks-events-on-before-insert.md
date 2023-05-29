# `onBeforeInsert()`

This hook/event is called the before creating a new record.

It can be used in the `INSERT` handler.

::: code-group

```ts [app/v1/Hooks/User/onBeforeInsert.ts]
import { IHookParameter } from "axe-api";

export default async (parameters: IHookParameter) => {
  // do something in here
};
```

:::
