# Error Handling

You already know that Axe API is basically an Express.js project. With that power, you can use a simple error handler of Express.js.

Let's remember how does it look like.

```ts
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(methodOverride());
app.use(function (err, req, res, next) {
  // the default error handler.
});
```

You can see that the error handler function is defined at last just because to catch all errors.

In Axe API, You can define any middleware function like Express.js. To create an error handler, you should use the initialization functions;

`app/v1/init.ts`

```ts
import { Express Request, Response, NextFunction } from "express"

const onBeforeInit = async (app: Express) => {};

const onAfterInit = async (app: Express) => {
  app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
    // the default error handler.
  });
};

export { onBeforeInit, onAfterInit };
```
