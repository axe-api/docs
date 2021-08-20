# Installation

Using **Axe API** in an application is very easy. We've created a CLI tool for you; [axe-magic](https://github.com/axe-api/axe-magic).

## Create Project

You can create a new Axe API project by using [axe-magic](https://github.com/axe-api/axe-magic). But first, you can install it in your development environment. When you installed it, you can be able to access **axe-magic** command via CLI. You can use the following command to install **axe-magic** to your machine;

```bash
$ npm i -g axe-magic
$ axe-magic --version
1.0.0
```

After that, creating a new project is very easy. Just you can execute the following command;

```bash
$ axe-magic new my-api
```

This command will pull [axe-api-template](https://github.com/axe-api/axe-api-template) project to your current directory with a new name, **my-api**.

## Install Dependencies

To install your project's depencies, you can execute the following commands in the root directory;

```bash
$ cd my-api
$ npm install
```

## Serve Application

To serve this application, you can execute the following command;

```bash
$ npm run start:dev
```

::: warning
`start:dev` command use [nodemon](https://www.npmjs.com/package/nodemon). If you haven't installed it yet, we suggest you install it first.
:::

After that, your first **Axe API** application will be running in `localhost:3000`.

You will see the following API response if you visit [localhost:3000](http://localhost:3000).

```json
{
  "name": "AXE API",
  "description": "The best API creation tool in the world.",
  "aim": "To kill them all!"
}
```

If you can see that response, it means that your project is running properly. <Yay />

:::tip
If you review `.env` file, you can see that the project uses [SQLite](https://www.sqlite.org/index.html) as the database.
:::
