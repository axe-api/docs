# `onBeforeDelete()`

This hook/event is called the before deleting a record.

It can be used in the `DELETE` handler.

::: code-group

```ts [app/v1/Hooks/User/onBeforeDelete.ts]
import { IHookParameter } from "axe-api";

export default async (parameters: IHookParameter) => {
  // do something in here
};
```

:::
