# Deployments

To deploy an Axe API project, the process is just as straightforward as deploying any other Node.js application. First and foremost, you will need a server or platform that is equipped to install and run the latest release of Node.js.

## Compile

Since the Axe API uses TypeScript as the language, you need to compile your application to plain JavaScript in order to run it. You can compile your application by using the following command;

```bash
$ npm run build
```

After this command, you will have a folder called `build`, and the `build` folder would have all of your compiled application codes, migration files, and other necessary parts of the application.

:::warning
Remember that in the `build` folder you should define your environment variables in the `.env` file. Since this is your production build, `npm run build` command does not include the `.env` file. You might add `.env` file automatically to the build folder by editing the `scripts/postbuild.sh` file if you want.
:::

## Execute

Your compiled codes are basic Node.js codes. So that, in the `build` folder, you can execute the application with the following command;

```bash
$ node index.js

 [axe] All models have been resolved.
 [axe] Database schema has been validated.
 [axe] Model tree has been created.
 [axe] Express routes have been created.
 [axe] API listens requests on http://localhost:3000
```

Tada! :tada:

## Migrations

**Axe API** adds your migrations files to your `build` folder. Only thing you should do is executing the migrate command like the following one;

```bash
$ knex --esm migrate:latest

Batch 1 run: 2 migrations
```

:::warning
Remember that in your machine you must have the `knex` cli. You can install it by using the following code:

`npm i -g knex`
:::

:::tip
You can find more command example on the [Migration CLI Documentation](https://knexjs.org/guide/migrations.html#migration-cli)
:::

## Dockerize

**Axe API** adds `Dockerfile` to your build folder by default. A standard **Axe API** Dockerfile looks like the following one;

```docker
FROM node:18
# Create app directory
WORKDIR /home
# Install app dependencies
COPY package*.json ./
RUN npm install
# Building for a production
RUN npm ci --only=production
# To migrate database changes we need `knex` cli
RUN npm i -g knex
# Bundle app source
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

:::tip
You can change the `Dockerfile` by your requirements.
:::

Once you build your application, you can execute the following command in the `build` directory to build a docker image for your application;

```bash
$ cd build
$ docker build -t my-api-image .
```

Once your docker image is ready, you can execute it with the following command;

```bash
$ docker run -p 3000:3000 my-api-image
```

:::warning
Please keep in your mind that you should provide all environment variables in `.env` files or via docker environment parameters.
:::

## Docker Compose

Using a `docker-compose.yml` file could be very helpful in your project. You may find a simple example of a `docker-compose.yml` file in the following one. You are free to edit the example by your requirements.

```yaml
version: "3"

services:
  migration:
    image: my-api-image
    working_dir: /home
    command: knex --esm migrate:latest
    environment:
      DB_HOST: db_host
      DB_USER: db_user
      DB_PASSWORD: db_password
      DB_DATABASE: your_db_schema

  app:
    image: my-api-image
    command: node index.js
    restart: always
    depends_on:
      - migration
    ports:
      - 3000:3000
    environment:
      DB_HOST: db_host
      DB_USER: db_user
      DB_PASSWORD: db_password
      DB_DATABASE: your_db_schema
```

:::tip
You can use `host.docker.internal` as `DB_HOST` value to access the dabase which on located in your machine. You can find more details in the Docker documentation.
:::

## Dive Deeper

We tried to show some of the basic deployment methods in here. Nevertheless we know that there are many different scenario which you can use. We encrouge Axe API developers to write blog posts abou how to deploy your application in different environments instead of adding many pages here.

No matter in which platform or environment you deploy your application, the following facts would be same;

- Your application is a TypeScript application. It should be compiled to plain JavaScript.
- You need a supported Node.js version in the machine which you will deploy.
- You need to execute the migration files via `knex` cli.
- You must execute the compiled JavaScript file with Node.js

Other than tehese are just implementation details.