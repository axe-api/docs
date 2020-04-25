# Getting Started

Using **AdonisX** in an application is very easy. We've created a CLI tool for you; [adonisx-cli](https://github.com/adonisx/adonisx-cli).

## Installation

You can create a new AdonisX project by using **adonisx-cli**. But first, you should install it in your development environment. When you installed it, you should be able to access **adonisx** command via cli;

```bash
$ npm i -g adonisx-cli
$ adonisx --version
1.0.0
```

After that, creating a new project is very easy. Just you have execute following command;

```bash
$ adonisx new my-api
```

This command will pull [adonisx-example](https://github.com/adonisx/adonisx-example) project to your current directory with a new name, **my-api**.

## Directory Structure

The project's directory structure is almost same with [AdonisJs](https://adonisjs.com/docs/4.1/folder-structure). We just simplified it for an API. But still you can add all **AdonisJs** folders which you want to use.

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

## Serve

To serve this application, first you should have **AdonisJs CLI** in your machine;

```bash
$ npm i -g @adonisjs/cli
```

Then you can go to your project directory and execute this commands;

```bash
$ yarn
$ adonis migration:run
$ adonis serve
```

After that, your first **AdonisX** aplication will be running in `localhost:3333`.

> We created a migration file to create `users` table and insert some data. If you want to review it, you can find migrations files under **database** folder.

In this example project, we selected [SQLite](https://www.sqlite.org/index.html) as database, created a `users` table and added some rows in it. You can visit `localhost:3333/api/users` url in your browser to see how it is running;

![Pagination Result](/images/01-paginate.jpg)

Also, you can see the detail of any row by using it's id in the url like this;

![Show Result](/images/02-show.jpg)

## Routes

When an **AdonisX** application has been execute, it analyzes your models and it's relations to create routes. To see all routes which you can use, you should use **adonis route:list** command in your terminal;

![Adonis Routes](/images/03-routes.jpg)

As you can see, **MainController** is the basic handler for all your requests. Whenever you create a new **Model**, it will be handled by **MainController**. Let's look at its detail;

```js
const XController = use('AdonisX/Controllers/XController')

class MainController extends XController {

}
```

As you can see, it is a controller which has been extended by **XController**. *XController* is a general handler managed by **AdonisX**. We don't suggest that although you can override its methods in here. **AdonisX** provides you more elegant and secure ways to extends your endpoint's logic. If you want to learn more about it, you should read [Extensions](/05-extensions) section.

## Testing

In this example project, we created a basic [HTTP Test](https://adonisjs.com/docs/4.1/api-tests) structure for you. You can execute these tests with **adonis test** command;

![Adonis Routes](/images/04-tests.jpg)

If you want to see its code, it is something like this;

```js
const { test, trait } = use('Test/Suite')('01-User')

trait('Test/ApiClient')

test('I should be able to list all users', async ({ client }) => {
  const response = await client
    .get('/api/users')
    .end()
  response.assertStatus(200)
})
```

As you can see it is a basic testing structure. It sends an HTTP request to our API to fetch all users when you execute it.

## Models

Usually we have some business logic in our code. For example, you don't want to **allow** all users to delete a user record. Maybe you will need some **form validations** in **saving**. We can have many different scenarios in **real world**.

**AdonisX** provides you two different solution; **model definitions** and **extensions**. You can see all details of these two solution in next chapters. But still, we want to simplified *"What is model definition?"* in here.

**Model definition** is a a way to decide how **AdonisX** should work with any model. It basically works with convention over configuration. Let's assume you create a model like this;

```js
const XModel = use('APIX/Models/XModel')

class User extends XModel {

}
```

This is a simplest model definition. But extending from **XModel** gives some properties to this Model. And you can override all of configuration as you wish. For example if you want to add some form validation, you can override the form validation method in your model;

```js
const XModel = use('APIX/Models/XModel')

class User extends XModel {

  static get validations () {
    return {
      email: 'required|email'
    }
  }

}
```

In [Models Chapter](/03-models), you can see a detailed list of all overridable model definitions.

## Extensions

Extensions are another way to implement your **custom business logic** to your API. For example, if you want to send an e-mail to a user after registration process, you can create an [Event](/05-extensions/#example) for after record creation on `users` table. When you handle the event in your **listener**, you can implement your custom business logic easily.

```js
const Event = use('Event')

Event.on('onAfterCreateUser', 'UserListener.sendEmail')
```

```js
class UserListener {
  sendEmail ({ request, params, data }) {
    // Implement you business logic in here...
  }
}
```

You can read more about it [Extensions Chapter](/05-extensions).


## Database Support

**AdonisX** use [Lucid ORM](https://adonisjs.com/docs/4.1/lucid). **Lucid** is the AdonisJS implementation of the active record pattern. Under the hood, Lucid uses [Knex.js](http://knexjs.org/). It means that you can use all supported databases by **Knex.js**. Which are;

- Postgres
- MSSQL
- MySQL
- MariaDB
- SQLite3
- Oracle
- Amazon Redshift