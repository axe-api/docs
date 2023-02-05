# Custom Routes

Axe API provides so many different options for creating routes automatically. But again, we accept the truth you may need some special routes for some actions. That's why we provide another way to create **pure Express routes**.

In the `app/v1/init.ts`, you will find a simple function. Axe API guarantees that function will be called after model routes creation. In that function, you can access the <a href="https://expressjs.com/en/starter/hello-world.html" target="_blank" rel="noreferrer">Express</a> application. In the following way, you can add your custom routes or middlewares.

```ts
import { Express } from "express";

const onBeforeInit = async (app: Express) => {
  app.get("/api/health", (req, res) => {
    res.json({
      status: true,
    });
  });
};

const onAfterInit = async (app: Express) => {};

export { onBeforeInit, onAfterInit };
```

Of course, you can import your routes from another directory, for example, `Routes` or `Controllers`. We didn't create a specific folder that kind of routes and you are totally free to choose the folder name.

```ts
import { Express } from "express";
import healthCheck from "./Routes/healthCheck";

const onBeforeInit = async (app: Express) => {
  app.get("/api/health", healthCheck);
};

const onAfterInit = async (app: Express) => {};

export { onBeforeInit, onAfterInit };
```

Please keep in mind that the init function is another escape point in which you can add your custom logic by accessing <a href="https://expressjs.com/" target="_blank" rel="noreferrer">Express</a> application.
