# `onBeforePaginate()`

This hook/event is called the before paginating items.

It can be used in the `PAGINATE` handler.

::: code-group

```ts [app/v1/Hooks/User/onBeforePaginate.ts]
import { IHookParameter } from "axe-api";

export default async (parameters: IHookParameter) => {
  // do something in here
};
```

:::
