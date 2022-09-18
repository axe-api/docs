# Initialization

In this chapter, we are going to explain all details about the initialization (`init.ts`) file.

## What Is It?

`init.ts` is a file that lets developers extend the application easily. Axe API expects two main methods; `onBeforeInit` and `onAfterInit`. A simple initialization file look like the following one;

```ts
import { Express } from "express";

const onBeforeInit = async (app: Express) => {
  // Todo: what you want
};

const onAfterInit = async (app: Express) => {
  // Todo: what you want
};

export { onBeforeInit, onAfterInit };
```

## `onBeforeInit`

This function is executed before the Axe API initialization process. In this step, Axe API literally knows nothing about your models or the database structure.

## `onAfterInit`

This function is executed after the Axe API initialization process. In this step, Axe API will be completed the analyzing process. All HTTP routers are ready to handle.

## Usage

Please keep in mind that these functions will be called only once.

```ts
import { Express, Request, Response, NextFunction } from "express";

const onBeforeInit = async (app: Express) => {
  app.use(function(req: Request, res: Response, next: NextFunction) {
    // a middleware
    next();
  });
};

const onAfterInit = async (app: Express) => {
  app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
    // error handler
    next();
  });
};

export { onBeforeInit, onAfterInit };
```
