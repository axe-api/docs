# `onAfterPaginate()`

This hook/event is called the after paginating items.

It can be used in the `PAGINATE` handler.

::: code-group

```ts [app/v1/Hooks/User/onAfterPaginate.ts]
import { IHookParameter } from "axe-api";

export default async (parameters: IHookParameter) => {
  // do something in here
};
```

:::
