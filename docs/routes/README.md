# Routing

Routes enable the outside world to interact with your app via URLs. But also, they are the heart of the application in **Axe API**.

You have to define routes by writing codes in many different frameworks such as [Express](https://expressjs.com/en/guide/routing.html), [Laravel](https://laravel.com/docs/7.x/routing), etc. For example, in Express, you can use the following code to define a simple route;

```js
var express = require("express");
var app = express();

app.get("/api/users/", function(req, res) {
  res.json({
    id: 1,
    name: "Karl",
  });
});
```

It is very simple. But again, if we have many different models we need to define all routes and their implementations by writing code. Nevertheless, there are strong [API Best Practices](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api) out there, many developers agree on it. In **Axe API**, we thought that why we don't create routes **automatically** even we know all relationships between models.

## Auto Detection

When you create a new database **model**, **Axe API** analyzes its structure to create routes automatically. Let's assume that you have a model like this;

```js
import { Model } from "axe-api";

class User extends Model {}

export default User;
```

You have to define all routes for this model by applying best practices manually if you have a model like this. But why? We already know the model and the table name. We already know the best practices. Why we shouldn't create routes automatically?

In Axe API, we create the following routes automatically if you have a model like this;

| HTTP Method | Url             | Handler  | Behavior                       |
| ----------- | --------------- | -------- | ------------------------------ |
| GET         | `api/users`     | PAGINATE | Paginating all records         |
| POST        | `api/users`     | INSERT   | Creating a new record          |
| GET         | `api/users/:id` | SHOW     | Fetching only one record by id |
| PUT         | `api/users/:id` | UPDATE   | Updating a record by id        |
| DELETE      | `api/users/:id` | DELETE   | Deleting a record by id        |

All methods are **ready** to be used for your model. This is the magic of **Axe API**.

## Handlers

As default, Axe API supports the definitions above. But you may decide what kind of behavior the API support by describing them in your model.

```js
import { Model, HANDLERS } from "axe-api";
const { INSERT, SHOW, UPDATE, PAGINATE } = HANDLERS;

class User extends Model {
  get handlers() {
    return [INSERT, PAGINATE];
  }
}

export default User;
```

With handlers getter, you can select what kind of behavior will be activated for the model. The code above allows only insert and pagination. With this definition, you will get the following routes only;

| HTTP Method | Url         | Handler  | Behavior               |
| ----------- | ----------- | -------- | ---------------------- |
| GET         | `api/users` | PAGINATE | Paginating all records |
| POST        | `api/users` | INSERT   | Creating a new record  |

**Handlers** mean what behaviors have does the model. There are very different handlers that models can support. But also, there are many on the roadmap. You can review our the following handlers table;

- `INSERT`: Creating a new record.
- `PAGINATE`: Paginating the all record.
- `SHOW`: Showing one record by id parameter.
- `UPDATE`: Updating the record by id parameter.
- `DELETE`: Deleting the record by id parameter.

## Related Routes

We want to build related routes when we have related resources. For example, let's assume we have two tables; `users` and `posts` and these tables are related like the following schema;

<div style="text-align:center;">

![Database Schema](/images/routes-01.png)

</div>

In this case, we need routes like this;

| HTTP Method | Url                           |
| ----------- | ----------------------------- |
| GET         | `api/users`                   |
| POST        | `api/users`                   |
| GET         | `api/users/:id`               |
| PUT         | `api/users/:id`               |
| DELETE      | `api/users/:id`               |
| GET         | `api/users/:userId/posts`     |
| POST        | `api/users/:userId/posts`     |
| GET         | `api/users/:userId/posts/:id` |
| PUT         | `api/users/:userId/posts/:id` |
| DELETE      | `api/users/:userId/posts/:id` |

Creating routes in **Axe API** like these is very simple. There is only one thing we should do; **defining relationship** between models. For this case, we should have the following model definitions;

For `app/Models/User.js` model file;

```js
import { Model } from "axe-api";

class User extends Model {
  posts() {
    return this.hasMany("Post", "id", "user_id");
  }
}

export default User;
```

For `app/Models/Post.js` model file;

```js
import { Model } from "axe-api";

class Post extends Model {
  user() {
    return this.belongsTo("User", "user_id", "id");
  }
}

export default Post;
```

The following routes will be created **automatically** when you create a model definition like this.

- `GET api/users`
- `POST api/users`
- `GET api/users/:id`
- `PUT api/users/:id`
- `DELETE api/users/:id`
- `GET api/users/:usedId/posts`
- `POST api/users/:usedId/posts`
- `GET api/users/:usedId/posts/:id`
- `PUT api/users/:usedId/posts/:id`
- `DELETE api/users/:usedId/posts/:id`

## Nested Routes

Axe API will track all of your models. If you define a relationship between multiple models, it will create all related routes. Let's assume you have three models like; User, Post, and Comment. In this case, you will have the following route pattern;

`api/users/:userId/posts/:postId/comments/:id`

Of course, you will not have only one route. If you use default handlers, you will have 15 routes with that kind of relationship.

## Multiple Relation

In some cases, you need to define multiple relationships to the same table at the same time. Axe API supports this feature. Here, we are going to show you a simple example.

Let's assume you have a database schema like this;

<div style="text-align:center;">

![Database Schema](/images/routes-02.png)

</div>

In this case, you have a relationship to a table with two different foreign keys.

For `app/Models/User.js` model file;

```js
import { Model } from "axe-api";

class User extends Model {
  ownedPosts() {
    return this.hasMany("Post", "id", "owner_user_id");
  }

  createdPosts() {
    return this.hasMany("Post", "id", "create_user_id");
  }
}

export default User;
```

For `app/Models/Post.js` model file;

```js
import { Model } from "axe-api";

class Post extends Model {
  owner() {
    return this.belongsTo("User", "owner_user_id", "id");
  }

  creator() {
    return this.belongsTo("User", "create_user_id", "id");
  }
}

export default Post;
```

In this case, you will have the following route schema;

| Url                                   |
| ------------------------------------- |
| `api/users/:id`                       |
| `api/users/:userId/owned-posts/:id`   |
| `api/users/:userId/created-posts/:id` |

> Again, these are just a demonstration. In this definition, you will have 15 routes.

As you can see, your relation method title is used as a URL path by Axe API.

## Recursive Routes

Creating a recursive model is very simple with Axe API. Just add the following relationship structure and it is done! You can use a recursive resource in this way.

```js
import { Model } from "axe-api";

class Category extends Model {
  categories() {
    return this.hasMany("Category");
  }

  category() {
    return this.belongsTo("Category");
  }
}
```

When you define a recursive resource like this, you will have the following routes to access the resource;

| HTTP Method | Route                                     |
| ----------- | ----------------------------------------- |
| GET         | `api/categories`                          |
| GET         | `api/categories/:id`                      |
| POST        | `api/categories`                          |
| PUT         | `api/categories/:id`                      |
| DELETE      | `api/categories/:id`                      |
| GET         | `api/categories/:categoryId/children`     |
| GET         | `api/categories/:categoryId/children/:id` |
| POST        | `api/categories/:categoryId/children`     |
| PUT         | `api/categories/:categoryId/children/:id` |
| DELETE      | `api/categories/:categoryId/children/:id` |

## Custom Routes

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

## Under The Hood

Understanding what's going on under the hood will help you a lot. That's why we wanted a section to explain how we create routes.

First, you need to understand, Axe API analyzes models in the booting period. If you make a mistake in your relationship definition, your API will not be started correctly, and you may see some errors. If you can see the API is working, it means that Axe API created all routes by your model definitions.

The basic route name (For example `users` in `api/users/:id` route) will be taken from the model as plural. If you define a specific table name in your model (please look at the [Models]()), that name will be used.

The title of the relationship definition method will be used in the route definition. For example, if your relation method name is `myPosts` in your `User` model, you will the this route; `api/users/:userId/my-posts`

Your model name can be used as a parent key in related routes. For example, if your model name is `User`, your parent key will be `userId`. (`api/users/:userId/posts`)

Having many relationship between your database tables doesn't mean you have to define all of your relationship in your models. **Our models are not an ORM model.** You just define a relationship in a model if you want a parent/child relationship.

## API

The basic relationship schema;

```js
{RELATION_NAME} () {
  return this.{RELATION_TYPE}({RELATED_MODEL}, {PRIMARY_KEY}, {FOREIGN_KEY}})
}
```

#### RELATION_NAME

The name of your relation. Examples; `posts`, `comments`, `createdArticles`

#### RELATION_TYPE

The type of relation. Possible values: `hasMany`, `hasOne`, `belongsTo`

#### PRIMARY_KEY

The parent table colum name. Default value: `id`

#### FOREIGN_KEY

The related table's relation column. Default value can be detect by the parent table. For example; if the parent table is `User`, _FOREIGN_KEY_ will be `user_id`.

## Documentation

After the auto-creation process, probably you want to see created routes as a developer. That's why we added documentation support for auto-created routes. You can visit the following route after the application has been executed;

`http://localhost:3000/docs`

```json
{
  "routes": [
    {
      "model": "User",
      "table": "users",
      "method": "POST",
      "url": "/api/users",
      "fillable": ["email", "name"],
      "validations": { "email": "required|email", "name": "required" }
    },
    { "model": "User", "table": "users", "method": "GET", "url": "/api/users" },
    {
      "model": "Post",
      "table": "posts",
      "method": "POST",
      "url": "/api/users/:userId/my-posts",
      "fillable": ["title", "content"],
      "validations": { "title": "required|max:100" }
    }
  ],
  "modelTree": [
    {
      "name": "User",
      "instance": {
        "relations": [
          {
            "name": "myPosts",
            "resource": "my-posts",
            "type": "HAS_MANY",
            "model": "Post",
            "primaryKey": "id",
            "foreignKey": "user_id"
          },
          {
            "name": "otherPosts",
            "resource": "other-posts",
            "type": "HAS_MANY",
            "model": "Post",
            "primaryKey": "id",
            "foreignKey": "user_id"
          }
        ]
      },
      "hooks": {},
      "events": {},
      "children": [
        {
          "name": "Post",
          "instance": {
            "relations": [
              {
                "name": "user",
                "resource": "user",
                "type": "HAS_ONE",
                "model": "User",
                "primaryKey": "id",
                "foreignKey": "user_id"
              }
            ]
          },
          "hooks": {},
          "events": {},
          "children": []
        }
      ]
    }
  ]
}
```

With this response, you may review what kind of routes have been created automatically. But also, you can see fillable fields and form validations in POST and PUT requests. Additionally, we added `modelTree` variable that we keep model relations between each. This response demonstrates how Axe API resolved your models.

But again, if you want simpler results for your auto-created routes, you should use the following request.

`http://localhost:3000/docs/routes`

```json
[
  "POST /api/users",
  "GET /api/users",
  "GET /api/users/:id",
  "PUT /api/users/:id",
  "DELETE /api/users/:id",
  "POST /api/users/:userId/posts",
  "GET /api/users/:userId/posts",
  "GET /api/users/:userId/posts/:id",
  "PUT /api/users/:userId/posts/:id",
  "DELETE /api/users/:userId/posts/:id"
]
```

This request returns simpler results for your auto-created routes.
