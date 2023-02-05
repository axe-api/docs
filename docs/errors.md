# Errors

You can find Axe API error details on this page.

## `UNACCEPTABLE_VERSION_NAME`

The version name must be alpha-numeric. The following version names are acceptable;

- `v1`
- `v12`
- `beta`
- `alfa`

The following version names are not acceptable;

- `v1%`
- `v1-`
- `v1/`
- `v1;`

## `VERSION_CONFIG_NOT_FOUND`

Each version must have a config file which is called `config.ts`. For example;

`/app/v1/config.ts`

```ts
import { IVersionConfig } from "axe-api";

const config: IVersionConfig = {
  transaction: [],
  serializers: [],
  supportedLanguages: ["en-GB", "en", "tr", "de"],
  defaultLanguage: "en-GB",
};

export default config;
```

## `TABLE_DOESNT_HAVE_ANY_COLUMN`

It means that your model is not relevant to a database table correctly. Axe API uses the plural version of the model name. For example;

- `User.ts` => `users`

You have to be sure the name that is looking from Axe API and the database table name is the same.

:::tip
You can specify the name in the model definitions; [Table Name](/basics/models.html#table-name)
:::

## `RESERVED_VERSION_NAME`

The following names can not be used as a version names;

- `Config`
- `Events`
- `Hooks`
- `Models`
- `Serialization`

## `UNDEFINED_COLUMN`

This error means a column that is used in some of your models is not found on the database table. You should be sure that;

- All model files are using the correct database table
- The model file uses the correct columns on the database table.
- The database table has the correct column.

## `UNDEFINED_RELATION_MODEL`

This error means that a relationship definition is pointing to a model which is not found.
