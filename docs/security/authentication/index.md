# Authentication

Axe API doesn't provide an internal authentication system. We thought that it should be flexible as possible. Nevertheless, in this documentation, we are going to show you how to create an authentication mechanism in Axe API.

## Dependencies

We are going to use JSON Web Tokens. That's why we are going to use add [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) package to the project. But, you can use any other authentication way you wish.

```bash
$ npm install jsonwebtoken --save
```

After that, the `jsonwebtoken` package will be ready to use.

## Handler

To provide an authentication structure, we need to create a [Custom Route](/routes/#custom-routes). To do that, you change the following method in the `app/init.ts` file;

```ts
import { Express } from "express";
import login from "./Handlers/login";

const onBeforeInit = async (app: Express) => {
  app.post("/api/login", login);
};

const onAfterInit = async (app: Express) => {};

export { onBeforeInit, onAfterInit };
```

Here, we describe `/app/login` route to handle login requests. After that, you should create the following file;

`app/Handlers/login.ts`

```ts
import { Request, Response } from "express";
import { IoCService } from "axe-api";
import { Knex } from "knex";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const Database = (await IoCService.use("Database")) as Knex;
  const user = await Database.table("users")
    .where("email", email)
    .first();

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  const userHash = crypto
    .pbkdf2Sync(password, user.password_salt, 1000, 32, `sha512`)
    .toString(`hex`);

  if (userHash !== user.password) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  const token = jwt.sign({ userId: user.id }, "YOUR-SECRET-TOKEN");
  return res.json({ token });
};
```

Now we have a login request handler. Users can log in by using this route.

## Middleware

To check the token, we should create a middleware in the `app/Middlewares/isLogged` file.

```ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      authorization.replace("Bearer ", ""),
      "YOUR-SECRET-TOKEN"
    );
    req.auth = decoded;
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
```

If you want to a model, you should add the middleware to the model model definition like this;

```ts
import { Model } from "axe-api";
import isLogged from "./../Middlewares/isLogged";

class Contact extends Model {
  get middlewares(): ((
    req: Request,
    res: Response,
    next: NextFunction
  ) => void)[] {
    return [isLogged];
  }
}

export default Contact;
```

Now, the model is protected by the middleware. Also, you can specify the definition by using the following example;

```ts
import { Model, HandlerTypes } from "axe-api";
import isLogged from "./../Middlewares/isLogged";

class User extends Model {
  get middlewares(): IHandlerBaseMiddleware[] {
    return [
      {
        handler: HandlerTypes.DELETE,
        middleware: isLogged,
      },
    ];
  }
}

export default User;
```

Clients have to send the token in the header of the HTTP Request like the following structure;

```js
Authorization: Bearer YOUR_TOKEN
```
