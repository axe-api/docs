# Extensions

## Why?

In real world, everybody needs more than saving and listing records. Everybody needs more complicated logic in their code. **AdonisX** provides you a basic structure of an API. It provides you basic CRUD actions with where dynamic query options. But when you need custom logics, you will not be alone. **AdonisX** provides your some points to extend your HTTP requests and manipulate them. 

There are two different ways to add your business logic; **Triggers** and **Events**.

You may use **Triggers** and **Events** in order to add your business logic. To use them, you should use `triggers.js` or `events.js` under **start** folder. **Events** are actually AdonisJS' features and you can read its documentation in [here](https://adonisjs.com/docs/4.1/events). But also, we added **Triggers** to our structure to have more control over database actions such as GET, POST, UPDATE and DELETE.

## Differences

The main difference between **triggers** and **events** is; events are **asynchronous**. It means that if you are using trigger and handle an the action, HTTP request cycle waits for you to done your task. But in events, when you handle an action, HTTP requests cycle keeps working and return a responses. So that, if you want to send an e-mail to the user, you should use **events**. On the other hand, if you want to be involved to the query or any business logics in HTTP request cycle, you should use **triggers**.

## Example

Trigger and event definitions are almost same.

```js
const Trigger = use('Trigger')
const Event = use('Event')

Trigger.on('onBeforeCreateUser', 'UserListener.checkEmailExists')
Event.on('onAfterCreateUser', 'UserListener.sendEmail')
```

To define a trigger for a model, you should use this structure. In this structure, there are two argument which you can use;

- `when`: When your method will be triggerred.
- `method`: Which method will be triggered.

In this example, methods will be triggers in **UserListener** file for before create a new record on `User` model.

This is how `UserListener.js` looks under `app` folder;

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

You can handle almost every actions on models. Please look at following tables;

| ActionName{Model}      | Variables                    |
|------------------------|------------------------------|
| onBeforeCreate{User}   | request, params, data        |
| onBeforeUpdate{User}   | request, params, item        |
| onBeforeDelete{User}   | request, params, query       |
| onBeforePaginate{User} | query                        |
| onBeforeShow{User}     | query                        |
| onAfterCreate{User}    | request, params, data, item  |
| onAfterUpdate{User}    | request, params, item        |
| onAfterDelete{User}    | item                         |
| onAfterPaginate{User}  | result                       |
| onAfterShow{User}      | item                         |