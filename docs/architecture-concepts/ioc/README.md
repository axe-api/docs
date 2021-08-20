# IoC

**Inversion of Control** (IoC) is a design principle (although, some people refer to it as a pattern). As the name suggests, it is used to invert different kinds of controls in object-oriented design to achieve loose coupling. [\*](https://www.tutorialsteacher.com/ioc/inversion-of-control)

Axe API provides a simple IoC structure to create testable codes. Let's review the following hook;

```js
const onBeforeInsert = async ({ formData }) => {
  // formData.email: the new user's email address
  // TODO: Check if the email is already used
};

export { onBeforeInsert };
```

Let's assume that we want to check if the email is already used in the database. To do that, we need a database connection. But Axe API already has a database connection. With IoC, you can use the database connection like the following example;

```js
import { IoC } from "axe-api";

const onBeforeInsert = async ({ formData }) => {
  const db = await IoC.use("Database"); // knex.js connection
  const user = await db
    .table("users")
    .where("email", formData.email)
    .first();
};

export { onBeforeInsert };
```

As you may see in the example, you can get the database connection from IoC. There are some objects which are provided by Axe API for you such as Database or Config. On the other hand, you can use the IoC to define and use your objects.

## Internal

Axe API provides the following instances for you as default.

### `Config (Singleton)`

`Config` is an instance of your application's configuration.

```js
import { IoC } from "axe-api";

const onBeforePaginate = async ({}) => {
  const Config = await IoC.use("Config");
  console.log(Config.Application.env); // development
};

export { onBeforePaginate };
```

You may find more detail in the [Config](/config) documentation.

### `Database (Singleton)`

You can access the [Knex.js' connection instance](https://knexjs.org/#Installation-client).

```js
import { IoC } from "axe-api";

const onBeforeInsert = async ({ formData }) => {
  const db = await IoC.use("Database"); // knex.js connection
};

export { onBeforeInsert };
```

### `App (Singleton)`

You can access the [Express' App](https://expressjs.com/en/starter/hello-world.html).

```js
import { IoC } from "axe-api";

const onBeforeInsert = async ({ formData }) => {
  const app = await IoC.use("App");
};

export { onBeforeInsert };
```

## Extending

In Axe API, you can define your definitions. `app/init.js` file is the best place to put your definitions. Because, after Axe API analyze the application, it calls the `init` function to handle your custom logic.

You can review the following example;

```js
import { IoC } from "axe-api";
import MyClass from "my-class";
import Mailer from "some-mail-library";

export default async ({ app }) => {
  // Best place to define your IoC definitions.
  IoC.singleton("MyClass", async () => {
    return new MyClass();
  });

  IoC.bind("Mailer", async () => {
    const Config = await IoC.use("Config");
    return new Mailer(Config.SMTP);
  });
};
```

## Methods

### `async use(name)`

With `use` method, you can get the instance from IoC.

```js
import { IoC } from "axe-api";

const onBeforeInsert = async ({ formData }) => {
  const db = await IoC.use("MyClass");
};

export { onBeforeInsert };
```

### `bind(name, callback)`

With `bind` method, you can define a relationship. In this way, whenever you want to use it, your callback function will be executed again.

```js
import { IoC } from "axe-api";

class MyClass {}

IoC.bind("MyClass", async () => {
  return new MyClass();
});
```

### `singleton(name, callback)`

In software engineering, the singleton pattern is a software design pattern that restricts the instantiation of a class to one "single" instance. [\*](https://en.wikipedia.org/wiki/Singleton_pattern). With this method, you can define a singleton relationship with your object.

```js
import { IoC } from "axe-api";

class MyClass {}

IoC.singleton("MyClass", async () => {
  return new MyClass();
});
```

In this example, `IoC.use` call, your callback function will be called only once. In the next usages, the results of your function will be returned automatically.
