# Analyzing

Axe API is **not a passive framework** that expects you to define everything. Unlike other frameworks or libraries, Axe API tries to _understand_ what you will build under best practices' guidance. Whenever you change something in the code, it just doesn't mean you tell something to the programming language, it also means that Axe API should take an action about it. Keeping this in your mind all the time is the key factor.

When you execute an Axe API application, it performs the following analyzes;

- What kind of configurations do you have by application-specific?
- What kind of tables do you have on the database?
- What kind of columns do you have on the database tables?
- What kind of models do you have in the application?
- What kind of relationships do you have between your models?
- What kind of middlewares do you have in model and application-specific?
- What kind of fields have been used in your model definitions?

Axe API completes the following task by all these analyzes;

- Stores all of the application profiles in the memory
- Creates Express.js routes dynamically
- Handles HTTP requests

You don't have to think about controllers, validations, routing, and etc. Axe API can understand exactly what you need. Now, we can look closer at all of these analyzes.

## Routing

The most important task of Axe API is creating [Express.js routes](https://expressjs.com/en/guide/routing.html) for you. To do that, Axe API needs to understand what kind of data structure do you have. So that it analyzes your model structure deeply with their relationships. Let's assume that you have the following tables in your database;

<div style="text-align:center;">

![Database Schema](./routes-01.png)

</div>

Obviously, you are going to have the following routes by [API design best practices](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api).

- `POST api/users` - Create a new user
- `GET api/users` - Get all users
- `GET api/users/:id` - Get a user by id
- `PUT api/users/:id` - Update the user
- `DELETE api/users/:id` - Delete the user
- `POST api/users/:userId/posts` - Create a new blog post under the user
- `GET api/users/:userId/posts` - Get user's posts
- `GET api/users/:userId/posts/:id` - Get user's post by post id
- `PUT api/users/:userId/posts/:id` - Update the post
- `DELETE api/users/:userId/posts/:id` - Delete the post

Axe API checks your model relationships. If you create the following model definitions, the routes will be created by Axe API.

```ts
import { Model } from "axe-api";

class User extends Model {
  posts() {
    return this.hasMany("Post", "id", "user_id");
  }
}
```

```ts
import { Model } from "axe-api";

class Post extends Model {
  user() {
    return this.belongsTo("User", "user_id", "id");
  }
}
```

:::tip
Axe API could create the routes by looking at the database schema directly but we didn't. Because you may want to describe the best structure.

At this point, you may ask what is the _"best structure"_. It means that even though you have a relationship between your models in the database level, it doesn't mean you want to create a related route in your API. That's why we use your relationship definitions.
:::

You don't have to define all routes manually with this architecture. Of course, there are many more details about creating routes. But for now, this is all you need to know. All routes will be created by your model definitions automatically.

## Schema Check

In the analyzing process, Axe API gets all the database structure and compares it with your model definitions. You can't execute incompatible model definitions with your database schema. Let's look at the following example again. You have to have the `user_id` column in the `posts` table in your database.

```ts
import { Model } from "axe-api";

class Post extends Model {
  user() {
    return this.belongsTo("User", "user_id", "id");
  }
}
```

Otherwise, you can't execute the application, and you get an error from Axe API about the situation.

## Middlewares

Middlewares are very popular patterns used in applications. Axe API analyzes your application to find middlewares and injects them to Express.js' routes. This task is completed in the booting process. You can see a very simple example of it;

```ts
import { Request, Response, NextFunction } from "express";
import { Model, DEFAULT_HANDLERS, IHandlerBaseMiddleware } from "axe-api";

class User extends Model {
  get middlewares(): IHandlerBaseMiddleware[] {
    return [
      {
        handler: DEFAULT_HANDLERS,
        middleware: (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      },
    ];
  }
}
```

## What Is Next?

Axe API performs a lot of operations in the booting process. But you don't have to worry about it at all. Because whenever you made a mistake or forget something, Axe API will remind you. If you can see the API is listening to HTTP requests, this means that the booting process is over. Now, it is time to handler requests!
