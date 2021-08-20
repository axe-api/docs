# Introduction

## What Is This?

**Axe API** is the _fastest_ way to create **Rest API** by defining only database models and relationships between them. It is built on [Knex.js](http://knexjs.org), and it's an awesome active records pattern. On the other hand, you have another familiar thing, [Express](https://expressjs.com/).

You are going to be able to develop an API **10 times faster!**

::: danger
This project is **not ready** to use in production by now. This is an experiment for us to discover new areas. We plan to publish the stable version by the end of 2021.
:::

## How It Works?

[Express](https://expressjs.com/) and [Knex.js](http://knexjs.org) are great tools to create [Node.js](https://nodejs.org) based applications. But usually, we code too much the same things to design an API. We aim to reduce code duplication and give you speed by using Axe API.

Axe API provides you the ability to separate your common tasks to build an API from your business logic. **Axe API** expects model definitions to analyze your routing structure. After you created your models and their relations between them, Axe API can handle all _well-known_ API requests. Creating an API with 5 tables takes almost 15 minutes.

Shortly, **Axe API** performs two basic functions;

- **Analyzes** your models and their relationships to create routes
- **Handles** all HTTP requests

Let's assume that you have a model like this;

```js
import { Model } from "axe-api";

class User extends XModel {}
```

With this model, you will have all of the basic API routes for **User** resources. **Axe API** will create **CRUD** routes for you in the _initialization_ process and these routes would be completely ready to be handled and processed by Axe API. The following routes will be handled automatically;

- `POST api/users`
- `GET api/users`
- `GET api/users/:id`
- `PUT api/users/:id`
- `DELETE api/users/:id`

This is the magic of **Axe API**!
