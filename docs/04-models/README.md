# Models

**Model** structure is the heart of the **Axe API**. There are many _configurations_ which you can use to organize your API. By adding and changing some configurations, you can decide how the system should work.

You **should** extend your model from **XModel** in our system instead of AdonisJs models. With XModel you will have many pre-defined options for your API structure. You can see all configurable options about **XModel** structure in this section.

## Basic Structure

Model definitions should be _almost_ like [Lucid Model](https://adonisjs.com/docs/4.1/lucid). You can use all features of Lucid Models. But to get more, you should extend your model from `Axe API/Models/XModel`;

```js
const XModel = use("Axe API/Models/XModel");

class Users extends XModel {
  static get table() {
    return "users";
  }
}
```

> `table` getter is not required. Please check [AdonisJs Documentation](https://adonisjs.com/docs/4.1/lucid#_table).

## Fillable Fields

To allow create and update methods, you should define which columns should be editable by users.

```js
const XModel = use("Axe API/Models/XModel");

class Users extends XModel {
  static get fillable() {
    return ["email", "name", "surname", "age"];
  }
}
```

In this example, **email**, **name**, **surname** and **age** columns can be editable by users in **create** and **update** methods. If you have a field like **my_secret** and you don't want to make it fillable by users, you **shouldn't** add it to this array. Then it will be safe and only editable by yourself.

In the next chapters, we will show you how to add your custom business logic for that kind of stuff.

On the other hand, if you want to make some fields should be editable in first creating but not changeable after that, you can use the following structure;

```js
const XModel = use("Axe API/Models/XModel");

class Users extends XModel {
  static get fillable() {
    return {
      POST: ["email", "name", "surname", "age"],
      PUT: ["name", "surname", "age"],
    };
  }
}
```

Like the code above, changing **email** has more complex logic because of security. So you may not want to make it editable in update actions.

## Form Validations

Everybody needs to form validation in their API. Axe API uses [Indicative](https://indicative-v5.adonisjs.com/) like [AdonisJs](https://adonisjs.com/docs/4.1/validator).

The thing you should do to define validations is adding a validation method to your model. The validation method should return an object which describes how form validation should be.

```js
const XModel = use("Axe API/Models/XModel");

class Users extends XModel {
  static get validations() {
    return {
      email: "required|email",
      name: "required|max:50",
      surname: "required|max:50",
      age: "max:100",
    };
  }
}
```

This form validation method will be triggered before **create** and **update** actions. On the other hand, in **update action**, if the user doesn't send all of the fields but sends only a required field, it passes. Because the key point is **validating** whole row in actions.

On the other hand, if you want to use different validation rules in **creating** and **updating** a model record, you can use following structure;

```js
const XModel = use("Axe API/Models/XModel");

class Users extends XModel {
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
```
