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
- `PUT api/users/:id`
- `DELETE api/users/:id`

All these requests will be handled by **Axe API**. An internal controller which is controlled by **Axe API**, _handles_ all requests for all of your models. This is true magic!

## Roadmap

There are several things we already have done and there are many things we want to implement in the future. If you have any opinion about it, please don't hesitate to open an issue for your brilliant ideas on our [issue page](https://github.com/axe-api/axe-api/issues).

You can see what we've done before and what we will work on in the future;

- [x] Easy installation
- [x] Basic API structure
- [x] Extenting an action before or update.
- [x] **Form Validation** support
- [x] **Custom Middlewares** support
- [x] Strong query features
- [x] **Model relation** support on routes.
- [x] **Recursive Resource** support
- [ ] **Processing Time** on HTTP responses
- [ ] **Rate Limit** support
- [ ] **Caching Support** on HTTP requests
- [ ] System variables in queries (_\$now_, _\$currentDate_, _\$tomorrow_)
- [ ] **Transaction** support
- [ ] Auto generated **API Documentation**
- [ ] Easy API **testing**
- [ ] **Cookbook** section on documentation

Also, you can see more about feature requests in the [issue list](https://github.com/axe-api/axe-api/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement).

## Contribution Guide

### What do I need to know to help?

If you are looking to help with a code contribution our project uses NodeJs. If you don't feel ready to make a code contribution yet, no problem! You can also check out the [any issues](https://github.com/axe-api/axe-api/issues) that we have.

### How do I make a contribution?

Never made an open-source contribution before? Wondering how contributions work in our project? Here's a quick rundown!

- Find an issue that you are interested in addressing or a feature that you would like to add.
- Fork the repository associated with the issue to your local GitHub organization. This means that you will have a copy of the repository under your-GitHub-username/repository-name.
- Clone the repository to your local machine using git clone https://github.com/github-username/repository-name.git.
- Create a new branch for your fix using git checkout -b branch-name-here.
- Make the appropriate changes for the issue you are trying to address or the feature that you want to add.
- Use git add insert-paths-of-changed-files-here to add the file contents of the changed files to the "snapshot" git uses to manage the state of the project, also known as the index.
- Use git commit -m "Insert a short message of the changes made here" to store the contents of the index with a descriptive message.
- Push the changes to the remote repository using git push origin branch-name-here.
- Submit a pull request to the upstream repository.
- Title the pull request with a short description of the changes made and the issue or bug number associated with your change. For example, you can title an issue like so "Fixed #4352".
- In the description of the pull request, explain the changes that you made, any issues you think exist with the pull request you made, and any questions you have for the maintainer. It's OK if your pull request is not perfect (no pull request is), the reviewer will be able to help you fix any problems and improve it!
- Wait for the pull request to be reviewed by a maintainer.
- Make changes to the pull request if the reviewing maintainer recommends them.
- Celebrate your success after your pull request is merged!

### Where can I go for help?

If you need help, you can ask questions on our [issue list](https://github.com/axe-api/axe-api/issues).

### What does the Code of Conduct mean for me?

Our Code of Conduct means that you are responsible for treating everyone on the project with respect and courtesy regardless of their identity. If you are the victim of any inappropriate behavior or comments as described in our Code of Conduct, we are here for you and will do the best to ensure that the abuser is reprimanded appropriately, per our code.

<style>
.contains-task-list LI
{
  list-style-type: none;
}
</style>
