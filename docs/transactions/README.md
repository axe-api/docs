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

## Convention Over Configuration

There are two places that you can configure your transaction strategy;

- Application-Based Configuration (`app/Config/Application.js`)
- Model-Based Configuration (`app/Models/YourModel.js`)

On the other hand, you can configure your transaction options by handler types. When you set up your transaction configuration, Axe API picks the best configuration by looking at the priority. We are going to talk about this later in this document.

## Application-Based Configuration

Application-Based configurations should be managed in the `app/Config/Application.js` file. By default, transactions would be disabled if you don't select anything about your transaction strategy.

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

If the Axe API can't find any model-based configuration by the handler type, it would use the application-based configuration.

## Model-Based Configuration

In your models, you can use the same configuration structure as an application-based configuration. If you don't configure a model, Axe API would use the application-based configuration for your model. But if you do, Axe API overrides application-based configuration for only that model.

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

## Using in Hooks and Events

By your configuration, Axe API automatically will start the transaction. If everything goes well, the transaction would be committed. But, if you throw an error, Axe API would automatically roll back the transaction. You don't have to do anything special in your hooks or event functions. But you should understand that the database object would be the transaction object if the transaction is open for a hook or event.

```js
const onBeforeInsert = async ({ database }) => {
  // If you opened the transaction for this handler, `database` object would be
  // the transaction object. So you can use the `database.commit()` or
  // `database.rollback()` methods.
};

export { onBeforeInsert };
```
