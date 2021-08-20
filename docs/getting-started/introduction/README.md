# Introduction

## Disclaimer

This project is **not ready** to use in production by now. This is an experiment for us to discover new areas.

## What Is This?

**Axe API** is the _fastest_ way to create **Rest API** by defining only database models and relationships between them. It is built on [Knex.js](http://knexjs.org), and it's an awesome active records pattern. On the other hand, you have another familiar thing, [Express](https://expressjs.com/). Axe API completely built on **Express** and **Knex.js**, and it is the fastest way to build APIs without code duplications.

You are going to be able to develop an API **10 times faster!**

## How It Works?

[Express](https://expressjs.com/) and [Knex.js](http://knexjs.org) are great tools to create [Node.js](https://nodejs.org) based applications. But usually, we code too much the same things to design an API. We aim to reduce code duplication and give you speed by using Axe API.

**Axe API**, basically expect from you some models to analyze the database structure. After you created your models and their relations between them, it analyzes their structure and handles all well-known API requests. Creating an API with 5 tables takes almost 15 minutes.

**Axe API** performs two basic functions;

- **Analyzes** your models and their relationships to create routes (_Initialization_)
- **Handles** all HTTP requests with a shared Controller (_Processing_)

Let's assume that you have a model like this;

```js
import { Model } from "axe-api";

class User extends XModel {}
```

With this model, you will have all of the basic API routes for **users** resource. **Axe API** will create **CRUD** routes for you in the _initialization_ and routes will be completely ready to be handled and processed by the shared controller. Imagine the following routes will be handled automatically;

- `POST api/users`
- `GET api/users`
- `GET api/users/:id`
- `PUT api/users/:id`
- `DELETE api/users/:id`

All these requests will be handled by **Axe API**. An internal controller which is controlled by **Axe API**, _handles_ all requests for all of your models. This is true magic!
