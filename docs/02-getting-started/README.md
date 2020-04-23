# Getting Started

Installing a **AdonisX** application is very easy. We've created a simple CLI tool for you.

## Installation

You can create a new AdonisX project by using following commands;

```bash
$ npm install -g adonisx-cli
$ adonisx new
$ cd adonisx-example
$ yarn & yarn serve
```

## Directory Structure

The project's directory structure is almost same with AdonisJs;

```
.
├── app/
  ├── ...
├── config/
  ├── app.js
  ├── database.js
  └── ...
├── database/
  ├── migrations/
  ├── seeds/
├── start/
  ├── app.js
  ├── events.js
  ├── kernel.js
  └── routes.js
  └── triggers.js
├── test/
├── ace
├── server.js
└── package.json
```

> You would see some differences after you started to use it although it is almost same with AdonisJs.

## Configuration

To configure your API, you can use [AdonisJS Configuration](https://adonisjs.com/docs/4.1/configuration-and-env) system.

## Database Support

**AdonisX** use [Lucid ORM](https://adonisjs.com/docs/4.1/lucid). **Lucid** is the AdonisJS implementation of the active record pattern. Under the hood, Lucid uses [Knex.js](http://knexjs.org/). It means that you can use all supported databases by **Knex.js**. Which are;

- Postgres
- MSSQL
- MySQL
- MariaDB
- SQLite3
- Oracle
- Amazon Redshift