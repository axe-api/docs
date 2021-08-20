# Middlewares

Axe API's middleware features are flexible almost as the standard Express application. You can create and use your middlewares for almost every request for your architecture.

Obviously, you should be able to create some middlewares for your auto-created routes. Axe API provides [Model Middlewares](/models/#middlewares) structure for that kind of middlewares. But here, we are going to describe how to create global middlewares for your application.

In the `app/init.js`, you will find a simple function. Axe API guarantees that function will be called after model routes creation. In that function, you can access the [Express](https://expressjs.com/en/starter/hello-world.html) application. In the following way, you can add your middlewares.

```js
export default async ({ app }) => {
  app.use((req, res, next) => {
    // Check something
    next();
  });
};
```

Of course, you can import your middlewares from another directory. We created a specific folder that kind of middlewares that is called `Middlewares`.

```js
import { globalMiddleware } from "./Middlewares/index.js";

export default async ({ app }) => {
  app.use(globalMiddleware);
};
```

Please keep in mind that the init function is another escape point in which you can add your custom logic by accessing [Express](https://expressjs.com/) application.
