# Custom Routes

Axe API provides so many different options for creating routes automatically. But again, we accept the truth you may need some special routes for some actions. That's why we provide another way to create **pure Express routes**.

In the `app/init.js`, you will find a simple function. Axe API guarantees that function will be called after model routes creation. In that function, you can access the [Express](https://expressjs.com/en/starter/hello-world.html) application. In the following way, you can add your custom routes or middlewares.

```js
export default async ({ app }) => {
  app.get("/api/health", (req, res) => {
    res.json({
      status: true,
    });
  });
};
```

Of course, you can import your routes from another directory, for example, `Routes` or `Controllers`. We didn't create a specific folder that kind of routes and you are totally free to choose the folder name.

```js
import healthCheck from "./Routes/healthCheck.js";

export default async ({ app }) => {
  app.get("/api/health", healthCheck);
};
```

Please keep in mind that the init function is another escape point in which you can add your custom logic by accessing [Express](https://expressjs.com/) application.
