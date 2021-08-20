# Installation

Using **Axe API** in an application is very easy. We've created a CLI tool for you; [axe-magic](https://github.com/axe-api/axe-magic).

## Axe Magic

You can create a new Axe API project by using [axe-magic](https://github.com/axe-api/axe-magic). But first, you should install it in your development environment. When you installed it, you should be able to access **axe-magic** command via CLI;

```bash
$ npm i -g axe-magic
$ axe-magic --version
1.0.0
```

After that, creating a new project is very easy. Just you have should execute the following command;

```bash
$ axe-magic new my-api
```

This command will pull [axe-api-template](https://github.com/axe-api/axe-api-template) project to your current directory with a new name, **axe-api**.

## Dependencies

To install your project's depencies, you should execute the following command in the root directory;

```bash
$ cd my-api
$ npm install
```

## Env File

Create the following file on the root directory;

```env
NODE_ENV=development
APP_PORT=3000
DB_CLIENT=sqlite
DB_DATABASE=axeapi
```

## Serve

To serve this application, you should execute the following command;

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

::: warning
If you change the `APP_PORT` key in your _.env_ file, the app will be hosted in the port you select.
:::
