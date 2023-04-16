# Tutorial: Bookstore API

<p class="description">
This tutorial will guide you in building a small bookstore API with Axe API. Prior knowledge of Axe API is not required, as this tutorial provides a thorough explanation of how Axe API operates and why it is a potent tool.
</p>

<ul class="intro">
  <li>You will learn</li>
  <li>How to create a new project</li>
  <li>How to connect a database</li>
  <li>How to define daatabase migrations</li>
  <li>How to create endpoints</li>
  <li>How to validate request data</li>
  <li>How to use middlewares</li>
  <li>How to use hooks</li>
  <li>How to query data</li>
</ul>

## Bookstore API

The Bookstore API is designed to showcase the fundamental features of Axe API. It includes three tables (users, books, and orders) with corresponding endpoints. The process of building the API will be demonstrated from scratch.

## Step 1. Installing CLI

To create a new Axe API project, the axe-magic CLI can be utilized. The tool can be installed on your device using the specified command.

```bash
$ npm i -g axe-magic
```

After the installation of axe-magic, the version of the tool can be verified;

```bash
$ axe-magic --version
```

## Step 2. Creating a new project

The axe-magic CLI is a tool to create a new Axe API project by pulling a template from GitHub and configuring it. To create a new project, you can use the given command.

```bash
$ axe-magic new bookstore
```

To install the dependencies for the bookstore project, you need to navigate to the project directory and run the command `npm install` in your terminal.

```bash
$ cd bookstore
$ npm install
```

## Step 3. Setup database

To use Axe API with a relational database system, a running database is required, and a database schema needs to be created to work on it.

Axe API supports many different relational database systems such as PostgreSQL, CockroachDB, MSSQL, MySQL, MariaDB, SQLite3, Better-SQLite3, Oracle, and Amazon Redshift.

While this tutorial covers MySQL and PostgreSQL examples, the equivalent commands can be used for other databases.

Let's create the bookstore schema;

::: code-group

```sql [MySQL]
CREATE DATABASE bookstore CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

```sql [PostgreSQL]

```

:::

## Step 4. Setting configurations

To set up the database connection for Axe API, you need to create a .env file in the root folder of the project and set the appropriate database connection information.

During initialization, Axe API loads this file and sets up the database connection based on the information provided in the file.

::: code-group

```bash [.env]
NODE_ENV=development
APP_PORT=3000
DB_CLIENT=mysql
DB_HOST=localhost
DB_USER=db-user
DB_PASSWORD=db-password
DB_DATABASE=bookstore
```

:::

## Step 5. Executing the applications

To execute the Axe API application, you can use the command `npm run start:dev` in the terminal, and Axe API will start the server on the defined port in the `.env` file.

```bash
$ npm run start:dev
```

When the API is running correctly, you should see the following messages in your console:

```bash
[axe] All API versions have been resolved.
[axe] [v1] All models have been resolved.
[axe] [v1] Database schema has been validated.
[axe] [v1] Model tree has been created.
[axe] [v1] Express routes have been created.
[axe] API listens requests on http://localhost:3000
```

This indicates that the Axe API server is listening on the specified URL.

To check what your project has, you can visit [localhost:3000/routes](http://localhost:3000/routes). However, the response will be empty as your project does not currently have any model.

## Step 6. Creating migrations

The next step is to create the database tables. Axe API uses the [knex.js](https://knexjs.org) library for database operations and migrations.

Therefore, you should install the knex CLI on your machine.

```bash
$ npm install -g knex
```

To create a migration file for each table, you can execute the following command:

```bash
$ knex --esm migrate:make Users
$ knex --esm migrate:make Books
$ knex --esm migrate:make Orders
```

To define the structure of each table in a migration file, you can easily copy and paste the following content into each file.

::: code-group

```js [migrations/Users.js]
export const up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("email").notNullable().unique().index();
    table.string("password").notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.timestamps();
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("users");
};
```

```js [migrations/Books.js]
export const up = function (knex) {
  return knex.schema.createTable("books", function (table) {
    table.increments();
    table.string("name").notNullable();
    table.string("author").notNullable();
    table.double("price").notNullable();
    table.timestamps();
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("books");
};
```

```js [migrations/Orders.js]
export const up = function (knex) {
  return knex.schema.createTable("orders", function (table) {
    table.increments();
    table.integer("book_id").unsigned().notNullable();
    table.integer("user_id").unsigned().notNullable();
    table.integer("quantity").notNullable().defaultTo(1);
    table.timestamps();

    table
      .foreign("book_id")
      .references("books.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .foreign("user_id")
      .references("users.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("orders");
};
```

:::

Once your migration files are ready, you can use the following command to migrate your database.

```bash
& knex --esm migrate:latest
```

Let's break down the next steps after connecting to the database and creating tables. These steps are fairly common for other frameworks or libraries as well.

## Step 7. Setting up models

The next task is to set up models, which are located in the `Models` folder under the `app` directory. In Axe API, you can have multiple versions of your API on the same database schema, which is why you'll find the `app/v1` folder in your project.

Let's create model files for all tables;

::: code-group

```ts [app/v1/Models/User.ts]
import { Model } from "axe-api";

class User extends Model {}

export default User;
```

```ts [app/v1/Models/Book.ts]
import { Model } from "axe-api";

class Book extends Model {}

export default Book;
```

```ts [app/v1/Models/Order.ts]
import { Model } from "axe-api";

class Order extends Model {}

export default Order;
```

:::

After you created models files, you should be able to see the following results when you visit [localhost:3000/routes](http://localhost:3000/routes) URL.

```json
[
  "POST /api/v1/users",
  "GET /api/v1/users",
  "GET /api/v1/users/:id",
  "PUT /api/v1/users/:id",
  "PATCH /api/v1/users/:id",
  "DELETE /api/v1/users/:id"
  "POST /api/v1/books",
  "GET /api/v1/books",
  "GET /api/v1/books/:id",
  "PUT /api/v1/books/:id",
  "PATCH /api/v1/books/:id",
  "DELETE /api/v1/books/:id"
  "POST /api/v1/orders",
  "GET /api/v1/orders",
  "GET /api/v1/orders/:id",
  "PUT /api/v1/orders/:id",
  "PATCH /api/v1/orders/:id",
  "DELETE /api/v1/orders/:id"
]
```

You can see the following pagination result when you visit the [localhost:3000/api/v1/users](http://localhost:3000/api/v1/users);

```json
{
  data: [],
  pagination": {
    "total": 0,
    "lastPage": 1,
    "prevPage": null,
    "nextPage": null,
    "perPage": 10,
    "currentPage": 1,
    "from": 0,
    "to": 10
  }
}
```

This result indicates that your models have been analyzed correctly by Axe API and that all endpoints have been added to your API.

Until now, we only created the basic structure of your API but we are going to add more logic in the following steps.

## Step 8. Adding new data

Yeni bir veri eklemek için modellerde gerekli değişikliklikleri yapacağız.

## Step 8. Creating relations

Bu bölümde modeller arasında ilişki kuracağız.

## Step 9. Enable authentications

Authentication özelliklerini dahil edeceğiz ve modelleri korumaya alacağız.

## Step 10. Adding hooks

Hook örnekleri ekleyeceğiz ve verileri korumaya alacağız.

## Step 11. Querying data

Verilerin nasıl sorgulandığını göstereceğiz.

## Next step

Bu bölümde neler öğrendik ve sonraki bölümlerde neler öğreneceğiz.
