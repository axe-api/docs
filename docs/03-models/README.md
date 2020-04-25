# Models

**Model** structure is heart of the **AdonisX**. There are many *configurations* which you can use to organize your API. By adding and changing some configurations, you can decide how system should work.

You **should** extend your model from **XModel** in our system instead of AdonisJs models. With XModel you will have many pre-defined options for your API structure. You can see all configurable options about **XModel** structure in this section.

## Basic Structure

Model definitions should be *almost* like [Lucid Model](https://adonisjs.com/docs/4.1/lucid). You can use all features of Lucid Models. But to get more, you should extend your model from `AdonisX/Models/XModel`;

```js
const XModel = use('AdonisX/Models/XModel')

class Users extends XModel {
  static get table () {
    return 'users'
  }
}

module.exports = Users
```

## Fillable Fields

In order to allow create and update methods, you should define which columns should be editable by users. 

```js
const XModel = use('AdonisX/Models/XModel')

class Users extends XModel {
  static get table () {
    return 'users'
  }

  static get fillable () {
    return ['email', 'name', 'surname', 'age']
  }
}

module.exports = Users
```

In this example, **email**, **name**, **surname** and **age** columns can be editable by users in **create** and **update** methods. If you have a field like **my_secret** and you don't want to make it fillable by users, you **shouldn't** add it to this array. Then it will be safe and only editable by yourself.

In next chapters we will show you how to add your custom business logics for that kind of stuffs.

## Form Validations

Everybody needs form validation in their API. AdonisX uses [Indicative](https://indicative-v5.adonisjs.com/) like [AdonisJs](https://adonisjs.com/docs/4.1/validator). The thing you should do to define validations is adding a validation method to your model;

```js
const XModel = use('AdonisX/Models/XModel')

class Users extends XModel {
  static get table () {
    return 'users'
  }

  static get validations () {
    return {
      email: 'required|email',
      name: 'required|max:50',
      surname: 'required|max:50',
      age: 'max:100'
    }
  }
}
module.exports = Users
```

This form validation method will be triggerred before **create** and **update** actions. On the other hand, in **update action**, if the user doesn't send all of fields but sends only a required field, it passes. Because the key point is **validating** whole row in actions.

## Allowed Methods

Sometimes, you will need to deny some HTTP request for some models. In order to define it, you can add following method to your model. 

```js
const XModel = use('AdonisX/Models/XModel')

class Users extends XModel {
  static get table () {
    return 'users'
  }

  static get actions () {
    return ['GET', 'POST', 'PUT', 'DELETE']
  }
}
module.exports = Users
```

As defaults, if you don't add this `actions()` getter to your model, all methods will be open to use.

## Custom Middlewares

You may use following statements in model structure to add your logics to some routes for some models;

```js
const XModel = use('AdonisX/Models/XModel')

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
module.exports = Users
```

In here, you can add multiple different **Middleware** layer for a model. But also you can specify it for only some methods.

With this, you can add an [AdonisJs Middleware](https://adonisjs.com/docs/4.1/middleware) for your model routes.

## Recursive Resources

Creating a recursive model is very simple with AdonisX. Just add following relationship structure and it is done! You can use a recursive resource with this way.

```js
const XModel = use('AdonisX/Models/XModel')

class Category extends XModel {
  static get table () {
    return 'categories'
  }

  static get fillable () {
    return ['title']
  }

  categories () {
    return this.hasMany('App/Models/Category')
  }

  category () {
    return this.hasOne('App/Models/Category')
  }
}

module.exports = Category
```

When you define a recursive resource like this, you will have following routes to access the resource;

| Method  | Route                                     |
|---------|-------------------------------------------|
| GET     | `api/categories`                          |
| GET     | `api/categories/:id`                      |
| POST    | `api/categories `                         |
| PUT     | `api/categories/:id `                     |
| DELETE  | `api/categories/:id `                     |
| GET     | `api/categories/:categoryId/children `    |
| GET     | `api/categories/:categoryId/children/:id `|
| POST    | `api/categories/:categoryId/children `    |
| PUT     | `api/categories/:categoryId/children/:id `|
| DELETE  | `api/categories/:categoryId/children/:id `|
