# `onBeforeForceDelete()`

This hook/event is called the before deleting a record.

It can be used in the `FORCE_DELETE` handler.

::: code-group

```ts [app/v1/Hooks/User/onBeforeForceDelete.ts]
import { IHookParameter } from "axe-api";

export default async (parameters: IHookParameter) => {
  // do something in here
};
```

:::
