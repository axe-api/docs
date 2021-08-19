# Getting Started

Using **Axe API** in an application is very easy. We've created a CLI tool for you; [axe-magic](https://github.com/axe-api/axe-magic).

## Installation

You can create a new Axe API project by using **axe-magic**. But first, you should install it in your development environment. When you installed it, you should be able to access **axe-magic** command via CLI;

```bash
$ npm i -g axe-magic
$ axe-magic --version
1.0.0
```

After that, creating a new project is very easy. Just you have should execute the following command;

```bash
$ axe-magic new
```

This command will pull [axe-api-template](https://github.com/axe-api/axe-api-template) project to your current directory with a new name, **axe-api**.

## Directory Structure

We aimed to create the simplest folder structure. It is clean, understandable, and minimal.

```
.
├── app/
  ├── Config
  ├── Events
  ├── Hooks
  ├── Middlewares
  ├── Models
├── migrations/
├── tests/
├── .env
├── init.js
└── package.json
```

As you can see, you can not find an **MVC** architecture in the project folder. Because we suggest a tool to create an **API**. So we don't need _"Views"_ layers anymore. Also, we provide **CRUD API** operations. So that you will not need a **Controller** anymore. That's why we have only the **Models** folder in the project directory list.

In this structure, only the **Config** and **Models** folders are necessary. But we strongly suggest that to having other folders to build a strong application.

You may review the following explanations to understand the basic facts about the folders.

- `app.Config`: All configuration files about the application.
- `app.Events`: You should use this folder to handle all events of a model.
- `app.Hooks`: You should use this folder to handle all hooks of a model.
- `app.Middleware`: You should use this folder to create general or specific middlewares across the application.
- `app.Models`: You should define your database models under this folder.
- `migrations`: The folder which you can write your database migrations.

## Env File

The project has a `.env` file to detect your environment variables. We use [dotenv](https://www.npmjs.com/package/dotenv) packages to manage your .env file. The minimal .env file should have the following keys;

- `NODE_ENV`: The execution environment of your Node.js app. The default value is **"development"**.
- `APP_PORT`: 3000
- `DB_CLIENT`: The database provider. Default value is **"mysql"**. You can select many of other values which [Knex.js supports](http://knexjs.org/#Installation-client).
- `DB_HOST`: The database host
- `DB_USER`: The databse user
- `DB_PASSWORD`: The database password
- `DB_DATABASE`: The database schema.

> All database configurations have been designed by [the documentation of Knex.js](http://knexjs.org/). You can review its documentation to understand more.

You should edit your .env files by your development environment.

## Installing Dependencies

To install your project's depencies, you should execute the following command in the root directory;

```
$ npm install
```

## Serving The API

To serve this application, you should execute the following command;

```bash
$ npm run start:dev
```

> `start:dev` command use [nodemon](https://www.npmjs.com/package/nodemon). If you haven't installed it yet, we suggest you install it first.

After that, your first **Axe API** application will be running in `localhost:3000`.

> If you change the `APP_PORT` key in your _.env_ file, the app will be hosted in the port you select.

You will see the following API response if you visit [localhost:3000](http://localhost:3000).

```json
{
  "name": "AXE API",
  "description": "The best API creation tool in the world.",
  "aim": "To kill them all!"
}
```

If you can't see this response, probably you missed a step. Please review the documentation one more time or you can create [an issue](https://github.com/axe-api/axe-api/issues) about your problem. We are open to hearing your problem.

## Writing Migrations

To see some real results, we should create a migration file (`20210509145612_User`) under the `migrations` folder.

```js
export const up = function(knex) {
  return knex.schema.createTable("users", function(table) {
    table.increments();
    table.string("name");
    table.string("email").unique();
  });
};

export const down = function(knex) {
  return knex.schema.dropTable("users");
};
```

In this file, we create a simple `users` table which has got three columns; `id`, `name`, and `email`. In our migration system, we use Knex.js' migration structure. In our migration system, we use Knex.js' migration structure. So, you need to install [knex](https://www.npmjs.com/package/knex) in your local development environment to execute migrations. To do that, please execute the following command;

```bash
$ npm install -g knex
```

To test **knex CLI** is accessible, you can use the following command;

```bash
$ knex --version

Knex CLI version: 0.95.5
Knex Local version: 0.95.5
```

If everything looks ok, first, you should create a database schema on your database and then you can execute the following command to run your migration file.

```bash
$ knex --esm migrate:up

Using environment: development
Batch 1 ran the following migrations:
20210509145612_User.js
```

After you see everything is ok, you can look at your database schema to if the table has been created.

## Understanding Models

In the project, we created a basic a simple model file for you; `Models/User.js`. The file looks like this;

```js
import { Model } from "axe-api";

class User extends Model {}

export default User;
```

As you can see, this is a very simple file and it contains almost nothing except the `Model` extent. For now, we don't have to change anything about this file. You hardly believe us but the API is almost ready to use. To check it, please navigate your browser the following URL;

`http://localhost:3000/api/users`

```json
{
  "data": [],
  "pagination": {
    "total": 0,
    "lastPage": 0,
    "perPage": 10,
    "currentPage": 1,
    "from": 0,
    "to": 0
  }
}
```

Wow! What happened here? We didn't write any controller, we didn't write any code to fetch or filter data from the table. What's the hack? Let's explain what happened;

- You executed Axe API with the command; `npm run start:dev`.
- Axe API analyzed which models you have in the `app/Models` folder.
- You have only one Model; `app/Models/User.js`
- Axe API analyzed if the User.js has any relations to any other model but it doesn't have any.
- Axe API created the following routes to handle;
  - `POST api/users`
  - `GET api/users`
  - `GET api/users/:id`
  - `PUT api/users/:id`
  - `DELETE api/users/:id`
- When you navigate the `GET api/users` url, Axe API handles the request;
  - It checked that we should work with `app/Models/User.js`
  - It analyzed your HTTP request.
  - It queried the data from `users` table.
  - And it response the result with pagination.

## Understanding Routes

When an **Axe API** application has been executed, it analyzes your models and it's relations to create routes. There are five default routes for a model;

| Method | Url           | Behavior                       |
| ------ | ------------- | ------------------------------ |
| GET    | api/users     | Paginating all records         |
| POST   | api/users     | Creating a new record          |
| GET    | api/users/:id | Fetching only one record by id |
| PUT    | api/users/:id | Updating a record by id        |
| DELETE | api/users/:id | Deleting a record by id        |

When you create a model, these routes will be created automatically. But also, all routes will be handled by Axe API. At this point, you may ask this question; what if I have many models which are related to each other? Let's imagine the situation;

`app/Models/User.js`

```js
import { Model } from "axe-api";

class User extends Model {
  posts() {
    return this.hasMany("Post", "id", "user_id");
  }
}

export default User;
```

`app/Models/Post.js`

```js
import { Model } from "axe-api";

class Post extends Model {
  user() {
    return this.belongsTo("User", "user_id", "id");
  }
}

export default Post;
```

In this situation, you will have the following routes;

- `POST api/users`
- `GET api/users`
- `GET api/users/:id`
- `PUT api/users/:id`
- `DELETE api/users/:id`
- `POST api/users/:userId/posts`
- `GET api/users/:userId/posts`
- `GET api/users/:userId/posts/:id`
- `PUT api/users/:userId/posts/:id`
- `DELETE api/users/:userId/posts/:id`

As you can see, they are related URL structure which has been created by best practices. Also, all routes will be handled by Axe API. This is the power of it. At this point, you don't need to do anything at all!

The main philosophy of the Axe API is just this; **define** the models, and **handle** hooks.

## Business Logics

You may ask yourself that how can you do something special by creating a new user, such as sending a confirmation email. We already know that we cannot automate everything. Soon or later, you will need special use cases. That's why we created some escape points; [Custom Routes](), [Middlewares](), [Events](), and [Hooks]().

Shortly, we can say that you can add your custom logic to the code whenever you want. In every section, we explain it in detail. But here, we want to show a simple Hook example for you.

Let's assume that you have a user model;

`app/Models/User.js`

```js
import { Model } from "axe-api";

class User extends Model {
  posts() {
    return this.hasMany("Post", "id", "user_id");
  }
}

export default User;
```

For example, let's assume that you want to send a confirmation email to the user, after creation. You should create a new file like this;

`app/Hooks/UserHooks.js`

```js
const onAfterInsert = async ({ formData, item }) => {
  // Write your custom logics
};

export { onAfterInsert };
```

As you cen see, there is a method which is called `onAfterInsert` there. This method is analyzed in the initialization process by Axe API. Axe API knows that that hook is related to the user model by looking at their names. Whenever you called the creation URL, Axe API calls the method you've defined after the data has been inserted into the table. This is a simple demonstration of how escape points work.

We have many different escape points for Hooks and Events;

- `onBeforeInsert()`
- `onBeforeUpdateQuery()`
- `onBeforeUpdate()`
- `onBeforeDelete()`
- `onBeforePaginate()`
- `onBeforeShow()`
- `onAfterInsert()`
- `onAfterUpdateQuery()`
- `onAfterUpdate()`
- `onAfterDelete()`
- `onAfterPaginate()`
- `onAfterShow()`

## Database Support

**Axe API** use [Knex.js](http://knexjs.org/). It means that you can use all supported databases by **Knex.js**. Which are;

- Postgres
- MSSQL
- MySQL
- MariaDB
- SQLite3
- Oracle
