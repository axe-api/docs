# Models

**Model** structure is the heart of the **Axe API**. There are many _configurations_ which you can use to organize your API. By adding and changing some configurations, you can decide how the system should work.

You **should** extend your model from **Model** in your project. With `Model` you will have many pre-defined options for your API structure. You can see all configurable options about **Model** structure in this section.

## Basic Structure

To make a model with Axe API Model, just you need to extend it from `Model` class.

```js
import { Model } from "axe-api";

class User extends Model {}

export default User;
```

## Table Name

By default, you don't have to put any table name definition. But again, you may set your table name with `table` getter. If you don't set a `table` getter, we will use the Model name as the table name. But there are only one difference; the table name will be converted to plural if your model name is singular.

```js
import { Model } from "axe-api";

class User extends Model {
  get table() {
    return "users";
  }
}

export default User;
```

We strongly suggest that to use singular model names in general.

## Fillable Fields

By default, we don't allow the user to send any data to create or update a record, because of security issues. If you want to allow what kind of data can be filled, you should use `fillable` getter in your model.

```js
import { Model } from "axe-api";

class Users extends Model {
  static get fillable() {
    return ["email", "name", "surname", "age"];
  }
}

export default User;
```

In this example, **email**, **name**, **surname** and **age** columns can be editable by users in **CREATE** and **UPDATE** handlers. If you have a field like **my_secret** and you don't want to make it fillable by users, you **shouldn't** add it to this array. Then it will be safe and only editable by yourself.

On the other hand, you can decide different fillable column list by the HTTP method type. For example, usually, we don't want to change the email in the profile update request because it takes too many actions such as sending a confirmation email.

```js
import { Model } from "axe-api";

class Users extends Model {
  static get fillable() {
    return {
      POST: ["email", "name", "surname", "age"],
      PUT: ["name", "surname", "age"],
    };
  }
}

export default User;
```

Like the code above, changing **email** has more complex logic because of security. So you may not want to make it editable in update actions.

## Validations

Everybody needs to form validation in their API. Axe API uses [validatorjs](https://www.npmjs.com/package/validatorjs) internally.

The thing you should do to define validations is adding a validation method to your model. The validation method should return an object which describes how form validation should be.

```js
import { Model } from "axe-api";

class Users extends Model {
  static get validations() {
    return {
      email: "required|email",
      name: "required|max:50",
      surname: "required|max:50",
      age: "max:100",
    };
  }
}

export default User;
```

This form validation method will be triggered before **CREATE** and **UPDATE** handlers.

On the other hand, if you want to use different validation rules in **creating** and **updating** a model record, you can use following structure;

```js
import { Model } from "axe-api";

class Users extends Model {
  static get validations() {
    return {
      POST: {
        email: "required|email",
        name: "required|max:50",
      },
      PUT: {
        name: "required|max:50",
      },
    };
  }
}

export default User;
```

If the form data doesn't provide validation rules, Axe API will respond as a validation error like this;

```json
{
  "errors": {
    "email": ["The email field is required."],
    "name": ["The name field is required."]
  }
}
```

> HTTP status code will be 400 (Bad Request).

## Handlers

In model definition, we can decide what kind of routes should be created for the model. To control that, we should use `handlers` getter.

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

## Middlewares

Sometimes, you may want to protect your models by requests. In those cases, you can use model-based middleware. We are expecting you to define basically an [Express Middleware](https://expressjs.com/en/guide/writing-middleware.html). To do add a middleware to a model handlers, you should use `middlewares` getter like the following code;

```js
import { Model, HANDLERS } from "axe-api";

class User extends Model {
  get middlewares() {
    return [
      (req, res, next) => {
        // Check anything you want here.
        next();
      },
    ];
  }
}

export default User;
```

As you can see, you should return an array. It has been designed like that because it helps us to add multiple middlewares at the same time. With the code above, your middleware list will be executed in orderly for all allowed handlers.

Of course, you can use multiple middleware functions from other files;

```js
import { Model } from "axe-api";
import { isAdmin, isLogged } from "./../Middlewares/index.js";

class User extends Model {
  get middlewares() {
    return [isLogged, isAdmin];
  }
}

export default User;
```

But that is not enough for us. We aimed to create a very flexible structure for you. That's why, we added a feature that you can add a special middleware function for a special handler.

```js
import { Model, HANDLERS } from "axe-api";
import { isAdmin, isLogged } from "./../Middlewares/index.js";

class User extends Model {
  get middlewares() {
    return [
      isLogged,
      {
        handler: HANDLERS.DELETE,
        middleware: isAdmin,
      },
    ];
  }
}

export default User;
```

In this example, this second middleware will be executed only for **DELETE** handler. This is a great way to create a very flexible architecture. Also, it helps us to separate common API logic (CRUD) from business logic.

Lastly, we can add general middlewares (for all models) but it is not a topic that is related to models. You may look at them in [Middlewares]() documentation.

## Hidden Fields

You may want to hide some columns in your API results when you have some sensitive information such as password hash. In this case, you should use the following getters to define which columns will be hide;

```js
import { Model } from "axe-api";

class User extends Model {
  get hiddens() {
    return ["password", "password_hash"];
  }
}

export default User;
```

This definition will be used for all recursive queries too.

## Serialization

You can use a serialize function in your model definition to hide some values or to create some computed results.

```js
import { Model } from "axe-api";

class User extends Model {
  serialize(item) {
    return {
      ...item,
      fullname: `${item.name} ${item.surname}`,
    };
  }
}

export default User;
```

The serialization function will be triggered automatically by all handlers. Also, recursive queries are supported. In this method, you can manipulate all results by your model.

```json
{
  "id": 1,
  "name": "Karl",
  "surname": "Popper",
  "fullname": "Karl Popper"
}
```

## Timestamps

Axe API supports timestamps as default. While you are creating a new database table in your migrations, you can add timestamps with the [Knex.js helpers](http://knexjs.org/#Schema-timestamps). After that, you don't have to do anything. Axe API will manage your timestamps automatically.

You can look at the simple timestamp example for a migration file;

```js
export const up = function(knex) {
  return knex.schema.createTable("users", function(table) {
    table.increments();
    table.string("email").unique();
    table.timestamps();
  });
};
```

Axe API use `created_at` and `updated_at` columns as default column name. But you can change it and use your naming structure. To do that, you should add the following getters in your model;

```js
import { Model } from "axe-api";

class User extends Model {
  get createdAtColumn() {
    return "my_created_at";
  }

  get updatedAtColumn() {
    return "my_updated_at";
  }
}

export default User;
```

If you don't want to use timestamps in a model, you have to return NULL in your timestamp naming getters.

```js
import { Model } from "axe-api";

class User extends Model {
  get createdAtColumn() {
    return null;
  }

  get updatedAtColumn() {
    return null;
  }
}

export default User;
```
