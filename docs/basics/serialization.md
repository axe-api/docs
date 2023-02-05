# Serialization

Serialize functions can be used for several reasons such as hiding some values, adding computed fields, changing data format, etc. Axe API has two different serialization ways.

## Version-Based Serializers

You can define a version-based serializer function in the `app/v1/config.ts` file. That kind of serializer function works in every HTTP request that returns a response.

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

:::tip
As you can see, there is the `request` object as the second argument. You can use the `request` object to filter data. For example; you can hide some data from the user by some authorization rules.
:::

You can define a handler-based serializer function, like the following example. In this case, the function will be triggered only in selected handlers.

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

## Model-Based Serizalizers

You can define a specific serializer for a specific model like the following example;

`app/v1/Serialization/UserSerialization.ts`

```ts
import { Request } from "express";

export default (item: any, request: Request) => {
  return {
    ...item,
    fullname: `${item.name} ${item.surname}`,
  };
};
```

This serializer is triggered for the `User` model for every HTTP response that returns data. Here is some response example;

```json
{
  "id": 1,
  "name": "Karl",
  "surname": "Popper",
  "fullname": "Karl Popper"
}
```
