# Testing

We care about testing, especially unit tests. Testing is the most important part of developing software. But we make many code duplicates while we are deloping an application. Also, we believe that the main purpose of the unit test is not the testing CRUD codes. And CRUD codes are usually duplications. Here, we are going to talk a little about the testing strategy of the Axe API.

## Introduction

As Axe API, we want to use internal codes for the CRUD operations. Also, we want to provide some escape points such as [Hooks](/advanced/hooks.html), [Events](/advanced/hooks.html#events), [Middlewares](/basics/middlewares.html), etc. By doing that, you can focus your business logic in your escape points.

Let's look at the following hook;

`UserHooks.ts`

```ts
import { IHookParameter } from "axe-api";

const onBeforeInsert = async ({
  formData,
  req,
  res,
  model,
  database,
  relation,
  parentModel,
}: IHookParameter) => {
  // do whatever you want here...
};

export { onBeforeInsert };
```

In general, we want you don't need anything in escape points. For providing that, we are passing all possible arguments to your function. That's why this is not just a simple function. It is also a function that can be tested by unit test methods. Let's create a simple test spec in the same folder;

`UserHooks.spec.ts`

```ts
import { IHookParameter } from "axe-api";
import { onBeforeInsert } from "./UserHooks";

describe("onBeforeInsert", () => {
  test("should be able to add timestamps", async () => {
    const formData = {
      name: "Karl Popper",
      created_at: null,
    };
    await onBeforeInsert({ formData } as IHookParameter);
    expect(formData.created_at).not.toBe(null);
  });
});
```

As you can see, we can import the `onBeforeInsert` function directly because we don't need any other dependencies. We provide all the things. So you can just focus on what do you want to test.

Also, we added [Jest](https://jestjs.io/) library to the project for you. You can execute the following command to execute tests;

```bash
$ npm run test

> jest --runInBand --colors

 PASS  app/v1/Hooks/UserHooks.spec.js
  onBeforeInsert
    √ should be able to add timestamps (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.755 s
Ran all test suites.
```

That's all!

## Dependency Injection

You may think that what if I need some other dependencies such as a mail sender. To solve this problem, we created a simple IoC container. To define your relations, you should use it in the init function;

`app/v1/init.ts`

```ts
import { Express } from "express";
import { IoCService } from "axe-api";
import nodemailer from "nodemailer";

const onBeforeInit = async (app: Express) => {
  IoCService.singleton("Mailer", async () => {
    return nodemailer;
  });
};

const onAfterInit = async (app: Express) => {};

export { onBeforeInit, onAfterInit };
```

After that only thing, you should do is call the dependency via IoC;

```ts
import { IoCService, IHookParameter } from "axe-api";

const onBeforeInsert = async ({ formData }: IHookParameter) => {
  const mailer = await IoCService.use("Mailer");
  // do whatever you want here...
};

export { onBeforeInsert };
```

Writing the tests is easier now. You can bind your dependency in the testing function;

```ts
import { IoCService } from "axe-api";
import { onBeforeInsert } from "./UserHooks";

describe("onBeforeInsert", () => {
  test("should be able to add timestamps", async () => {
    IoCService.bind("Mailer", async () => {
      return "my-fake-mailer";
    });
    await onBeforeInsert({ formData });
  });
});
```

It is deadly simple!
