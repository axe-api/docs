# Understanding the routing

<p class="description">
Routing is a very important topic that shaped on best-practices in the Rest API world. In this chapter, we are going to talk about route management at Axe API. 
</p>

<ul class="intro">
  <li>You will learn</li>
  <li>What is routing?</li>
  <li>How Axe API creates routes?</li>
  <li>How to manage related routes?</li>
  <li>How to enable/disable route for a specific handler?</li>
  <li>How to create custom route?</li>
</ul>

## Routing in Express.js

Routing refers to determining how an application responds to a client request to a particular endpoint. You can see a simple [Express.js](https://expressjs.com/en/guide/routing.html) routing example in the following code block;

```js
app.get("/api/v1/users", (req, res) => {
  res.json({
    id: 1,
    // ...
  });
});
```

In the example above, a simple HTTP route is defined for the GET method. If the client sends the cURL request to the Express server, it gets the following response.

::: code-group

```bash [Request]
$ curl \
  -H "Content-Type: application/json" \
  -X GET http://localhost:3000/api/v1/users
```

```json [Response]
{
  "id": 1
  // ...
}
```

:::

In most web frameworks, developers must define all routes manually. But there are many articles on how to create a good route for a **Rest API**. If you show a _database schema_ to a developer, most of the time they can figure out more or less how routing should be.

That's why Axe API has an **auto-route creation** mechanism. Axe API core _reads_ your models, and analyzes their _relationships_, then _creates_ routes and _handles_ HTTP requests.

## Model-based routes

Let's start with fundamentals, and create a simple Axe API model;

::: code-group

```ts [User.ts]
import { Model } from "axe-api";

class Users extends Model {}

export default User;
```

:::

Axe API practices the following task when you run the application;

- Analyzes `User` model
- Creates all possible routes
- Listens all created routes

For the example model, the application is ready to handle the following routes;

| HTTP Method | Route              |
| ----------- | ------------------ |
| GET         | `api/v1/users`     |
| GET         | `api/v1/users/:id` |
| POST        | `api/v1/users`     |
| PUT         | `api/v1/users/:id` |
| DELETE      | `api/v1/users/:id` |

Developers don't have to create routes manually unlike other web frameworks, the only required thing is creating model files.

## Model relations

Let's assume that we have some tables that are related to each other, like the following example;

![Database Schema](./routes-01.png)

You can define a relationship between models to create related routes;

::: code-group

```ts [User.ts]
import { Model } from "axe-api";

class User extends Model {
  posts() {
    return this.hasMany("Post", "id", "user_id");
  }
}

export default User;
```

```ts [Post.ts]
import { Model } from "axe-api";

class Post extends Model {
  user() {
    return this.belongsTo("User", "user_id", "id");
  }
}

export default Post;
```

:::

We defined two models; `User` and `Post`.

In the `User` model, we defined a `hasMany` relationship. By that definition, we aim to create a relation from the User model to the Post model. Which means that every user might have many posts.

In the `Post` model, we defined a `belongsTo` relationship. This means every post might have only one related user record.

Axe API creates automatically the following routes by this model definition;

| HTTP Method | Url                              | Description         |
| ----------- | -------------------------------- | ------------------- |
| GET         | `api/v1/users`                   | Paginate users      |
| POST        | `api/v1/users`                   | Create a new user   |
| GET         | `api/v1/users/:id`               | Get a user by id    |
| PUT         | `api/v1/users/:id`               | Update a user by id |
| DELETE      | `api/v1/users/:id`               | Delete a user by id |
| GET         | `api/v1/users/:userId/posts`     | Paginate posts      |
| POST        | `api/v1/users/:userId/posts`     | Create a new post   |
| GET         | `api/v1/users/:userId/posts/:id` | Get a post by id    |
| PUT         | `api/v1/users/:userId/posts/:id` | Update a post by id |
| DELETE      | `api/v1/users/:userId/posts/:id` | Delete a post by id |

## Route Tree

It is important to understand that Axe API creates a route tree by relationship definitions.

If a model (let's call it as `User`) has a `has-many` relationship (let's assume to the `Post` model), which means that that model (`User`) will be top of the three (`/api/v1/users/:id/posts`).

Also, The `Comment` model would be the child of the `Post` model if you defined it as a `hasMany` relationship in the `Post` model.

Let's check the following model relations;

::: code-group

```ts [User.ts]
import { Model } from "axe-api";

class User extends Model {
  posts() {
    return this.hasMany("Post", "id", "user_id");
  }
}

export default User;
```

```ts [Post.ts]
import { Model } from "axe-api";

class Post extends Model {
  user() {
    return this.belongsTo("User", "user_id", "id");
  }

  comments() {
    return this.hasMany("Comment", "id", "post_id");
  }
}

export default Post;
```

```ts [Comment.ts]
import { Model } from "axe-api";

class Comment extends Model {
  post() {
    return this.belongsTo("Post", "post_id", "id");
  }
}

export default Comment;
```

Your model tree would be like the following schema by your relationship definitions.

:::

![Axe API Route Tree](./axe-api-route-tree.png)
