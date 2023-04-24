# Understanding the routing

<p class="description">
Routing is a very important topic that shaped on best-practices in the Rest API world. In this chapter, we are going to talk about route management at Axe API. 
</p>

<ul class="intro">
  <li>You will learn</li>
  <li>What is routing?</li>
  <li>How Axe API creates routes?</li>
  <li>How to manage related routes?</li>
  <li>How to enable/disable route for a specific handler?</li>
  <li>How to create custom route?</li>
</ul>

## Routing in Express.js

Routing refers to determining how an application responds to a client request to a particular endpoint. You can see a simple [Express.js](https://expressjs.com/en/guide/routing.html) routing example in the following code block;

```js
app.get("/api/v1/users", (req, res) => {
  res.json({
    id: 1,
    // ...
  });
});
```

In the example above, a simple HTTP route is defined for the GET method. If the client sends the cURL request to the Express server, it gets the following response.

::: code-group

```bash [Request]
$ curl \
  -H "Content-Type: application/json" \
  -X GET http://localhost:3000/api/v1/users
```

```json [Response]
{
  "id": 1
  // ...
}
```

:::

In most web frameworks, developers must define all routes manually. But there are many articles on how to create a good route for a **Rest API**. If you show a _database schema_ to a developer, most of the time they can figure out more or less how routing should be.

That's why Axe API has an **auto-route creation** mechanism. Axe API core _reads_ your models, and analyzes their _relationships_, then _creates_ routes and _handles_ HTTP requests.

## Model-based routes

Let's start with fundamentals, and create a simple Axe API model;

::: code-group

```ts [User.ts]
import { Model } from "axe-api";

class Users extends Model {}

export default User;
```

:::

Axe API practices the following task when you run the application;

- Analyzes `User` model
- Creates all possible routes
- Listens all created routes

For the example model, the application is ready to handle the following routes;

| HTTP Method | Route              |
| ----------- | ------------------ |
| GET         | `api/v1/users`     |
| GET         | `api/v1/users/:id` |
| POST        | `api/v1/users`     |
| PUT         | `api/v1/users/:id` |
| DELETE      | `api/v1/users/:id` |

Developers don't have to create routes manually unlike other web frameworks, the only required thing is creating model files.

## Model relations

Let's assume that we have some tables that are related to each other, like the following example;

![Database Schema](./routes-01.png)
