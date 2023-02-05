# Configs

There are two different type configuration files;

- API configuration (`app/config.ts`)
- Version configurations (`app/v1/config.ts`)

## API Configuration

API configuration contains the general configs of the API.

`app/config.ts`

```ts
import { LogLevels, IApplicationConfig } from "axe-api";

const config: IApplicationConfig = {
  prefix: "api",
  env: process.env.NODE_ENV || "production",
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
  logLevel: LogLevels.INFO,
  database: {
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
  },
};

export default config;
```

### `prefix`

The prefix of API URLs. Default value is `api`. It should be string.

### `env`

The environment variable. Default value is `development`. It can be one of them the following values;

- `development`
- `testing`
- `staging`
- `production`

### `port`

The API port. The default value is `3000`. It should be numeric and between `0` to `65536`.

### `logLevel`

The configuration of logging. It sets that what kind of log messages should be output on console. The default value is `Info`. The following values can be used;

- `Info`
- `Warning`
- `Error`
- `All`

### `database`

The database configuration. It is based on [Knex.js configurations](https://knexjs.org/guide/#configuration-options).

## Version configurations

Each API versions should have own configuration file. For example;

- `app/v1/config.ts`
- `app/v2/config.ts`
- `app/beta/config.ts`

You can see an example of version configuration;

```ts
import { IVersionConfig } from "axe-api";

const config: IVersionConfig = {
  supportedLanguages: ["en", "de"],
  defaultLanguage: "en",
  transaction: [],
  serializers: [],
};

export default config;
```

### `supportedLanguages`

You are able to define which languages are supported.Axe API checks supported value array to determine if the language is supported.

:::tip
You can find more information in the [Internationalization (i18n)](/advanced/i18n.html) page.
:::

### `defaultLanguage`

The default version language. That value will be accepted as the default language if the client doesn't provide any supported language in the HTTP request.

### `transaction`

The version-based transaction configuration. By default, transactions would be disabled if you don't select anything about your transaction strategy.

To enable transactions everywhere, you should use the following configuration.

```ts
import { IVersionConfig } from "axe-api";

const config: IVersionConfig = {
  transaction: true,
};

export default config;
```

But also, you can enable transactions by handler types by applying the following codes.

```ts
import { IVersionConfig, HandlerTypes } from "axe-api";

const config: IVersionConfig = {
  transaction: [
    {
      handler: [HandlerTypes.INSERT, HandlerTypes.UPDATE],
      transaction: true,
    },
    {
      handler: HandlerTypes.PATCH,
      transaction: false,
    },
  ],
};

export default config;
```

:::tip
Axe API uses the version-based transaction configs if there is not any model-based transaction configurations.
:::

### `serializers`

You can add a version-based response serializer function to configure all HTTP responses.

```ts
import { Request } from "express";
import { IVersionConfig } from "axe-api";

const simpleSerializer = (data: any, request: Request) => {
  data.signed = true;
  return data;
};

const config: IVersionConfig = {
  serializers: [simpleSerializer],
};

export default config;
```

In this example, the `signed:true` value will be added to all API response data item.

You can also add handler-based serializer like the following example;

```ts
import { Request } from "express";
import { IVersionConfig, HandlerTypes } from "axe-api";

const simpleSerializer = (data: any, request: Request) => {
  data.signed = true;
  return data;
};

const config: IVersionConfig = {
  serializers: [
    {
      handler: [HandlerTypes.PAGINATE],
      serializer: [simpleSerializer],
    },
  ],
};

export default config;
```

In this example, the serializer will be work only `PAGINATE` handlers.

:::tip
You can find more detail in the [Serialization](/basics/serialization.html) page.
:::
