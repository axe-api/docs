# `onBeforeAll()`

This hook/event is called the before fetching all items.

It can be used in the `ALL` handler.

::: code-group

```ts [app/v1/Hooks/User/onBeforeAll.ts]
import { IHookParameter } from "axe-api";

export default async (parameters: IHookParameter) => {
  // do something in here
};
```

:::
