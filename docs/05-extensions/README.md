# Extensions

## Why?

In the real world, everybody needs more than saving and listing records. Everybody needs more complicated logic in their code. **AdonisX** provides you a basic structure of an API. It provides you basic CRUD actions with where dynamic query options. But when you need custom logic, you will not be alone. **AdonisX** provides you some points to extend your HTTP requests and manipulate them. 

There are two different ways to add your business logic;

- **Events**
- **Actions**

You may use **Events** and **Actions** to add your business logic.

## Events

**Events** are AdonisJS' features and you can read its documentation in [here](https://adonisjs.com/docs/4.1/events). It is very simple to use. First, you define an event to listen;

```js
// start/event.js

Event.on('new::user', 'User.registered')
```

Then you create a file which is called `User.js` under the `app/Listeners` directory like this;

```js
// app/Listeners/User.js

const User = exports = module.exports = {}

User.register = async (params) => {
  // Your business logic.
}
```

After these definitions, whenever you fire the event, your `register` method will be triggered.

```js
Event.fire('new::user')
```

AdonisX uses this structure. It fires constant events when an event has appeared. For example, if you want to handle the user's request before pagination, you should define an event like this;

```js
Event.on('onBeforePaginateUser', 'User.onBeforePaginate')
```

AdonisX automatically fires `onBeforePaginate` event before the pagination in `MainController`. You can use the following list to understand which events will be triggered by AdonisX;

| EventName{Model}          | Variables                    |
|---------------------------|------------------------------|
| onBeforeCreate{User}      | request, params, data        |
| onBeforeUpdate{User}      | request, params, item        |
| onBeforeDelete{User}      | request, params, query       |
| onBeforePaginate{User}    | request, params, query       |
| onBeforeShow{User}        | request, params, query       |
| onAfterCreate{User}       | request, params, data, item  |
| onAfterUpdate{User}       | request, params, item        |
| onAfterDelete{User}       | request, params, item        |
| onAfterPaginate{User}     | request, params, result      |
| onAfterShow{User}         | request, params, item        |

## Actions

The main difference between **Actions** and **Events** is; events are **asynchronous**. It means that if you are using an **action** and handle the request, the HTTP request cycle waits for you to do your task. But in events, when you handle the event, the HTTP requests cycle keeps working and returns a response. So, if you want to send an e-mail to the user, you should use **Events**. On the other hand, if you want to be involved in the query or any business logic in the HTTP request cycle, you should use **Actions**.

Using **Actions** is very easy. The only thing you do, you should create an Action file for your model under the directory `app/Actions`.

```js
// app/Actions/UserActions.js

module.exports = {
  async onBeforePaginate ({ request, params, query }) {
    // Implement your business logic in here.
  }
}
```

If you create an action file like this, every time before pagination of **User.js** model, this method will be triggered. The only thing you should care about is using the same naming structure for model and action file;

| Model       | Actions            |
|-------------|--------------------|
| User.js     | UserActions.js     |
| Users.js    | UsersActions.js    |
| UserPost.js | UserPostActions.js |

> Actions are loaded in the **initialization** process at ***once**. So your action methods should be [stateless](https://en.wikipedia.org/wiki/State_(computer_science)#Program_state).

You can handle every action on models. Please look at the following tables;

| ActionName          | Variables                    |
|---------------------|------------------------------|
| onBeforeCreate      | request, params, data        |
| onBeforeUpdateQuery | request, params, query       |
| onBeforeUpdate      | request, params, item        |
| onBeforeDelete      | request, params, query       |
| onBeforePaginate    | request, params, query       |
| onBeforeShow        | request, params, query       |
| onAfterCreate       | request, params, data, item  |
| onAfterUpdateQuery  | request, params, item        |
| onAfterUpdate       | request, params, item        |
| onAfterDelete       | request, params, item        |
| onAfterPaginate     | request, params, result      |
| onAfterShow         | request, params, item        |

## Variables

There are some variables which you can use in a trigger or event function;

- [request](https://adonisjs.com/docs/4.1/request) Request object of [AdonisJs](https://adonisjs.com)
- **params**: Query parameters in url. (`api/users/:userId/posts/:id`, `userId` and `id`)
- **data**: The data has been sent by user to create or update.
- **item**: The record which is active.
- **query**: The [AdonisJs](https://adonisjs.com)' [query](https://adonisjs.com/docs/4.1/lucid#_query_builder) object before executing query.