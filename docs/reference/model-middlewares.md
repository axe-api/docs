# Model.`middlewares()`

Sometimes, you may want to protect your models by requests. In those cases, you can use model-based middleware. We are expecting you to define basically an <a href="https://expressjs.com/en/guide/writing-middleware.html" target="_blank" rel="noreferrer">Express Middleware</a>. To do add a middleware to a model handlers, you should use `middlewares` getter like the following code;

```ts
import { Request, Response, NextFunction } from "express";
import { Model } from "axe-api";

class User extends Model {
  get middlewares() {
    return [
      (req: Request, res: Response, next: NextFunction) => {
        // Check anything you want here.
        next();
      },
    ];
  }
}

export default User;
```

As you can see, you should return an array. It has been designed like that because it helps us to add multiple middlewares at the same time. With the code above, your middleware list will be executed in orderly for all allowed handlers.

Of course, you can use multiple middleware functions from other files;

```ts
import { Model } from "axe-api";
import { isAdmin, isLogged } from "./../Middlewares/index";

class User extends Model {
  get middlewares() {
    return [isLogged, isAdmin];
  }
}

export default User;
```

But that is not enough for us. We aimed to create a very flexible structure for you. That's why, we added a feature that you can add a special middleware function for a special handler.

```ts
import { Model, HandlerTypes } from "axe-api";
import { isAdmin, isLogged } from "./../Middlewares/index";
const { INSERT, PAGINATE, UPDATE, DELETE } = HandlerTypes;

class User extends Model {
  get middlewares() {
    return [
      {
        handler: [INSERT, PAGINATE, UPDATE],
        middleware: isLogged,
      },
      {
        handler: [DELETE],
        middleware: isAdmin,
      },
    ];
  }
}

export default User;
```

In this example, this second middleware will be executed only for **DELETE** handler. This is a great way to create a very flexible architecture. Also, it helps us to separate common API logic (CRUD) from business logic.
