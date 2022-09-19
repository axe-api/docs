# Architecture

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

## What Is Handlers?

Handlers represent HTTP request handler for a specific URL. Axe API has got many different handlers but the most importants are the following;

- `INSERT`
- `PAGINATE`
- `SHOW`
- `UPDATE`
- `DELETE`

As you may notices that those are CRUD actions. Axe API doesn't just create routes for your models. It also handles HTTP requests for routes. You will not worry about anything if your have a model like this;

```ts
import { Model } from "axe-api";

class User extends Model {}
```

At this point, you can ask the following question;

_"Am I understand correctly? If I create a model like that, will I not have to create controllers?"_

The answer is; **"No, you don't need to create controllers at all"**.

Axe API will handle your HTTP requests. Of course, there are many edge cases. For example, you may not want to create a DELETE route for your model. Also, you may add custom logic for a handler too such as sending confirmation e-mail after user creation. All of these requests are possible with different methods. We are going to talk about it in the next chapters.

## Request Lifecycle

Although we are going to see many details about the HTTP request lifecycle, here we can explain some basic facts.

Whenever Axe API starts to handle an HTTP request, it does its own tasks. These are can be different by the handler type. But there is a constant flow for every handler and that flow would be followed by Axe API.

Also, Axe API checks the analyzed data. For example, in case you defined a Hooks or Events, Axe API is responsible to trigger your functions.

:::tip
**Hooks** and **Events** are very special concepts for the Axe API. Basically, if you want to send an e-mail after user creation, you need some kind of exit point. Because, the user creation process will be handled by Axe API. Hooks and Events are these exit points. Axe API lets you define special functions that can be used as Hooks or Events. So that you can add your special logic to the HTTP Request Lifecycle.
:::

Like we said, for now, we don't need to go deeper. We'll talk about this later a lot.

## What Is Next?

Analyzing and Handling is the unique character of Axe API. This information will help you a lot in the next chapters. I am glad you've read all the architecture concepts!
