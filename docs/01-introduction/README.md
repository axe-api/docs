# Introduction

<img src="/logo.png" height="200" style="float: right; margin-left: 10px; margin-right: 10px;" />

**AdonisX** is the *fastest* way to create **Rest API** by defining only database models and their relationships between them. It is built on [AdonisJs](https://adonisjs.com), and it's an awesome ORM library, [Lucid](https://adonisjs.com/docs/4.1/lucid). AdonisX takes AdonisJs' power and speeds it up!

You are going to be able to develop an API **10 times faster!**

## How It Works?

[AdonisJs](https://adonisjs.com) is a very beautiful web framework based on [NodeJs](https://nodejs.org). You can create great applications using it. It uses [Knex.js](http://knexjs.org/) as database provider and it supports all major relational databases such as *Postgres*, *MSSQL*, *MySQL*, *MariaDB*, *SQLite3*, *Oracle*, and *Amazon Redshift*.

**AdonisX** uses the basic structure of *AdonisJs*. It is actually a [Service Provider](https://adonisjs.com/docs/4.1/service-providers) which works in the initialization process of an AdonisJs application. It performs two basic functions;

- **Analyzes** your models and their relationships to create routes (*Initialization*)
- **Handles** all HTTP requests with a shared Controller (*Processing*)

Let's assume that you have a model like this;

```js
const XModel = use('AdonisX/Models/XModel')

class User extends XModel {
  static get table () {
    return 'users'
  }
}
```

With this model, you will have all of the endpoints for **users** resource. **AdonisX** will create **CRUD** routes for you in the *initialization* and routes will be completely ready to be handled and processed by the shared controller.

If you execute **adonis route:list** command in your terminal, you can see all routes which have been created by **AdonisX**. 

![Adonis Routes](/images/03-routes.jpg)

All these requests will be handled by **MainController**. **MainController** is a controller which is controlled by **AdonisX**. It *handles* requests for all models. It is responsible to prepare a *response* for the user by model definitions. In model definitions, you can decide many things such as *form validation*, *custom middlewares* and *, etc*.

With AdonisX, you **don't** have to code for all CRUD actions. You **don't** have to implement advanced query features. The only thing to do is **defining models** and **their relations** between each other. That's all! <Emoji code="1f389"></Emoji>

## Roadmap

There are several things we already have done and there are many things we want to implement in the future. If you have any opinion about it, please don't hesitate to open an issue for your brilliant ideas on our [issue page](https://github.com/adonisx/adonisx/issues).

You can see what we've done before and what we will work on in the future;

- [x] Basic API structure
- [x] Easy installation
- [x] Extenting an action before or update.
- [x] **Form Validation** support
- [x] **Custom Middlewares** support
- [x] Strong query features
- [x] **Model relation** support on routes.
- [x] **Recursive Resource** support
- [ ] **Processing Time** on HTTP responses
- [ ] **Rate Limit** support
- [ ] **Caching Support** on HTTP requests
- [ ] System variables in queries (*$now*, *$currentDate*, *$tomorrow*)
- [ ] **Transaction** support
- [ ] Auto generated **API Documentation**
- [ ] Easy API **testing**
- [ ] **Cookbook** section on documentation

## Contribution Guide

### What do I need to know to help?

If you are looking to help with a code contribution our project uses NodeJs and AdonisJs. If you don't feel ready to make a code contribution yet, no problem! You can also check out the [any issues](https://github.com/adonisx/adonisx/issues) that we have.

If you are interested in making a code contribution and would like to learn more about the technologies that we use, check out the list below.

- [AdonisJs](https://adonisjs.com/docs/4.1/installation)
- [Service Provider](https://adonisjs.com/docs/4.1/service-providers)
- [Lucid](https://adonisjs.com/docs/4.1/lucid)
- [Knex.js](http://knexjs.org/)

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

If you need help, you can ask questions on our [issue list](https://github.com/adonisx/adonisx/issues).

### What does the Code of Conduct mean for me?

Our Code of Conduct means that you are responsible for treating everyone on the project with respect and courtesy regardless of their identity. If you are the victim of any inappropriate behavior or comments as described in our Code of Conduct, we are here for you and will do the best to ensure that the abuser is reprimanded appropriately, per our code.

<style>
.contains-task-list LI
{
  list-style-type: none;
}
</style>