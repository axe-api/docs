# Routes

Routes enable the outside world to interact with your app via URLs [[AdonisJs Routing](https://adonisjs.com/docs/4.1/routing)]. But also, they are the heart of the application in **Axe API**.

You have to define routes by writing codes in many different frameworks such as [AdonisJs](https://adonisjs.com/docs/4.1/routing), [Laravel](https://laravel.com/docs/7.x/routing), etc. For example, in AdonisJs, you can use the following code to define a simple route;

```js
Route.get("api/users", "UserController.index");
```

It is very simple. But again, if we have many different models we need to define all routes by writing code. Nevertheless, there are strong [API Best Practices](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api) out there, many developers agree on it. In **Axe API**, we thought that why we don't create routes **automatically** even we know all relationships between models. This is the **key** point to create **Axe API**.

## Auto Detection

When you create a new database **model**, **Axe API** analyzes its structure to create routes automatically. Let's assume that you have a model like this;

```js
const XModel = use("Axe API/Models/XModel");

class User extends XModel {
  static get table() {
    return "users";
  }
}
```

You have to define all routes for this model by applying best practices manually if you have a model like this. But why? We already know the model and the table name. We already know the best practices. Why we shouldn't create routes automatically?

In Axe API, we create the following routes automatically if you have a model like this;

| Method | Url             | Behavior                       |
| ------ | --------------- | ------------------------------ |
| GET    | `api/users`     | Paginating all records         |
| POST   | `api/users`     | Creating a new record          |
| GET    | `api/users/:id` | Fetching only one record by id |
| PUT    | `api/users/:id` | Updating a record by id        |
| DELETE | `api/users/:id` | Deleting a record by id        |

All methods are **ready** to be used for your model. This is the magic of **Axe API**.

## Allow Specific HTTP Methods

You can access all possible methods for a model if you don't deny any HTTP method. For example, let's assume that you don't want to allow the `DELETE` method. In this case, you should add the following method in your model structure;

```js
class User extends XModel {
  static get actions() {
    return ["GET", "POST", "PUT"];
  }
}
```

If your model a method called `actions` and if that method has an array like this, you will not have a `DELETE` route anymore.

| Method | Url             | Behavior                       |
| ------ | --------------- | ------------------------------ |
| GET    | `api/users`     | Paginating all records         |
| POST   | `api/users`     | Creating a new record          |
| GET    | `api/users/:id` | Fetching only one record by id |
| PUT    | `api/users/:id` | Updating a record by id        |

## Related Routes

We want to build related routes when we have related resources. For example, let's assume we have two tables; `users` and `posts` and these tables are related like the following schema;

<div style="text-align:center;">

![Database Schema](/images/routes-01.png)

</div>

In this case, we need routes like this;

| Method | Url                           |
| ------ | ----------------------------- |
| GET    | `api/users`                   |
| POST   | `api/users`                   |
| GET    | `api/users/:id`               |
| PUT    | `api/users/:id`               |
| GET    | `api/users/:userId/posts`     |
| POST   | `api/users/:userId/posts`     |
| GET    | `api/users/:userId/posts/:id` |
| PUT    | `api/users/:userId/posts/:id` |

Creating routes in **Axe API** like these is very simple. There is only one thing we should do; [defining relationship](https://adonisjs.com/docs/4.1/relationships) between models. For this case, we should have the following model definitions;

For `User.js` model file;

```js
class User extends XModel {
  posts() {
    return this.hasMany("App/Models/Post");
  }
}
```

For `Post.js` model file;

```js
class Post extends XModel {
  user() {
    return this.hasOne("App/Models/User", "user_id", "id");
  }
}
```

This is the simple relationship definition in [Lucid Models](https://adonisjs.com/docs/4.1/relationships). The routes will be created **automatically** when you create a model definition like this.

Also, if you more complex relationships, **Axe API** will follow your relations.

## Custom Middlewares

You may use the following statements in model structure to add your logics to some routes for some models;

```js
const XModel = use('Axe API/Models/XModel')

class Users extends XModel {
  static get table () {
    return 'users'
  }

  static get middlewares () {
    return [
      'App/Middleware/CallOnAllRequestsMiddleware',
      { method: 'GET', middleware: 'App/Middleware/CallOnGETMiddleware' }
      { method: 'POST', middleware: 'App/Middleware/CallOnPOSTMiddleware' }
    ]
  }
}
```

In here, you can add multiple different **Middleware** layer for a model. But also you can specify it for only some methods.

With this, you can add an [AdonisJs Middleware](https://adonisjs.com/docs/4.1/middleware) for your model routes.

## Recursive Resources

Creating a recursive model is very simple with Axe API. Just add the following relationship structure and it is done! You can use a recursive resource in this way.

```js
const XModel = use("Axe API/Models/XModel");

class Category extends XModel {
  static get table() {
    return "categories";
  }

  static get fillable() {
    return ["title"];
  }

  categories() {
    return this.hasMany("App/Models/Category");
  }

  category() {
    return this.hasOne("App/Models/Category");
  }
}
```

When you define a recursive resource like this, you will have the following routes to access the resource;

| Method | Route                                     |
| ------ | ----------------------------------------- |
| GET    | `api/categories`                          |
| GET    | `api/categories/:id`                      |
| POST   | `api/categories`                          |
| PUT    | `api/categories/:id`                      |
| DELETE | `api/categories/:id`                      |
| GET    | `api/categories/:categoryId/children`     |
| GET    | `api/categories/:categoryId/children/:id` |
| POST   | `api/categories/:categoryId/children`     |
| PUT    | `api/categories/:categoryId/children/:id` |
| DELETE | `api/categories/:categoryId/children/:id` |
