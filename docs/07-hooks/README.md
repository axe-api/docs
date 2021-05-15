# Hooks & Events

## Why?

In the real world, everybody needs more than saving and listing records. Everybody needs more complicated logic in their code. **Axe API** provides you a basic structure of an API. It provides you basic CRUD actions with dynamic query options. But when you need custom logic, you will not be alone. **Axe API** provides you _escape points_ to extend your HTTP requests and manipulate them.

There are two different ways to add your business logic; **Hooks** and **Events**. They are almost the same except one differences. We are going to explain it later. But first, we should understand what the **hook** is.

## Hooks

Axe API automatically handles your API. It creates routes, handles HTTP requests, performs the request, and creates a response. But it doesn't just do these. It also has some escape points. With those, you can add your code to the HTTP Request-Response cycle.

For example, let's assume that you want to hash the user's password in user creation. How can we do this? First, we should create a file that is called `UserHooks.js` under `app/Hooks`.

`UserHooks.js`

```js
import bcrypt from "bcrypt";

const onBeforeInsert = async ({ formData }) => {
  // Genering salt
  formData.salt = bcrypt.genSaltSync(10);
  // Hashing the password
  formData.password = bcrypt.hashSync(formData.password, salt);
};

export { onBeforeInsert };
```

In the code above, we used [bcrypt](https://www.npmjs.com/package/bcrypt) library to hash the user's password. By accessing form data, hashing the user's password is easy.

**But can this function be executed? Yes!** In the initialization process, Axe API tries to discover what kind of hooks and events have been written. For a model called `User`, if you create a hook which is called `UserHook`, Axe API accepts that `UserHooks` is the hook definition file for the model `User`. In the HTTP request processing time, if there is any hook that has been written, Axe API calls that hook.

This feature gives us very important flexibility. First of all, you can add any logic by the parameters which Axe API passed. Secondly, the hook functions are almost isolated. It means that writing unit tests about them is very easy.

This structure is almost the same for Events, too.

## Events

The main difference between **Hooks** and **Events** is; events are **asynchronous**. It means that if you are using an **hooks** and handle the request, the HTTP request cycle waits for you to do your task. But in events, when you handle the event, the HTTP requests cycle keeps working and returns a response. So, if you want to send an e-mail to the user, you should use **Events**. On the other hand, if you want to be involved in the query or any business logic in the HTTP request cycle, you should use **Hooks**.

Using **Events** is very easy, almost same with the hooks. There is only one different thing in usage. Which is creating the event file under the `app/Events` folders.

`app/Events/UserEvents.js`

```js
const onAfterInsert = async ({ formData }) => {
  // You can send an email to the user in here...
};

export { onAfterInsert };
```

## Request Lifecycle

To write hook or event functions, you should understand the Axe API HTTP Request's lifecycles. Before doing that, we are going to define basic facts.

### Definitions

- Handlers are types of model processing. There are five basic handlers in Axe API
  - INSERT
  - PAGINATE
  - SHOW
  - UPDATE
  - DELETE
- Two different **actions** can be done on the data, in a handler;
  - Manipulating
  - Fetching
- Some of handlers do only one **action**, but some of them do both.
  - Insert: Manipulating
  - Update: Fetching, Manipulating
  - Delete: Fetching, Manipulating
  - Show: Fetching
  - Paginate: Fetching

We can show which handler do what actions in a table;

| Handler  | Manipulating | Fetching |
| -------- | ------------ | -------- |
| INSERT   | ✓            |          |
| PAGINATE |              | ✓        |
| SHOW     |              | ✓        |
| UPDATE   | ✓            | ✓        |
| DELETE   | ✓            | ✓        |

These values are important because we are using that definitions in _Request Lifecycle_.

### Request Lifecycle

In Axe API, we use **Before** and **After** hooks/events to give more flexibility. Also, Axe API calls hooks first. After hooks, it calls events if there any. With this information, we can describe general schema of _Request Lifecycle_;

- Axe API start to process HTTP Request
- Call model-based middlewares
- Call the handler (INSERT, UPDATE, etc.)
- Call **Before Fetching** hooks
- Call **Before Fetching** events
- Execute **Fetching** action.
- Call **After Fetching** hooks
- Call **After Fetching** events
- Call **Before Manipulating** hooks
- Call **Before Manipulating** events
- Execute **Manipulating** action.
- Call **After Manipulating** hooks
- Call **After Manipulating** events
- Send the response.

This is the basic standard of our calling Hooks/Events system. By the type of handler, you can add many different hooks/events.

### Full Hooks/Events Table

The following table describes all possible hooks by handler types.

| Handler  | Manipulating                     | Fetching                                   |
| -------- | -------------------------------- | ------------------------------------------ |
| INSERT   | `onBeforeInsert`/`onAfterInsert` |                                            |
| PAGINATE |                                  | `onBeforePaginate`/`onAfterPaginate`       |
| SHOW     |                                  | `onBeforeShow`/`onAfterShow`               |
| UPDATE   | `onBeforeUpdate`/`onAfterUpdate` | `onBeforeUpdateQuery`/`onAfterUpdateQuery` |
| DELETE   | `onBeforeDelete`/`onAfterDelete` | `onBeforeDeleteQuery`/`onAfterUpdateQuery` |

## Parameters

There are some parameters which you can use in a hook or event function.

### Common Parameters

- `request`: Request object of [Expresss](https://expressjs.com/en/4x/api.html#req)
- `response`: Response object of [Expresss](https://expressjs.com/en/4x/api.html#res)
- `model`: Current model instance. For example; `User.js`.
- `database`: Database connection instance. For example [Knex.js](http://knexjs.org/#Installation-client)
- `relation`: The relation definition if the route is a related route (For example `api/users/:userId/posts`).
- `parentModel`: The parent model instance if the route is a related route (For example `api/users/:userId/posts`).

## Special Parameters

- `query`: The Knex.js' [query instance](http://knexjs.org/#Builder-wheres).
- `conditions`: The conditions which has been send by the HTTP client to filter data.
- `item`: The current record. (For example; the item that will be updated.)
- `result`: The query result. (For example SHOW and PAGINATE handlers.)
- `formData`: The data has been sent by HTTP client to create or update row.

We can show all special parameters in the following table;

| Hook/Events Name    | Parameters                 |
| ------------------- | -------------------------- |
| onBeforeInsert      | formData                   |
| onBeforeUpdateQuery | query                      |
| onBeforeUpdate      | item, formData, query,     |
| onBeforeDelete      | query                      |
| onBeforePaginate    | conditions, query          |
| onBeforeShow        | conditions, query          |
| onAfterInsert       | formData, item             |
| onAfterUpdateQuery  | item, query                |
| onAfterUpdate       | item, formData, query      |
| onAfterDelete       | item                       |
| onAfterPaginate     | results, conditions, query |
| onAfterShow         | item, conditions, query    |
