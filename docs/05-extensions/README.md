# Extensions

## Why?

In the real world, everybody needs more than saving and listing records. Everybody needs more complicated logic in their code. **AdonisX** provides you a basic structure of an API. It provides you basic CRUD actions with where dynamic query options. But when you need custom logic, you will not be alone. **AdonisX** provides you some points to extend your HTTP requests and manipulate them. 

There are two different ways to add your business logic; **Triggers** and **Events**.

You may use **Triggers** and **Events** to add your business logic. To use them, you should use `triggers.js` or `events.js` under **start** folder. **Events** are AdonisJS' features and you can read its documentation in [here](https://adonisjs.com/docs/4.1/events). But also, we added **Triggers** to our structure to have more control over database actions such as GET, POST, UPDATE and DELETE.

## Differences

The main difference between **triggers** and **events** is; events are **asynchronous**. It means that if you are using a trigger and handle the action, the HTTP request cycle waits for you to do your task. But in events, when you handle the action, the HTTP requests cycle keeps working and returns a response. So, if you want to send an e-mail to the user, you should use **events**. On the other hand, if you want to be involved in the query or any business logics in the HTTP request cycle, you should use **triggers**.

## Example

Trigger and event definitions are almost the same.

```js
const Trigger = use('Trigger')
const Event = use('Event')

Trigger.on('onBeforeCreateUser', 'UserListener.checkEmailExists')
Event.on('onAfterCreateUser', 'UserListener.sendEmail')
```

To define a trigger for a model, you should use this structure. In this structure, there are two arguments which you can use;

- `when`: When your method will be triggered.
- `method`: Which method will be triggered.

In this example, methods will be triggers in **UserListener** file for before creating a new record on the `User` model.

This is how `UserListener.js` looks under the `app` folder;

```js
class UserListener {
  async checkEmailExists ({ request, params, data }) {
    // Implement you business logic in here.
  }

  sendEmail ({ request, params, data }) {
    // Implement you business logic in here...
  }
}

module.exports = UserTrigger
```

## Extentable Actions

You can handle almost every action on models. Please look at the following tables;

| ActionName{Model}      | Variables                    |
|------------------------|------------------------------|
| onBeforeCreate{User}   | request, params, data        |
| onBeforeUpdate{User}   | request, params, item        |
| onBeforeDelete{User}   | request, params, query       |
| onBeforePaginate{User} | request, params, query       |
| onBeforeShow{User}     | request, params, query       |
| onAfterCreate{User}    | request, params, data, item  |
| onAfterUpdate{User}    | request, params, item        |
| onAfterDelete{User}    | request, params, item        |
| onAfterPaginate{User}  | request, params, result      |
| onAfterShow{User}      | request, params, item        |

There are some variables which you can use in a trigger or event function;

- [request](https://adonisjs.com/docs/4.1/request) Request object of [AdonisJs](https://adonisjs.com)
- **params**: Query parameters in url. (`api/users/:userId/posts/:id`, `userId` and `id`)
- **data**: The data has been sent by user to create or update.
- **item**: The record which is active.
- **query**: The [AdonisJs](https://adonisjs.com)' [query](https://adonisjs.com/docs/4.1/lucid#_query_builder) object before executing query.