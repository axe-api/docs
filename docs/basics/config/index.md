# Configs

We created a very simple configuration structure for your project. You will see an `app/Config` folder in your project after the installation. It is all you need to configure your application. All configurations in that folder will be loaded after the app has been started.

To access all configurations, you should use our `IoCService` object. The following code will show that how to access configuration variables;

```ts
import { IoCService, IHookParameter } from "axe-api";

const onBeforePaginate = async (hookParameters: IHookParameter) => {
  const Config = await IoCService.use("Config");
  console.log(Config.Application.env); // development
};

export { onBeforePaginate };
```

All configuration files and keys will be accessible via Config instance. On the other hand, we use [dotenv](https://www.npmjs.com/package/dotenv) package to manage your secret keys.

## Application

In the `app/Config/Application.ts` file, you can find the application configuration.

```ts
import { IApplicationConfig, HandlerTypes, LogLevels } from "axe-api";

const config: IApplicationConfig = {
  prefix: "api",
  env: process.env.NODE_ENV || "production",
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 5000,
  logLevel: LogLevels.INFO,
  transaction: [],
  serializers: [],
};

export default config;
```

The following table shows the configuration keys;

| Key      | Description                            | Default Value | Possible Values                  |
| -------- | -------------------------------------- | ------------- | -------------------------------- |
| env      | Working environment of the application | development   | development, production, staging |
| port     | The application port                   | 3000          |                                  |
| logLevel | The log level of the application       | INFO          | NONE, ERROR, WARNING, INFO, ALL  |
| prefix   | The main prefix of the api             | /api          |                                  |

## Database

In the `app/Config/Database.ts` file, you can find the database configuration for the [Knex.js Connection](http://knexjs.org/#Installation-client).

```ts
import { IDatabaseConfig } from "axe-api";

const config: IDatabaseConfig = {
  client: process.env.DB_CLIENT || "mysql",
  connection: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "database",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

export default config;
```

In this file, we used the same configuration structure with [Knex.js](http://knexjs.org/#Installation-client). So you can add more configuration by [Knex.js](http://knexjs.org/#Installation-client) documentation.

## Extending

The configuration structure is very flexible. You can add your custom configuration file for everything. Config loaded will read your files and your configurations will be accessible via Config loader.

Let's assume that you created your configuration file like this;

`app/Config/SMTP.ts`

```ts
export default {
  host: process.env.SMTP_HOST || "mail.yourhost.com",
  user: process.env.SMTP_USER,
};
```

This configuration file will be accessible via `Config` instance like this;

```ts
import { IoCService } from "axe-api";

const onBeforePaginate = async ({}) => {
  const Config = await IoCService.use("Config");
  console.log(Config.SMTP.host); // mail.yourhost.com
};

export { onBeforePaginate };
```
