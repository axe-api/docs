# `onBeforeForceDeleteQuery()`

This hook/event is called before the delete query is executed by Axe API.

For example; let's assume that you try to delete a user by a user id. This hook/event is called before the Axe API fetches the record to be deleted.

It can be used in the `FORCE_DELETE` handler.

::: code-group

```ts [app/v1/Hooks/User/onBeforeForceDeleteQuery.ts]
import { IHookParameter } from "axe-api";

export default async (parameters: IHookParameter) => {
  // do something in here
};
```

:::
