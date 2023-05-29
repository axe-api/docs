# `onBeforeShow()`

This hook/event is called the before the fetching an item by id.

It can be used in the `SHOW` handler.

::: code-group

```ts [app/v1/Hooks/User/onBeforeShow.ts]
import { IHookParameter } from "axe-api";

export default async (parameters: IHookParameter) => {
  // do something in here
};
```

:::
