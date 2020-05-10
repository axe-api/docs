# Getting Started

Using **AdonisX** in an application is very easy. We've created a CLI tool for you; [adonisx-cli](https://github.com/adonisx/adonisx-cli).

## Installation

You can create a new AdonisX project by using **adonisx-cli**. But first, you should install it in your development environment. When you installed it, you should be able to access **adonisx** command via CLI;

```bash
$ npm i -g adonisx-cli
$ adonisx --version
1.0.0
```

After that, creating a new project is very easy. Just you have should execute the following command;

```bash
$ adonisx new my-api
```

This command will pull [adonisx-example](https://github.com/adonisx/adonisx-example) project to your current directory with a new name, **my-api**.

## Directory Structure

The project's directory structure is almost the same as [AdonisJs](https://adonisjs.com/docs/4.1/folder-structure). We just simplified it for an API. But still, you can add all **AdonisJs** folders which you want to use.

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
├── test/
├── ace
├── server.js
└── package.json
```

## Serve

To serve this application, first, you should have **AdonisJs CLI** in your machine;

```bash
$ npm i -g @adonisjs/cli
```

Then you can go to your project directory and execute these commands;

```bash
$ yarn
$ adonis migration:run
$ adonis serve
```

After that, your first **AdonisX** application will be running in `localhost:3333`.

> We created a migration file to create a `users` table and insert some data. If you want to review it, you can find migrations files under the **database** folder.

In this example project, we selected [SQLite](https://www.sqlite.org/index.html) as the database, created a `users` table, and added some rows in it. You can visit `localhost:3333/api/users` URL in your browser to see how it is running;

![Pagination Result](/images/01-paginate.jpg)

Also, you can see the detail of any row by using its id in the URL like this;

![Show Result](/images/02-show.jpg)

## Routes

When an **AdonisX** application has been executed, it analyzes your models and it's relations to create routes. To see all routes which you can use, you should use **adonis route:list** command in your terminal;

![Adonis Routes](/images/03-routes.jpg)

As you can see, **MainController** is the basic handler for all your requests. Whenever you create a new **Model**, it will be handled by **MainController**. Let's look at its detail;

```js
const XController = use('AdonisX/Controllers/XController')

class MainController extends XController {

}
```

As you can see, it is a controller that has been extended by **XController**. 

> *XController* is a general handler managed by **AdonisX**. We don't suggest that although you can override its methods in here. **AdonisX** provides you more elegant and secure ways to extends your endpoint's logic. If you want to learn more about it, you should read [Extensions](/05-extensions) section.

There are four possible routes for a model;

| Method | Url           | Behavior                       |
|--------|---------------|--------------------------------|
| GET    | api/users     | Paginating all records         |
| POST   | api/users     | Creating a new record          |
| GET    | api/users/:id | Fetching only one record by id |
| PUT    | api/users/:id | Updating a record by id        |
| DELETE | api/users/:id | Deleting a record by id        |

Also, when you define **model relations**, routes will be created by best practices. Let's assume you have two models like this;

```js
class User extends XModel {
  posts () {
    return this.hasMany('App/Models/Post')
  }
}

class Post extends XModel {
  user () {
    return this.hasOne('App/Models/User', 'user_id', 'id')
  }
}
```

When you execute your application, you will have the following routes;

![Related routes](/images/05-related-routes.jpg)

As you can see there are related resource URL structure has been created by best practices. Also, all routes will be handled by the same controller file, **MainController**. This is the power of **AdonisX**.

> You might think *"What is **IdFilter**?"*. **IdFilter** is a foreign key checker. When you create a model relation between two models, **AdonisX** automatically checks foreign key in HTTP requests. That's why IdFilter has been added to all routes. If there is any relationship in the HTTP request, IdFilter validates the foreign key is exists.

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

Usually, we have some business logic in our code. For example, you don't want to **allow** all users to delete a user record. Maybe you will need some **form validations** in **saving**. We can have many different scenarios in **real-world**.

**AdonisX** provides you two different solution; **model definitions** and **extensions**. You can see all details of these two solutions in the next chapters. But still, we want to simplify *"What is the model definition?"* in here.

**Model definition** is a way to decide how **AdonisX** should work with any model. It works with convention over configuration. Let's assume you create a model like this;

```js
const XModel = use('AdonisX/Models/XModel')

class User extends XModel {

}
```

This is the simplest model definition. But extending from **XModel** gives some properties to this Model. And you can override all of the configurations as you wish. For example, if you want to add some form validation, you can override the form validation method in your model;

```js
const XModel = use('AdonisX/Models/XModel')

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

Extensions are another way to implement your **custom business logic** to your API. For example, if you want to send an e-mail to a user after the registration process, you can create an [Event](/05-extensions/#example) for after record creation on the `users` table. When you handle the event in your **listener**, you can implement your custom business logic easily.

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