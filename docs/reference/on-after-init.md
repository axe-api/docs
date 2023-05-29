# `onAfterInit`

The initialization function is triggered after the Axe API created routes.

::: code-group

```ts [app/v1/init.ts]
import { Express } from "express";

const onAfterInit = async (app: Express) => {
  // Do anything with the Express instance
};

export { onAfterInit };
```

:::
