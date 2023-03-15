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
import { IVersionConfig, QueryFeature, allow, deny } from "axe-api";

const config: IVersionConfig = {
  supportedLanguages: ["en", "de"],
  defaultLanguage: "en",
  transaction: [],
  serializers: [],
  query: {
    limits: [allow(QueryFeature.All)],
    defaults: {
      perPage: 10,
      minPerPage: 5,
      maxPerPage: 100,
    },
  },
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

### `query`

You can allow or deny query features under this section. Also, you can set the default values of paginations.

```js
{
  query: {
    limits: [allow(QueryFeature.All)],
    defaults: {
      perPage: 10,
      minPerPage: 5,
      maxPerPage: 100,
    },
  },
}
```

#### `limits`

Axe API provides two functions that you can use to set up query limits; `allow` and `deny`. You can use these functions and define a limit array.

The next item in the array overrides the previous item in the array. In the following example, we allow all query features except `Sorting` and `WhereLike`.

```js
{
  query: {
    limits: [
      allow(QueryFeature.All),
      deny(QueryFeature.Sorting),
      deny(QueryFeature.WhereLike),
    ],
    defaults: {
      perPage: 10,
      minPerPage: 5,
      maxPerPage: 100,
    },
  },
}
```

You can find the all query features to limit;

- `All`: All query features.
- `FieldsAll`: Fetching all fields.
- `Sorting`: Sorting items.
- `Limits`: Limiting pagination values (via `per_page`)
- `WhereAll`: All filtering options. (`Where{*}`)
- `WhereEqual`: Allow equal filter (`?q={"id": 1}`)
- `WhereNotEqual`: Allow NOT equal filter (`?q={"id.$not": 1}`)
- `WhereGt`: Allow greater than filter (`?q={"id.$gt": 1}`)
- `WhereGte`: Allow greater than equal filter (`?q={"id.$gte": 1}`)
- `WhereLt`: Allow lower than filter (`?q={"id.$lt": 1}`)
- `WhereLte`: Allow lower than equal filter (`?q={"id.$lte": 1}`)
- `WhereLike`: Allow LIKE filter (`?q={"name.$like": "*pop*"}`)
- `WhereNotLike`: Allow NOT LIKE filter (`?q={"name.$notLike": "*pop*"}`)
- `WhereIn`: Allow IN filter (`?q={"age.$in": [18, 19]}`)
- `WhereNotIn`: Allow NOT IN filter (`?q={"age.$notIn": [18, 19]}`)
- `WhereBetween`: Allow BETWEEN filter (`?q={"age.$between": [18, 30]}`)
- `WhereNotBetween`: Allow NOT BETWEEN filter (`?q={"age.$notBetween": [18, 30]}`)
- `WhereNull`: Allow NULL filter (`?q={"age": null}`)
- `WhereNotNull`: Allow NOT NULL filter (`?q={"age.$not": null}`)
- `Trashed`: Allow trashed filter for soft-deletes (`?trashed=true`)
- `WithAll`: Allow all `with` queries
- `WithHasOne`: Allow only has-one queries (`?with=posts{author}`)
- `WithHasMany`: Allow only has-many queries (`?with=users{posts}`)

:::tip
Both with `allow` and `deny` functions you can set a limit for a specific field. For example;

```js
{
  query: {
    limits: [
      allow(QueryFeature.All),
      deny(QueryFeature.Sorting),           // DENY all sorting
      allow(QueryFeature.Sorting, ["id"]),  // EXCEPT sorting with `id` field
    ],
  },
}
```

:::

#### `defaults`

- `perPage`: The default item value per page if the client doesn't provide any value.
- `minPerPage`: The minimum item value per page that the client can select.
- `maxPerPage`: The maximum item value per page that the client can select.
