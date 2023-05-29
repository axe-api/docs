# `onBeforeUpdateQuery()`

This hook/event is called before the update query is executed by Axe API.

For example; let's assume that you try to update a user by a user id. This hook/event is called before the Axe API fetches the record to be updated.

It can be used in the `UPDATE` handler.

::: code-group

```ts [app/v1/Hooks/User/onBeforeUpdateQuery.ts]
import { IHookParameter } from "axe-api";

export default async (parameters: IHookParameter) => {
  // do something in here
};
```

:::
