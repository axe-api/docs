# Transactions

Axe API supports transactions with the power of [Knex.js](http://knexjs.org/#Transactions). By default, you can use transactions with **Knex.js** like the following code example;

```js
const trx = await knex.transaction();

trx("books")
  .insert({ name: "Old Books" }, "id")
  .then(trx.commit)
  .catch(trx.rollback);
```

In your application, Axe API has to create the transaction object because it is the root handler of the HTTP requests. Because of that, Axe API provides advanced transaction configuration on the project.

There are two places that you can configure your transaction strategy;

- Version-Based Configs (`app/v1/config.ts`)
- Model-Based Configs (`app/v1/Models/YourModel.ts`)

On the other hand, you can configure your transaction options by handler types. When you set up your transaction configuration, Axe API picks the best configuration by looking at the priority. We are going to talk about this later in this document.

## Version-Based Configs

Version-based Configs should be managed in the `app/v1/config.ts` file. By default, transactions would be disabled if you don't select anything about your transaction strategy.

To enable transactions everywhere, you should use the following configuration.

```ts
import { IVersionConfig } from "axe-api";

const config: IVersionConfig = {
  // ...
  transaction: true,
  // ...
};

export default config;
```

But also, you can enable transactions by handler types by applying the following codes.

```ts
import { IVersionConfig, HandlerTypes } from "axe-api";

const config: IVersionConfig = {
  // ...
  transaction: [
    {
      handler: [HandlerTypes.INSERT, HandlerTypes.UPDATE],
      transaction: true,
    },
    {
      handler: HandlerTypes.PATCH,
      transaction: true,
    },
  ],
  // ...
};

export default config;
```

If the Axe API can't find any model-based configs by the handler type, it would use the Version-based Configs.

## Model-Based Configs

In your models, you can use the same configuration structure as an Version-based Configs. If you don't configure a model, Axe API would use the Version-based Configs for your model. But if you do, Axe API overrides Version-based Configs for only that model.

```ts
import { Model, IHandlerBasedTransactionConfig, HandlerTypes } from "axe-api";

class User extends Model {
  get transaction(): IHandlerBasedTransactionConfig {
    return {
      handler: HandlerTypes.INSERT,
      transaction: true,
    };
  }
}

export default User;
```

## Usage

Transactions can be used in [Hooks](/advanced/hooks.html) or [Events](/advanced/hooks.html#events).

By your configuration, Axe API automatically will start the transaction. In **Hooks** or **Events**, Axe API will pass the transaction object as `trx` object in order to be used.

```ts
import { IHookParameter } from "axe-api";

const onAfterInsert = async ({ database }: IHookParameter) => {
  // If you opened the transaction for this handler, `database` object is a
  // transaction database object by default. So you can use the `database.commit()`
  // or `database.rollback()` methods.
};

export { onAfterInsert };
```

If everything goes well, the transaction would be committed. But, if you throw an error, Axe API would automatically roll back the transaction. You don't have to do anything special in your hooks or event functions.

```ts
import { ApiError, IHookParameter } from "axe-api";

const onAfterInsert = async ({ database }: IHookParameter) => {
  // You can check anything in here and you can throw an HTTP Response as an exception
  throw new ApiError("Unacceptable request!");
};

export { onAfterInsert };
```

:::tip
In the example above, you don't need to roll back your transaction. Axe API will handle it by default.
:::
