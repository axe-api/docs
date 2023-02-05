# What is Axe API?

Axe API is a [Node.js](https://nodejs.org/) framework that helps you create a **Rest API** in a declarative way quickly. :axe:

:::tip
It has been written with [TypeScript](https://www.typescriptlang.org/) and built on [Express](https://expressjs.com/) and [Knex.js](https://knexjs.org/).
:::

## Motivation

You would understand easily what you are going to code when you look at a bunch of database tables and their relations with each other, more or less. Because, as a developer, you already know that _Rest API_ best practices.

Therefore I asked a simple question more than two years ago;

**_"Can we create a Rest API in a declarative way, and handle all endpoints automatically?"_**

As a result of our work, we have a framework called Axe API that provides a solution to analyze your API definitions and handle all of the endpoints.

Basically, you define your models which are your API definitions, and Axe API analyzes them and processes all of your endpoints instead of you.

## Showcase

Let's look at an example!

You have two database tables; `users` and `posts`. These tables are related to each other and we aim that create a **Rest API** for basic **CRUD** endpoints.

The only thing to do is creating models like the following example;

```ts
class User extends Model {
  get fillable(): string[] {
    return ["email", "name", "surname"];
  }

  posts(): IRelation {
    return this.hasMany("Post", "id", "user_id");
  }
}
```

```ts
class Post extends Model {
  get fillable(): string[] {
    return ["title", "description"];
  }

  user(): IRelation {
    return this.belongsTo("User", "user_id", "id");
  }
}
```

Tada! :tada:

Your API is ready to process all of the following endpoints after those model definitions are done.

- [GET] `api/v1/users`
- [POST] `api/v1/users`
- [GET] `api/v1/users/:id`
- [PUT] `api/v1/users/:id`
- [DELETE] `api/v1/users/:id`
- [GET] `api/v1/users/:userId/posts`
- [POST] `api/v1/users/:userId/posts`
- [GET] `api/v1/users/:userId/posts/:id`
- [PUT] `api/v1/users/:userId/posts/:id`
- [DELETE] `api/v1/users/:userId/posts/:id`

This is the main power of Axe API. Nevertheless, it is not limited only to this power. There are many more features are waiting to discover. :bulb:
