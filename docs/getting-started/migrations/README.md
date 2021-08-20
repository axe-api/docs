# Migrations

In this document, we are going to create a migration file to build an API example.

## Knex CLI

Axe API uses [Knex.js](http://knexjs.org/) as [the schema builder](http://knexjs.org/#Schema).

To execute the migrations, first you need to install the Knex CLI in your development environment;

```bash
$ npm install -g knex
```

To test **knex CLI** is accessible, you can use the following command;

```bash
$ knex --version

Knex CLI version: 0.95.5
Knex Local version: 0.95.5
```

## Create Migration

To create a new migration file in it, you should use the following command;

```bash
$ knex --esm migrate:make User

Using environment: development
Created Migration: ./migrations/20210515162821_User.js
```

::: warning
The file name will be different in your machine.
:::

If you look the detail of the file (`migrations/20210515162821_User.js`), you will see the following code;

```js
exports.up = function(knex) {};

exports.down = function(knex) {};
```

Unfortunately, the CLI created the migration file for CommonJS. We should change it with ESM manually. Please change the migration file content like the following example;

```js
export const up = function(knex) {
  return knex.schema.createTable("users", function(table) {
    table.increments();
    table.string("name");
    table.string("surname");
    table.timestamps();
  });
};

export const down = function(knex) {
  return knex.schema.dropTable("users");
};
```

And this is the basic structure of our migration files.

## Migrate

To execute this migration file, you should execute the following command;

```bash
$ knex --esm migrate:latest

Using environment: development
Batch 1 run: 1 migrations
```

Yay! You created the first database table.
