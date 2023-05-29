# `onBeforeInit`

The initialization function is triggered before the Axe API starts to create routes.

::: code-group

```ts [app/v1/init.ts]
import { Express } from "express";

const onBeforeInit = async (app: Express) => {
  // Do anything with the Express instance
};

export { onBeforeInit };
```

:::
