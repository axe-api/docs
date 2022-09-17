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

- App-Based Configs (`app/Config/Application.js`)
- Model-Based Configs (`app/Models/YourModel.js`)

On the other hand, you can configure your transaction options by handler types. When you set up your transaction configuration, Axe API picks the best configuration by looking at the priority. We are going to talk about this later in this document.

## App-Based Configs

App-Based Configs should be managed in the `app/Config/Application.js` file. By default, transactions would be disabled if you don't select anything about your transaction strategy.

To enable transactions everywhere, you should use the following configuration.

```js
export default async () => {
  return {
    transaction: true,
  };
};
```

But also, you can enable transactions by handler types by applying the following codes.

```js
import { HANDLERS } from "axe-api";

export default async () => {
  return {
    transaction: [
      {
        handler: HANDLERS.PAGINATE,
        transaction: false,
      },
      {
        handler: HANDLERS.INSERT,
        transaction: true,
      },
    ],
  };
};
```

If the Axe API can't find any model-based configs by the handler type, it would use the App-Based Configs.

## Model-Based Configs

In your models, you can use the same configuration structure as an App-Based Configs. If you don't configure a model, Axe API would use the App-Based Configs for your model. But if you do, Axe API overrides App-Based Configs for only that model.

```js
import { Model } from "axe-api";

class User extends Model {
  get transaction() {
    return [
      {
        handler: HANDLERS.INSERT,
        transaction: false,
      },
    ];
  }
}

export default User;
```

## Usage

Transactions can be used in [Hooks](/advanced/hooks/#hooks-2) or [Events](/advanced/hooks/#events).

By your configuration, Axe API automatically will start the transaction. In **Hooks** or **Events**, Axe API will pass the transaction object as `trx` object in order to be used.

```js
const onAfterInsert = async ({ trx }) => {
  // If you opened the transaction for this handler, `trx` object would be
  // the database object by default. So you can use the `trx.commit()` or
  // `trx.rollback()` methods.
};

export { onAfterInsert };
```

:::warning
If you started a database transaction, you **should NOT** use the **database** object.
:::

If everything goes well, the transaction would be committed. But, if you throw an error, Axe API would automatically roll back the transaction. You don't have to do anything special in your hooks or event functions.

```js
import { HttpResponse } from "axe-api";

const onAfterInsert = async ({ trx }) => {
  // You can check anything in here and you can throw an HTTP Response as an exception
  throw new HttpResponse(400, "Unacceptable request!");
};

export { onAfterInsert };
```

:::tip
In the example above, you don't need to roll back your transaction. Axe API will handle it by default.
:::
