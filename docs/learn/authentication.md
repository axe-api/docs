# Authentication

<p class="description">
Axe API doesn't provide an internal authentication system. We thought that it should be flexible as possible. Nevertheless, in this sectıon, we are going to show you how to create an authentication mechanism in Axe API.
</p>

<ul class="intro">
  <li>You will learn</li>
  <li>What is authentication?</li>
  <li>How to implement JWT on Axe API?</li>
</ul>

## Getting started

Authentication in REST API refers to the process of verifying the identity of clients or users accessing the API. It ensures that only authorized individuals or systems can interact with protected resources.

Authentication mechanisms involve exchanging credentials, such as usernames and passwords, tokens, or API keys, between the client and server. The server validates these credentials, usually through algorithms or secure protocols, and grants access if they are valid.

Common authentication methods include **Basic Authentication**, **Token-based Authentication** (such as OAuth), and **JSON Web Tokens** (JWT).

Authentication in REST API is crucial for securing sensitive data, preventing unauthorized access, and ensuring that only authenticated users can perform authorized actions.

In this example, we will show how you can use JWT-based authentication.

## Install dependencies

We are going to use **JSON Web Tokens**. That's why we are going to use add [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) package to the project. But, you can use any other authentication way you wish.

```bash
$ npm install jsonwebtoken --save
```

After that, the `jsonwebtoken` package will be ready to use.

## Create login handler

To provide an authentication structure, we need to create a custom route. To do that, you change the following method in the `app/v1/init.ts` file;

::: code-group

```ts [app/v1/init.ts]
import { Express } from "express";
import login from "./Handlers/login";

const onBeforeInit = async (app: Express) => {
  app.post("/api/v1/login", login);
};

const onAfterInit = async (app: Express) => {};

export { onBeforeInit, onAfterInit };
```

:::

Here, we describe `/api/v1/login` route to handle login requests. After that, you should create the following file;

::: code-group

```ts [app/v1/Handlers/login.ts]
import { Request, Response } from "express";
import { IoCService } from "axe-api";
import { Knex } from "knex";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const Database = (await IoCService.use("Database")) as Knex;
  const user = await Database.table("users").where("email", email).first();

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

:::

Now we have a login request handler. Users can log in by using this route.

## Create a middleware

To check the token, we should create a middleware;

::: code-group

```ts [app/v1/Middlewares/isLogged.ts]
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

:::

## Use middleware in your models

If you want to a model, you should add the middleware to the model model definition like this;

::: code-group

```ts [app/v1/Models/Contact.ts]
import { Model } from "axe-api";
import isLogged from "./../Middlewares/isLogged";

class Contact extends Model {
  get middlewares() {
    return [isLogged];
  }
}

export default Contact;
```

:::

Now, the model is protected by the middleware.

Also, you can specify the definition by using the following example;

::: code-group

```ts [app/v1/Models/Contact.ts]
import { Model, HandlerTypes } from "axe-api";
import isLogged from "./../Middlewares/isLogged";

class User extends Model {
  get middlewares() {
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

:::

## Sending token via headers

Clients have to send the token in the header of the HTTP Request like the following structure;

```js
Authorization: Bearer YOUR_TOKEN
```

## Next steps

In this section, we described how you can add authentication abilities to your API.

In the next section, we are going to talk about rate limiting.
